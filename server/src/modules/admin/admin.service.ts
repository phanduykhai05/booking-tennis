import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcryptjs';

import {
  activityTypeToApi,
  bookingSourceToApi,
  bookingStatusFromApi,
  bookingStatusToApi,
  courtStatusFromApi,
  courtStatusToApi,
  courtSurfaceFromApi,
  courtSurfaceToApi,
  paymentMethodToApi,
  paymentStatusFromApi,
  paymentStatusToApi,
  userStatusFromApi,
  userStatusToApi,
  venueStatusToApi,
} from '../../common/api-mapping';
import { toDateString, toDbDate } from '../../common/date.util';
import { PrismaService } from '../../common/prisma/prisma.service';
import { AdminCourtDto, AdminCreateBookingDto } from './dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  /** Trả về đúng hình dạng `AdminDataState` mà AdminDataProvider đang dùng. */
  async data() {
    const [activityEvents, bookings, courts, customers, payments, venues] =
      await Promise.all([
        this.prisma.activityEvent.findMany({
          orderBy: { createdAt: 'desc' },
          take: 50,
        }),
        this.prisma.booking.findMany({ orderBy: { bookingDate: 'desc' } }),
        this.prisma.court.findMany({ orderBy: { sortOrder: 'asc' } }),
        this.prisma.user.findMany({
          orderBy: { createdAt: 'asc' },
          where: { role: 'USER' },
        }),
        this.prisma.payment.findMany({ orderBy: { createdAt: 'desc' } }),
        this.prisma.venue.findMany({ orderBy: { name: 'asc' } }),
      ]);

    return {
      activityEvents: activityEvents.map((event) => ({
        createdAt: event.createdAt.toISOString(),
        entityId: event.entityId,
        id: event.id,
        message: event.message,
        type: activityTypeToApi[event.type],
      })),
      bookings: bookings.map((booking) => ({
        bookingDate: toDateString(booking.bookingDate),
        code: booking.code,
        courtId: booking.courtId,
        customerId: booking.userId,
        endMinute: booking.endMinute,
        id: booking.id,
        note: booking.note ?? undefined,
        paymentStatus: paymentStatusToApi[booking.paymentStatus],
        source: bookingSourceToApi[booking.source],
        startMinute: booking.startMinute,
        status: bookingStatusToApi[booking.status],
        totalPrice: booking.totalPrice,
        venueId: booking.venueId,
      })),
      courts: courts.map((court) => ({
        hourlyRate: court.hourlyRate,
        id: court.id,
        isIndoor: court.isIndoor,
        name: court.name,
        status: courtStatusToApi[court.status],
        surface: courtSurfaceToApi[court.surface],
        venueId: court.venueId,
      })),
      customers: customers.map((customer) => ({
        email: customer.email ?? '',
        id: customer.id,
        joinedAt: toDateString(customer.createdAt),
        name: customer.fullName,
        phone: customer.phone,
        status: userStatusToApi[customer.status],
      })),
      payments: payments.map((payment) => ({
        amount: payment.amount,
        bookingId: payment.bookingId,
        createdAt: payment.createdAt.toISOString(),
        customerId: payment.userId,
        id: payment.id,
        method: paymentMethodToApi[payment.method],
        paidAt: payment.paidAt?.toISOString(),
        status: paymentStatusToApi[payment.status],
        transactionCode: payment.transactionCode,
      })),
      venues: venues.map((venue) => ({
        address: venue.address,
        closingMinute: venue.closingMinute,
        id: venue.id,
        name: venue.name,
        openingMinute: venue.openingMinute,
        status: venueStatusToApi[venue.status],
        timezone: venue.timezone,
      })),
    };
  }

  async createCourt(dto: AdminCourtDto) {
    const group = await this.prisma.courtGroup.findFirst({
      where: { venueId: dto.venueId },
    });

    const count = await this.prisma.court.count({
      where: { venueId: dto.venueId },
    });

    const court = await this.prisma.court.create({
      data: {
        groupId: group?.id ?? null,
        hourlyRate: dto.hourlyRate,
        isIndoor: dto.isIndoor,
        name: dto.name,
        sortOrder: count + 1,
        status: courtStatusFromApi[dto.status],
        surface: courtSurfaceFromApi[dto.surface],
        venueId: dto.venueId,
      },
    });

    await this.logActivity('COURT_UPDATED', court.id, `Đã thêm ${court.name}.`);

    return { id: court.id };
  }

  async updateCourt(courtId: string, dto: AdminCourtDto) {
    const court = await this.prisma.court.update({
      data: {
        hourlyRate: dto.hourlyRate,
        isIndoor: dto.isIndoor,
        name: dto.name,
        status: courtStatusFromApi[dto.status],
        surface: courtSurfaceFromApi[dto.surface],
        venueId: dto.venueId,
      },
      where: { id: courtId },
    });

    await this.logActivity(
      'COURT_UPDATED',
      court.id,
      `Đã cập nhật ${court.name}.`,
    );

    return { id: court.id };
  }

  async createBooking(dto: AdminCreateBookingDto) {
    const court = await this.prisma.court.findUnique({
      include: { venue: { include: { priceRules: true } } },
      where: { id: dto.courtId },
    });

    if (!court) throw new NotFoundException('Không tìm thấy sân');
    if (dto.endMinute <= dto.startMinute) {
      throw new BadRequestException('Khung giờ không hợp lệ');
    }

    const bookingDate = toDbDate(dto.bookingDate);

    const clash = await this.prisma.booking.findFirst({
      where: {
        bookingDate,
        courtId: dto.courtId,
        startMinute: { lt: dto.endMinute },
        endMinute: { gt: dto.startMinute },
        status: { not: 'CANCELLED' },
      },
    });

    if (clash) {
      throw new BadRequestException(`Khung giờ đã có lịch ${clash.code}`);
    }

    const customer =
      (await this.prisma.user.findUnique({
        where: { phone: dto.customerPhone },
      })) ??
      (await this.prisma.user.create({
        data: {
          fullName: dto.customerName,
          passwordHash: await hash(dto.customerPhone, 10),
          phone: dto.customerPhone,
        },
      }));

    const hours = (dto.endMinute - dto.startMinute) / 60;
    const code = `TH${dto.bookingDate.replaceAll('-', '').slice(2)}${(
      (await this.prisma.booking.count({ where: { bookingDate } })) + 1
    )
      .toString()
      .padStart(2, '0')}`;

    const booking = await this.prisma.booking.create({
      data: {
        bookingDate,
        code,
        courtId: dto.courtId,
        endMinute: dto.endMinute,
        note: dto.note ?? null,
        source: 'COUNTER',
        startMinute: dto.startMinute,
        status: 'CONFIRMED',
        totalPrice: Math.round(court.hourlyRate * hours),
        userId: customer.id,
        venueId: court.venueId,
      },
    });

    await this.prisma.payment.create({
      data: {
        amount: 0,
        bookingId: booking.id,
        method: 'CASH',
        status: 'UNPAID',
        transactionCode: `PAY${booking.code}`,
        userId: customer.id,
      },
    });

    await this.logActivity(
      'BOOKING_CREATED',
      booking.id,
      `Lịch ${booking.code} được tạo từ quầy.`,
    );

    return { code: booking.code, id: booking.id };
  }

  async updateBookingStatus(bookingId: string, status: string) {
    const mapped =
      bookingStatusFromApi[status as keyof typeof bookingStatusFromApi];
    if (!mapped) throw new BadRequestException('Trạng thái lịch không hợp lệ');

    const booking = await this.prisma.booking.update({
      data: { status: mapped },
      where: { id: bookingId },
    });

    await this.logActivity(
      'BOOKING_UPDATED',
      booking.id,
      `Lịch ${booking.code} chuyển sang trạng thái ${status}.`,
    );

    return { id: booking.id };
  }

  async updatePaymentStatus(paymentId: string, status: string) {
    const mapped =
      paymentStatusFromApi[status as keyof typeof paymentStatusFromApi];
    if (!mapped)
      throw new BadRequestException('Trạng thái thanh toán không hợp lệ');

    const payment = await this.prisma.payment.update({
      data: { paidAt: mapped === 'PAID' ? new Date() : null, status: mapped },
      where: { id: paymentId },
    });

    await this.prisma.booking.update({
      data: { paymentStatus: mapped },
      where: { id: payment.bookingId },
    });

    await this.logActivity(
      'PAYMENT_UPDATED',
      payment.id,
      `Giao dịch ${payment.transactionCode} chuyển sang ${status}.`,
    );

    return { id: payment.id };
  }

  async updateCustomerStatus(customerId: string, status: string) {
    const mapped = userStatusFromApi[status as keyof typeof userStatusFromApi];
    if (!mapped)
      throw new BadRequestException('Trạng thái khách hàng không hợp lệ');

    const customer = await this.prisma.user.update({
      data: { status: mapped },
      where: { id: customerId },
    });

    return { id: customer.id };
  }

  private logActivity(
    type:
      | 'BOOKING_CREATED'
      | 'BOOKING_UPDATED'
      | 'COURT_UPDATED'
      | 'PAYMENT_UPDATED',
    entityId: string,
    message: string,
  ) {
    return this.prisma.activityEvent.create({
      data: { entityId, message, type },
    });
  }
}
