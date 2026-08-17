import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
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

    if (!user) throw new NotFoundException('Không tìm thấy tài khoản');

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await this.prisma.passwordReset.create({
      data: {
        code,
        expiresAt: new Date(Date.now() + resetCodeTtlMinutes * 60 * 1000),
        userId: user.id,
      },
    });

    return {
      code,
      expiresInMinutes: resetCodeTtlMinutes,
      sentTo: dto.phone ?? dto.email ?? '',
    };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.prisma.user.findFirst({
      where: { OR: [{ phone: dto.account }, { email: dto.account }] },
    });

    if (!user) throw new NotFoundException('Không tìm thấy tài khoản');

    const reset = await this.prisma.passwordReset.findFirst({
      orderBy: { createdAt: 'desc' },
      where: { code: dto.code, usedAt: null, userId: user.id },
    });

    if (!reset || reset.expiresAt.getTime() < Date.now()) {
      throw new BadRequestException('Mã xác thực không đúng hoặc đã hết hạn');
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
