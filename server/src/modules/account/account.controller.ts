import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { notificationKindToApi } from '../../common/api-mapping';
import type { AuthUser } from '../../common/auth/auth.decorators';
import { CurrentUser } from '../../common/auth/auth.decorators';
import { PrismaService } from '../../common/prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { BuyTicketDto, UpdateProfileDto } from './dto/account.dto';

@ApiBearerAuth()
@ApiTags('account')
@Controller()
export class AccountController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @ApiOperation({ summary: 'Hồ sơ cá nhân' })
  @Get('account/profile')
  profile(@CurrentUser() user: AuthUser) {
    return this.authService.profile(user.id);
  }

  @ApiOperation({ summary: 'Cập nhật hồ sơ cá nhân' })
  @Patch('account/profile')
  async updateProfile(
    @CurrentUser() user: AuthUser,
    @Body() dto: UpdateProfileDto,
  ) {
    const updated = await this.prisma.user.update({
      data: {
        birthYear: dto.birthYear,
        email: dto.email,
        fullName: dto.fullName,
        gender: dto.gender,
        heightCm: dto.heightCm,
        note: dto.note,
        weightKg: dto.weightKg,
      },
      where: { id: user.id },
    });

    return this.authService.toProfile(updated);
  }

  @ApiOperation({ summary: 'Thông báo của tài khoản' })
  @Get('notifications')
  async notifications(@CurrentUser() user: AuthUser) {
    const notifications = await this.prisma.notification.findMany({
      orderBy: { createdAt: 'desc' },
      where: { userId: user.id },
    });

    return notifications.map((notification) => ({
      createdAt: notification.createdAt.toISOString(),
      id: notification.id,
      isRead: notification.isRead,
      kind: notificationKindToApi[notification.kind],
      message: notification.message,
      time: notification.createdAt.toISOString(),
      title: notification.title,
    }));
  }

  @ApiOperation({ summary: 'Đánh dấu đã đọc toàn bộ thông báo' })
  @Patch('notifications/read-all')
  async readAll(@CurrentUser() user: AuthUser) {
    const result = await this.prisma.notification.updateMany({
      data: { isRead: true },
      where: { isRead: false, userId: user.id },
    });

    return { updated: result.count };
  }

  @ApiOperation({ summary: 'Đánh dấu đã đọc một thông báo' })
  @Patch('notifications/:notificationId/read')
  async readOne(
    @CurrentUser() user: AuthUser,
    @Param('notificationId') notificationId: string,
  ) {
    const result = await this.prisma.notification.updateMany({
      data: { isRead: true },
      where: { id: notificationId, userId: user.id },
    });

    return { updated: result.count };
  }

  @ApiOperation({ summary: 'Mua vé sự kiện tại sân' })
  @Post('events/:eventId/tickets')
  async buyTicket(
    @CurrentUser() user: AuthUser,
    @Param('eventId') eventId: string,
    @Body() dto: BuyTicketDto,
  ) {
    const event = await this.prisma.venueEvent.findUniqueOrThrow({
      include: { venue: true },
      where: { id: eventId },
    });

    const remaining = event.capacity - event.soldCount;
    if (dto.quantity > remaining) {
      return {
        error: `Chỉ còn ${remaining} vé cho sự kiện này`,
        success: false,
      };
    }

    const ticket = await this.prisma.$transaction(async (tx) => {
      const created = await tx.eventTicket.create({
        data: {
          eventId,
          phone: dto.phone,
          quantity: dto.quantity,
          totalPrice: event.price * dto.quantity,
          userId: user.id,
        },
      });

      await tx.venueEvent.update({
        data: { soldCount: { increment: dto.quantity } },
        where: { id: eventId },
      });

      await tx.notification.create({
        data: {
          kind: 'BOOKING',
          message: `Bạn đã mua ${dto.quantity} vé sự kiện ${event.title} tại ${event.venue.name}.`,
          title: 'Mua vé thành công',
          userId: user.id,
        },
      });

      return created;
    });

    return {
      id: ticket.id,
      quantity: ticket.quantity,
      success: true,
      totalPrice: ticket.totalPrice,
    };
  }
}
