import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

import type { UserRole } from '../../generated/prisma/enums';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUser, IS_PUBLIC_KEY, ROLES_KEY } from './auth.decorators';

type JwtPayload = { phone: string; role: UserRole; sub: string };

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.readToken(request);

    // Route công khai vẫn giải mã token nếu có, để endpoint biết ai đang xem.
    if (token) {
      try {
        const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
        // Đọc lại từ DB mỗi request: tài khoản bị khoá hoặc hạ quyền phải mất tác dụng ngay,
        // không đợi token cũ (sống 7 ngày) hết hạn.
        const current = await this.prisma.user.findUnique({
          select: { role: true, status: true },
          where: { id: payload.sub },
        });

        if (current?.status === 'ACTIVE') {
          (request as Request & { user?: AuthUser }).user = {
            id: payload.sub,
            phone: payload.phone,
            role: current.role,
          };
        } else if (!isPublic) {
          throw new UnauthorizedException(
            'Tài khoản đã bị khoá hoặc không còn tồn tại',
          );
        }
      } catch (error) {
        if (error instanceof UnauthorizedException) throw error;
        if (!isPublic)
          throw new UnauthorizedException('Phiên đăng nhập đã hết hạn');
      }
    }

    if (isPublic) return true;

    const user = (request as Request & { user?: AuthUser }).user;
    if (!user) throw new UnauthorizedException('Bạn cần đăng nhập để tiếp tục');

    const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (roles?.length && !roles.includes(user.role)) {
      throw new ForbiddenException('Tài khoản không có quyền truy cập');
    }

    return true;
  }

  private readToken(request: Request): string | null {
    const header = request.headers.authorization;
    if (!header) return null;

    const [scheme, value] = header.split(' ');
    return scheme?.toLowerCase() === 'bearer' && value ? value : null;
  }
}
