import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  bookingSourceToApi,
  bookingStatusToApi,
  paymentStatusToApi,
} from '../../common/api-mapping';
import {
  formatMinutes,
  overlaps,
  toDateString,
  toDbDate,
} from '../../common/date.util';
import { PrismaService } from '../../common/prisma/prisma.service';
import type { Prisma, PriceRule } from '../../generated/prisma/client';
import { CreateBookingDto } from './dto/booking.dto';

type BookingWithRelations = Prisma.BookingGetPayload<{
  include: { court: true; venue: true };
}>;

const codeAlphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function buildBookingCode(date: string) {
  const suffix = Array.from(
    { length: 4 },
    () => codeAlphabet[Math.floor(Math.random() * codeAlphabet.length)],
  ).join('');

  return `TH${date.replaceAll('-', '').slice(2)}${suffix}`;
}

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateBookingDto) {
    const venue = await this.prisma.venue.findUnique({
      include: { priceRules: { orderBy: { sortOrder: 'asc' } } },
      where: { id: dto.venueId },
    });

    if (!venue) throw new NotFoundException('Không tìm thấy sân');

    const bookingDate = toDbDate(dto.date);
    const courtIds = [...new Set(dto.slots.map((slot) => slot.courtId))];
    const courts = await this.prisma.court.findMany({
      where: { id: { in: courtIds }, venueId: venue.id },
    });

    if (courts.length !== courtIds.length) {
      throw new BadRequestException('Có sân không thuộc địa điểm này');
    }

    const unavailable = courts.find((court) => court.status !== 'AVAILABLE');
    if (unavailable) {
      throw new ConflictException(
        `${unavailable.name} hiện không nhận đặt lịch`,
      );
    }

    for (const slot of dto.slots) {
      if (slot.endMinute <= slot.startMinute) {
        throw new BadRequestException('Khung giờ không hợp lệ');
      }

      if (
        slot.startMinute < venue.openingMinute ||
        slot.endMinute > venue.closingMinute
      ) {
        throw new BadRequestException(
          `Sân chỉ nhận đặt trong khung ${formatMinutes(venue.openingMinute)} - ${formatMinutes(venue.closingMinute)}`,
        );
      }
    }

    const [existingBookings, blocks] = await Promise.all([
      this.prisma.booking.findMany({
        where: {
          bookingDate,
          courtId: { in: courtIds },
          status: { not: 'CANCELLED' },
        },
      }),
      this.prisma.courtBlock.findMany({
        where: { blockDate: bookingDate, courtId: { in: courtIds } },
      }),
    ]);

    const courtById = new Map(courts.map((court) => [court.id, court]));

    for (const slot of dto.slots) {
      const clashBooking = existingBookings.find(
        (booking) =>
          booking.courtId === slot.courtId &&
          overlaps(
            slot.startMinute,
            slot.endMinute,
            booking.startMinute,
            booking.endMinute,
          ),
      );

      if (clashBooking) {
        throw new ConflictException(
          `${courtById.get(slot.courtId)?.name ?? 'Sân'} đã có người đặt khung ${formatMinutes(clashBooking.startMinute)} - ${formatMinutes(clashBooking.endMinute)}`,
        );
      }

      const clashBlock = blocks.find(
        (block) =>
          block.courtId === slot.courtId &&
          overlaps(
            slot.startMinute,
            slot.endMinute,
            block.startMinute,
            block.endMinute,
          ),
      );

      if (clashBlock) {
        throw new ConflictException(
          `${courtById.get(slot.courtId)?.name ?? 'Sân'} đang bận: ${clashBlock.title}`,
        );
      }
    }

    const created = await this.prisma.$transaction(async (tx) => {
      const bookings: BookingWithRelations[] = [];

      for (const slot of dto.slots) {
        const court = courtById.get(slot.courtId)!;
        const totalPrice = this.calculatePrice(
          venue.priceRules,
          court.hourlyRate,
          slot.startMinute,
          slot.endMinute,
          venue.slotMinutes,
        );

        const booking = await tx.booking.create({
          data: {
            bookingDate,
            code: buildBookingCode(dto.date),
            courtId: slot.courtId,
            endMinute: slot.endMinute,
            note: dto.note ?? null,
            paymentStatus: 'UNPAID',
            source: 'ONLINE',
            startMinute: slot.startMinute,
            status: 'PENDING',
            totalPrice,
            userId,
            venueId: venue.id,
          },
          include: { court: true, venue: true },
        });

        await tx.payment.create({
          data: {
            amount: 0,
            bookingId: booking.id,
            method: 'E_WALLET',
            status: 'UNPAID',
            transactionCode: `PAY${booking.code}`,
            userId,
          },
        });

        await tx.activityEvent.create({
          data: {
            entityId: booking.id,
            message: `Lịch ${booking.code} được tạo từ ứng dụng.`,
            type: 'BOOKING_CREATED',
          },
        });

        bookings.push(booking);
      }

      await tx.notification.create({
        data: {
          kind: 'BOOKING',
          message: `Bạn đã giữ ${bookings.length} khung giờ tại ${venue.name} ngày ${dto.date}. Vui lòng thanh toán để xác nhận.`,
          title: 'Giữ chỗ thành công',
          userId,
        },
      });

      return bookings;
    });

    return {
      bookings: created.map((booking) => this.toApiBooking(booking)),
      total: created.reduce((sum, booking) => sum + booking.totalPrice, 0),
    };
  }

  async listMine(userId: string, date?: string) {
    const bookings = await this.prisma.booking.findMany({
      include: { court: true, venue: true },
      orderBy: [{ bookingDate: 'desc' }, { startMinute: 'asc' }],
      where: { userId, ...(date ? { bookingDate: toDbDate(date) } : {}) },
    });

    return bookings.map((booking) => this.toApiBooking(booking));
  }

  async cancel(userId: string, bookingId: string, isAdmin: boolean) {
    const booking = await this.prisma.booking.findUnique({
      include: { court: true, venue: true },
      where: { id: bookingId },
    });

    if (!booking) throw new NotFoundException('Không tìm thấy lịch đặt');
    if (!isAdmin && booking.userId !== userId) {
      throw new ForbiddenException('Bạn không thể huỷ lịch của người khác');
    }

    if (booking.status === 'CANCELLED') {
      throw new ConflictException('Lịch này đã được huỷ trước đó');
    }

    if (booking.status === 'COMPLETED') {
      throw new ConflictException('Lịch đã hoàn thành, không thể huỷ');
    }

    const updated = await this.prisma.booking.update({
      data: { status: 'CANCELLED' },
      include: { court: true, venue: true },
      where: { id: bookingId },
    });

    await this.prisma.activityEvent.create({
      data: {
        entityId: booking.id,
        message: `Lịch ${booking.code} đã huỷ.`,
        type: 'BOOKING_UPDATED',
      },
    });

    return this.toApiBooking(updated);
  }

  toApiBooking(booking: {
    bookingDate: Date;
    code: string;
    court: { name: string };
    createdAt: Date;
    endMinute: number;
    id: string;
    note: string | null;
    paymentStatus: keyof typeof paymentStatusToApi;
    source: keyof typeof bookingSourceToApi;
    startMinute: number;
    status: keyof typeof bookingStatusToApi;
    totalPrice: number;
    venue: { id: string; name: string };
  }) {
    return {
      code: booking.code,
      courtName: booking.court.name,
      createdAt: booking.createdAt.toISOString(),
      date: toDateString(booking.bookingDate),
      endMinute: booking.endMinute,
      id: booking.id,
      note: booking.note,
      paymentStatus: paymentStatusToApi[booking.paymentStatus],
      priceLabel: `${booking.totalPrice.toLocaleString('vi-VN')} ₫`,
      source: bookingSourceToApi[booking.source],
      startMinute: booking.startMinute,
      status: bookingStatusToApi[booking.status],
      timeEnd: formatMinutes(booking.endMinute),
      timeStart: formatMinutes(booking.startMinute),
      totalPrice: booking.totalPrice,
      venueId: booking.venue.id,
      venueName: booking.venue.name,
    };
  }

  /** Giá cộng dồn theo từng slot, rơi vào khung giá nào thì tính theo khung đó. */
  private calculatePrice(
    priceRules: PriceRule[],
    hourlyRate: number,
    startMinute: number,
    endMinute: number,
    slotMinutes: number,
  ) {
    let total = 0;

    for (let minute = startMinute; minute < endMinute; minute += slotMinutes) {
      const rule = priceRules.find(
        (priceRule) =>
          minute >= priceRule.startMinute && minute < priceRule.endMinute,
      );
      const rate = rule?.pricePerHour ?? hourlyRate;
      const span = Math.min(slotMinutes, endMinute - minute);
      total += Math.round((rate * span) / 60);
    }

    return total;
  }
}
