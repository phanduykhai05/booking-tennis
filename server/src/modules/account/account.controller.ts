import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  notificationKindToApi,
  paymentMethodToApi,
  paymentStatusToApi,
  ticketStatusToApi,
} from '../../common/api-mapping';
import type { AuthUser } from '../../common/auth/auth.decorators';
import { CurrentUser } from '../../common/auth/auth.decorators';
import { formatMinutes, toDateString } from '../../common/date.util';
import { PrismaService } from '../../common/prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { PaymentsService } from '../payments/payments.service';
import { BuyTicketDto, UpdateProfileDto } from './dto/account.dto';

@ApiBearerAuth()
@ApiTags('account')
@Controller()
export class AccountController {
  constructor(
    private readonly authService: AuthService,
    private readonly paymentsService: PaymentsService,
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
    // Nhả trước các vé giữ chỗ đã quá hạn QR, nếu không chỗ trống sẽ bị đếm thiếu.
    await this.paymentsService.expireStalePayments();

    const event = await this.prisma.venueEvent.findUniqueOrThrow({
      include: { venue: true },
      where: { id: eventId },
    });

    // soldCount chỉ đếm vé đã trả tiền; vé đang chờ chuyển khoản vẫn phải giữ chỗ tạm.
    const heldSeats = await this.prisma.eventTicket.aggregate({
      _sum: { quantity: true },
      where: { eventId, status: 'PENDING' },
    });

    const remaining =
      event.capacity - event.soldCount - (heldSeats._sum.quantity ?? 0);

    if (dto.quantity > remaining) {
      return {
        error: `Chỉ còn ${Math.max(remaining, 0)} vé cho sự kiện này`,
        success: false,
      };
    }

    const isSepay = dto.paymentMethod === 'sepay';

    // Kiểm tra trước khi tạo vé: nếu tạo rồi mới phát hiện SePay chưa bật thì vé
    // treo ở PENDING và giữ chỗ oan cho tới khi hết hạn.
    if (isSepay && !this.paymentsService.isSepayAvailable) {
      return {
        error:
          'Thanh toán SePay chưa được cấu hình. Vui lòng chọn trả tại quầy.',
        success: false,
      };
    }

    const ticket = await this.prisma.$transaction(async (tx) => {
      const created = await tx.eventTicket.create({
        data: {
          eventId,
          phone: dto.phone,
          quantity: dto.quantity,
          status: isSepay ? 'PENDING' : 'PAID',
          totalPrice: event.price * dto.quantity,
          userId: user.id,
        },
      });

      // Trả tại quầy thì ghi nhận bán ngay; SePay đợi webhook báo tiền vào mới cộng.
      if (!isSepay) {
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
      }

      return created;
    });

    const checkout = isSepay
      ? await this.paymentsService.createSepayCheckout(user.id, {
          ticketId: ticket.id,
        })
      : undefined;

    return {
      checkout,
      id: ticket.id,
      quantity: ticket.quantity,
      status: ticketStatusToApi[ticket.status],
      success: true,
      totalPrice: ticket.totalPrice,
    };
  }

  @ApiOperation({ summary: 'Vé sự kiện đã mua của tài khoản' })
  @Get('account/tickets')
  async tickets(@CurrentUser() user: AuthUser) {
    const tickets = await this.prisma.eventTicket.findMany({
      include: { event: { include: { venue: true } } },
      orderBy: { createdAt: 'desc' },
      where: { userId: user.id },
    });

    return tickets.map((ticket) => ({
      createdAt: ticket.createdAt.toISOString(),
      eventDate: toDateString(ticket.event.eventDate),
      eventId: ticket.eventId,
      id: ticket.id,
      phone: ticket.phone,
      priceLabel: `${ticket.totalPrice.toLocaleString('vi-VN')} ₫`,
      quantity: ticket.quantity,
      status: ticketStatusToApi[ticket.status],
      timeEnd: formatMinutes(ticket.event.endMinute),
      timeStart: formatMinutes(ticket.event.startMinute),
      title: ticket.event.title,
      totalPrice: ticket.totalPrice,
      venueId: ticket.event.venueId,
      venueName: ticket.event.venue.name,
    }));
  }

  @ApiOperation({ summary: 'Lịch sử giao dịch của tài khoản' })
  @Get('account/payments')
  async payments(@CurrentUser() user: AuthUser) {
    const payments = await this.prisma.payment.findMany({
      include: {
        booking: { include: { court: true, venue: true } },
        ticket: { include: { event: { include: { venue: true } } } },
      },
      orderBy: { createdAt: 'desc' },
      where: { userId: user.id },
    });

    // Một giao dịch trả cho lịch đặt sân HOẶC vé sự kiện, nên phần mô tả lấy từ vế đang có.
    return payments.map((payment) => {
      const subject = payment.booking
        ? {
            bookingCode: payment.booking.code,
            bookingDate: toDateString(payment.booking.bookingDate),
            courtName: payment.booking.court.name,
            kind: 'booking' as const,
            venueName: payment.booking.venue.name,
          }
        : payment.ticket
          ? {
              bookingCode: payment.ticket.event.title,
              bookingDate: toDateString(payment.ticket.event.eventDate),
              courtName: payment.ticket.event.courtLabel,
              kind: 'ticket' as const,
              venueName: payment.ticket.event.venue.name,
            }
          : {
              bookingCode: '-',
              bookingDate: '-',
              courtName: '-',
              kind: 'other' as const,
              venueName: '-',
            };

      return {
        amount: payment.amount,
        amountLabel: `${payment.amount.toLocaleString('vi-VN')} ₫`,
        createdAt: payment.createdAt.toISOString(),
        id: payment.id,
        method: paymentMethodToApi[payment.method],
        paidAt: payment.paidAt === null ? null : payment.paidAt.toISOString(),
        status: paymentStatusToApi[payment.status],
        transactionCode: payment.transactionCode,
        ...subject,
      };
    });
  }
}
