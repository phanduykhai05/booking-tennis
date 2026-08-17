import { Injectable, NotFoundException } from '@nestjs/common';

import {
  ApiSlotStatus,
  courtStatusToApi,
  courtSurfaceToApi,
  venueBadgeToneToApi,
} from '../../common/api-mapping';
import {
  formatMinutes,
  todayInAppTimezone,
  toDateString,
  toDbDate,
} from '../../common/date.util';
import { PrismaService } from '../../common/prisma/prisma.service';
import type { Venue } from '../../generated/prisma/client';

const weekdayLabels = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const earthRadiusMeters = 6371000;

const toRadians = (value: number) => (value * Math.PI) / 180;

function distanceInMeters(
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number,
) {
  const deltaLat = toRadians(toLat - fromLat);
  const deltaLng = toRadians(toLng - fromLng);
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(toRadians(fromLat)) *
      Math.cos(toRadians(toLat)) *
      Math.sin(deltaLng / 2) ** 2;

  return 2 * earthRadiusMeters * Math.asin(Math.sqrt(a));
}

const formatDistance = (meters: number) =>
  meters < 1000 ? `${meters.toFixed(1)}m` : `${(meters / 1000).toFixed(1)}km`;

const formatPrice = (value: number) => `${value.toLocaleString('vi-VN')} ₫`;

function formatEventDate(date: Date) {
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  return `${weekdayLabels[date.getUTCDay()]} ${day}/${month}`;
}

function formatCountdown(milliseconds: number) {
  const totalSeconds = Math.max(Math.floor(milliseconds / 1000), 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value: number) => value.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

@Injectable()
export class VenuesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(params: {
    lat?: number;
    lng?: number;
    q?: string;
    sport?: string;
  }) {
    const venues = await this.prisma.venue.findMany({
      include: { badges: { orderBy: { sortOrder: 'asc' } } },
      orderBy: [{ isFeatured: 'desc' }, { name: 'asc' }],
      where: {
        status: 'ACTIVE',
        ...(params.sport ? { sportId: params.sport } : {}),
        ...(params.q
          ? {
              OR: [
                { name: { contains: params.q, mode: 'insensitive' as const } },
                {
                  address: { contains: params.q, mode: 'insensitive' as const },
                },
              ],
            }
          : {}),
      },
    });

    const withDistance = venues.map((venue) => ({
      venue,
      meters:
        params.lat !== undefined && params.lng !== undefined
          ? distanceInMeters(
              params.lat,
              params.lng,
              venue.latitude,
              venue.longitude,
            )
          : null,
    }));

    withDistance.sort((first, second) => {
      if (first.meters === null || second.meters === null) return 0;
      return first.meters - second.meters;
    });

    return withDistance.map(({ meters, venue }) => ({
      address: venue.address,
      badges: venue.badges.map((badge) => ({
        id: badge.code,
        label: badge.label,
        tone: venueBadgeToneToApi[badge.tone],
      })),
      cover: venue.coverKey,
      distanceLabel: meters === null ? '' : formatDistance(meters),
      id: venue.id,
      logo: venue.logoKey,
      name: venue.name,
      offerCount: venue.offerCount || undefined,
      openingLabel: this.openingLabel(venue),
      productHref: `/product/${venue.id}`,
      rating: venue.rating,
      sport: venue.sportId,
    }));
  }

  async mapMarkers() {
    const venues = await this.prisma.venue.findMany({
      include: { sport: true },
      where: { status: 'ACTIVE' },
    });

    return venues.map((venue) => ({
      id: venue.id,
      isFeatured: venue.isFeatured || undefined,
      latitude: venue.latitude,
      longitude: venue.longitude,
      name: venue.name,
      sport: venue.sport.icon,
    }));
  }

  async detail(venueId: string) {
    const venue = await this.prisma.venue.findUnique({
      include: {
        badges: { orderBy: { sortOrder: 'asc' } },
        sport: true,
        // Chỉ lấy sự kiện từ hôm nay trở đi, trang chi tiết không hiển thị sự kiện đã qua.
        events: {
          orderBy: [{ eventDate: 'asc' }, { startMinute: 'asc' }],
          where: { eventDate: { gte: toDbDate(todayInAppTimezone()) } },
        },
      },
      where: { id: venueId },
    });

    if (!venue) throw new NotFoundException('Không tìm thấy sân');

    const now = Date.now();

    return {
      address: venue.address,
      badges: venue.badges.map((badge) => ({
        id: badge.code,
        label: badge.label,
        tone: venueBadgeToneToApi[badge.tone],
      })),
      cover: venue.coverKey,
      directionsHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.address)}`,
      events: venue.events.map((event) => {
        const startsAt = new Date(
          event.eventDate.getTime() + event.startMinute * 60000,
        );
        const endsAt = new Date(
          event.eventDate.getTime() + event.endMinute * 60000,
        );
        const isLive = now >= startsAt.getTime() && now < endsAt.getTime();

        return {
          available: `${Math.max(event.capacity - event.soldCount, 0)}/${event.capacity}`,
          court: event.courtLabel,
          date: formatEventDate(event.eventDate),
          endsAt: endsAt.toISOString(),
          id: event.id,
          isLive,
          price: formatPrice(event.price),
          priceValue: event.price,
          startsAt: startsAt.toISOString(),
          status: isLive
            ? 'Đang diễn ra'
            : `Còn ${formatCountdown(startsAt.getTime() - now)}`,
          timeEnd: formatMinutes(event.endMinute),
          timeStart: formatMinutes(event.startMinute),
          title: event.title,
        };
      }),
      logo: venue.logoKey,
      mark: venue.mark,
      openingLabel: this.openingLabel(venue),
      phone: venue.phone,
      // Dữ liệu cho bottom sheet xem nhanh trên trang chủ (tab Thông tin / Gói hội viên / Dịch vụ / Hình ảnh).
      preview: {
        amenities: venue.amenities,
        categories: [venue.sport.label, 'Đơn ngày', 'Sự kiện'],
        description:
          venue.description ??
          `${venue.name} nhận đặt lịch trực tuyến, thanh toán linh hoạt.`,
        gallery: [
          'Không gian sân',
          'Khu vực chờ',
          'Dụng cụ tại sân',
          'Khu gửi xe',
        ],
        memberships: [
          {
            description:
              'Ưu đãi giá sân và quyền ưu tiên đặt khung giờ đẹp cho hội viên.',
            id: 'standard',
            title: 'Gói hội viên tiêu chuẩn',
          },
          {
            description:
              'Phù hợp khách chơi thường xuyên: giảm giá nhiều khung giờ, tặng buổi tập thử.',
            id: 'premium',
            title: 'Gói hội viên nâng cao',
          },
        ],
        openingLabel: this.openingLabel(venue),
        phone: venue.phone,
        services: [
          {
            description:
              'Vợt, bóng và dụng cụ được chuẩn bị sẵn tại quầy lễ tân.',
            id: 'equipment',
            title: 'Thuê dụng cụ thể thao',
          },
          {
            description:
              'Nước uống, khu vực nghỉ và chỗ gửi xe cho người chơi.',
            id: 'refreshments',
            title: 'Tiện ích tại sân',
          },
          {
            description:
              'Huấn luyện viên hỗ trợ cho người mới bắt đầu theo yêu cầu.',
            id: 'coaching',
            title: 'Huấn luyện viên',
          },
        ],
      },
      rating: venue.rating,
      slug: venue.id,
      sport: venue.sportId,
      venue: venue.name,
    };
  }

  /** Dữ liệu cho màn "Đặt lịch theo sân - trực quan". */
  async schedule(venueId: string, date: string) {
    const venue = await this.prisma.venue.findUnique({
      include: {
        courtGroups: {
          include: { courts: { orderBy: { sortOrder: 'asc' } } },
          orderBy: { sortOrder: 'asc' },
        },
        priceRules: { orderBy: { sortOrder: 'asc' } },
      },
      where: { id: venueId },
    });

    if (!venue) throw new NotFoundException('Không tìm thấy sân');

    const bookingDate = toDbDate(date);
    const courtIds = venue.courtGroups.flatMap((group) =>
      group.courts.map((court) => court.id),
    );

    const [bookings, blocks] = await Promise.all([
      this.prisma.booking.findMany({
        include: { court: true },
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

    const entries: {
      courtId: string;
      endMinute: number;
      startMinute: number;
      status: Exclude<ApiSlotStatus, 'available'>;
      title: string;
    }[] = [];

    // Sân đang bảo trì/ngừng hoạt động bị khoá nguyên ngày.
    for (const group of venue.courtGroups) {
      for (const court of group.courts) {
        if (court.status === 'AVAILABLE') continue;

        entries.push({
          courtId: court.id,
          endMinute: venue.closingMinute,
          startMinute: venue.openingMinute,
          status: 'locked',
          title:
            court.status === 'MAINTENANCE'
              ? 'Sân đang bảo trì'
              : 'Sân ngừng hoạt động',
        });
      }
    }

    for (const block of blocks) {
      entries.push({
        courtId: block.courtId,
        endMinute: block.endMinute,
        startMinute: block.startMinute,
        status: block.kind === 'EVENT' ? 'event' : 'locked',
        title: block.title,
      });
    }

    for (const booking of bookings) {
      entries.push({
        courtId: booking.courtId,
        endMinute: booking.endMinute,
        startMinute: booking.startMinute,
        status: 'booked',
        title: 'Đã có người đặt',
      });
    }

    return {
      config: {
        endMinute: venue.closingMinute,
        initialDate: toDateString(bookingDate),
        slotMinutes: venue.slotMinutes,
        startMinute: venue.openingMinute,
      },
      entries,
      groups: venue.courtGroups.map((group) => ({
        courts: group.courts.map((court) => ({
          id: court.id,
          isIndoor: court.isIndoor,
          name: court.name,
          status: courtStatusToApi[court.status],
          surface: courtSurfaceToApi[court.surface],
        })),
        id: group.id,
        name: group.name,
      })),
      priceRules: venue.priceRules.map((rule) => ({
        endMinute: rule.endMinute,
        id: rule.id,
        label: rule.label,
        pricePerHour: rule.pricePerHour,
        startMinute: rule.startMinute,
      })),
      venue: { id: venue.id, name: venue.name, phone: venue.phone },
    };
  }

  private openingLabel(venue: Venue) {
    return `${formatMinutes(venue.openingMinute)} - ${formatMinutes(venue.closingMinute)}`;
  }
}
