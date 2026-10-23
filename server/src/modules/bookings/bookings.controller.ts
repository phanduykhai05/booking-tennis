import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import type { AuthUser } from '../../common/auth/auth.decorators';
import { CurrentUser } from '../../common/auth/auth.decorators';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/booking.dto';

@ApiBearerAuth()
@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @ApiOperation({
    summary: 'Đặt một hoặc nhiều khung giờ đã chọn trên lưới lịch',
  })
  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateBookingDto) {
    return this.bookingsService.create(user.id, dto);
  }

  @ApiOperation({ summary: 'Lịch đã đặt của tài khoản đang đăng nhập' })
  @ApiQuery({ name: 'date', required: false, example: '2026-08-17' })
  @Get()
  listMine(@CurrentUser() user: AuthUser, @Query('date') date?: string) {
    return this.bookingsService.listMine(user.id, date);
  }

  @ApiOperation({ summary: 'Huỷ lịch đã đặt' })
  @Patch(':bookingId/cancel')
  cancel(@CurrentUser() user: AuthUser, @Param('bookingId') bookingId: string) {
    return this.bookingsService.cancel(
      user.id,
      bookingId,
      user.role === 'ADMIN',
    );
  }
}
