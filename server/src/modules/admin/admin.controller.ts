import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Roles } from '../../common/auth/auth.decorators';
import { AdminService } from './admin.service';
import {
  AdminCourtDto,
  AdminCreateBookingDto,
  AdminStatusDto,
} from './dto/admin.dto';

@ApiBearerAuth()
@ApiTags('admin')
@Controller('admin')
@Roles('ADMIN')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Toàn bộ dữ liệu vận hành cho khu vực quản trị' })
  @Get('data')
  data() {
    return this.adminService.data();
  }

  @ApiOperation({ summary: 'Thêm sân mới' })
  @Post('courts')
  createCourt(@Body() dto: AdminCourtDto) {
    return this.adminService.createCourt(dto);
  }

  @ApiOperation({ summary: 'Cập nhật thông tin sân' })
  @Put('courts/:courtId')
  updateCourt(@Param('courtId') courtId: string, @Body() dto: AdminCourtDto) {
    return this.adminService.updateCourt(courtId, dto);
  }

  @ApiOperation({ summary: 'Tạo lịch tại quầy' })
  @Post('bookings')
  createBooking(@Body() dto: AdminCreateBookingDto) {
    return this.adminService.createBooking(dto);
  }

  @ApiOperation({ summary: 'Đổi trạng thái lịch đặt' })
  @Patch('bookings/:bookingId/status')
  updateBookingStatus(
    @Param('bookingId') bookingId: string,
    @Body() dto: AdminStatusDto,
  ) {
    return this.adminService.updateBookingStatus(bookingId, dto.status);
  }

  @ApiOperation({ summary: 'Đổi trạng thái giao dịch' })
  @Patch('payments/:paymentId/status')
  updatePaymentStatus(
    @Param('paymentId') paymentId: string,
    @Body() dto: AdminStatusDto,
  ) {
    return this.adminService.updatePaymentStatus(paymentId, dto.status);
  }

  @ApiOperation({ summary: 'Khoá hoặc mở khoá tài khoản khách hàng' })
  @Patch('customers/:customerId/status')
  updateCustomerStatus(
    @Param('customerId') customerId: string,
    @Body() dto: AdminStatusDto,
  ) {
    return this.adminService.updateCustomerStatus(customerId, dto.status);
  }
}
