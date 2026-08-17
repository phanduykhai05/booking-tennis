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
import { AuthUser, IS_PUBLIC_KEY, ROLES_KEY } from './auth.decorators';

type JwtPayload = { phone: string; role: UserRole; sub: string };

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
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
        (request as Request & { user?: AuthUser }).user = {
          id: payload.sub,
          phone: payload.phone,
          role: payload.role,
        };
      } catch {
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
