import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';

import type { UserRole } from '../../generated/prisma/enums';

export const IS_PUBLIC_KEY = 'isPublic';
export const ROLES_KEY = 'roles';

/** Route không cần token. */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

/** Route chỉ dành cho vai trò chỉ định (dùng cho khu vực /admin). */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

export type AuthUser = {
  id: string;
  phone: string;
  role: UserRole;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthUser =>
    context.switchToHttp().getRequest<{ user: AuthUser }>().user,
);
