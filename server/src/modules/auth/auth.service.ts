import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';

import { userStatusToApi } from '../../common/api-mapping';
import { PrismaService } from '../../common/prisma/prisma.service';
import type { User } from '../../generated/prisma/client';
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from './dto/auth.dto';

const resetCodeTtlMinutes = 15;
const invalidResetMessage =
  'Mã xác thực không đúng hoặc đã hết hạn. Vui lòng yêu cầu mã mới.';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [
          { phone: dto.phone },
          ...(dto.email ? [{ email: dto.email }] : []),
        ],
      },
    });

    if (existing) {
      throw new ConflictException('Số điện thoại hoặc email đã được đăng ký');
    }

    const user = await this.prisma.user.create({
      data: {
        email: dto.email ?? null,
        fullName: dto.fullName,
        passwordHash: await hash(dto.password, 10),
        phone: dto.phone,
      },
    });

    return this.buildSession(user);
  }

  async login(dto: LoginDto) {
    if (!dto.phone && !dto.email) {
      throw new BadRequestException(
        'Cần số điện thoại hoặc email để đăng nhập',
      );
    }

    const user = await this.prisma.user.findFirst({
      where: dto.phone ? { phone: dto.phone } : { email: dto.email },
    });

    if (!user || !(await compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Thông tin đăng nhập không đúng');
    }

    if (user.status === 'INACTIVE') {
      throw new UnauthorizedException('Tài khoản đang bị khoá');
    }

    return this.buildSession(user);
  }

  /**
   * Môi trường dev chưa nối SMS/email nên trả thẳng mã xác thực về client.
   * Khi có nhà cung cấp thật, chỉ cần bỏ trường `code` khỏi response.
   */
  async forgotPassword(dto: ForgotPasswordDto) {
    if (!dto.phone && !dto.email) {
      throw new BadRequestException(
        'Cần số điện thoại hoặc email để khôi phục',
      );
    }

    const user = await this.prisma.user.findFirst({
      where: dto.phone ? { phone: dto.phone } : { email: dto.email },
    });

    const sentTo = dto.phone ?? dto.email ?? '';

    // Không có tài khoản vẫn trả cùng một câu, để không ai dò được số nào đã đăng ký.
    if (!user) return { expiresInMinutes: resetCodeTtlMinutes, sentTo };

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await this.prisma.passwordReset.create({
      data: {
        code,
        expiresAt: new Date(Date.now() + resetCodeTtlMinutes * 60 * 1000),
        userId: user.id,
      },
    });

    // ponytail: chưa có SMS/email, mã chỉ nằm trong log server; nối nhà cung cấp gửi tin rồi bỏ dòng log này.
    this.logger.log(`Mã khôi phục cho ${sentTo}: ${code}`);

    // Trả mã thẳng về chỉ để thử trên máy dev; production để trống cờ này.
    const exposeCode = this.config.get<string>('EXPOSE_RESET_CODE') === 'true';

    return {
      ...(exposeCode ? { code } : {}),
      expiresInMinutes: resetCodeTtlMinutes,
      sentTo,
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.prisma.user.findFirst({
      where: { OR: [{ phone: dto.account }, { email: dto.account }] },
    });

    if (!user) throw new BadRequestException(invalidResetMessage);

    const reset = await this.prisma.passwordReset.findFirst({
      orderBy: { createdAt: 'desc' },
      where: { code: dto.code, usedAt: null, userId: user.id },
    });

    if (!reset || reset.expiresAt.getTime() < Date.now()) {
      // Sai một lần là huỷ mọi mã đang mở: mã 6 số không thể dò thử hàng loạt.
      await this.prisma.passwordReset.updateMany({
        data: { usedAt: new Date() },
        where: { usedAt: null, userId: user.id },
      });
      throw new BadRequestException(invalidResetMessage);
    }

    await this.prisma.$transaction([
      this.prisma.passwordReset.update({
        data: { usedAt: new Date() },
        where: { id: reset.id },
      }),
      this.prisma.user.update({
        data: { passwordHash: await hash(dto.password, 10) },
        where: { id: user.id },
      }),
    ]);

    return { success: true };
  }

  async profile(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Không tìm thấy tài khoản');

    return this.toProfile(user);
  }

  toProfile(user: User) {
    return {
      avatarInitial: user.fullName.trim().slice(0, 1).toLowerCase(),
      birthYear: user.birthYear,
      email: user.email,
      fullName: user.fullName,
      gender: user.gender,
      heightCm: user.heightCm,
      id: user.id,
      joinedAt: user.createdAt.toISOString().slice(0, 10),
      note: user.note,
      phone: user.phone,
      role: user.role === 'ADMIN' ? 'admin' : 'user',
      status: userStatusToApi[user.status],
      weightKg: user.weightKg,
    };
  }

  private async buildSession(user: User) {
    const token = await this.jwtService.signAsync({
      phone: user.phone,
      role: user.role,
      sub: user.id,
    });

    return { token, user: this.toProfile(user) };
  }
}
