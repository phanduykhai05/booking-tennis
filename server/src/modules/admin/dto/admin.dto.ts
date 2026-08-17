import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';

import {
  bookingStatusToApi,
  courtStatusToApi,
  courtSurfaceToApi,
  paymentStatusToApi,
  userStatusToApi,
} from '../../../common/api-mapping';

const bookingStatuses = Object.values(bookingStatusToApi);
const courtStatuses = Object.values(courtStatusToApi);
const courtSurfaces = Object.values(courtSurfaceToApi);
const paymentStatuses = Object.values(paymentStatusToApi);
const userStatuses = Object.values(userStatusToApi);

export class AdminCourtDto {
  @ApiProperty({ example: 'venue-01' })
  @IsString()
  venueId: string;

  @ApiProperty({ example: 'Sân 07' })
  @IsString()
  name: string;

  @ApiProperty({ example: 180000 })
  @IsInt()
  @Min(0)
  hourlyRate: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  isIndoor: boolean;

  @ApiProperty({ enum: courtStatuses, example: 'available' })
  @IsIn(courtStatuses)
  status: (typeof courtStatuses)[number];

  @ApiProperty({ enum: courtSurfaces, example: 'hard' })
  @IsIn(courtSurfaces)
  surface: (typeof courtSurfaces)[number];
}

export class AdminCreateBookingDto {
  @ApiProperty({ example: '2026-08-17' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Ngày phải theo định dạng YYYY-MM-DD',
  })
  bookingDate: string;

  @ApiProperty({ example: 'court-01' })
  @IsString()
  courtId: string;

  @ApiProperty({ example: 'Nguyễn Văn A' })
  @IsString()
  customerName: string;

  @ApiProperty({ example: '0901234567' })
  @Matches(/^0\d{8,10}$/, { message: 'Số điện thoại không hợp lệ' })
  customerPhone: string;

  @ApiProperty({ example: 420 })
  @IsInt()
  @Min(0)
  startMinute: number;

  @ApiProperty({ example: 480 })
  @IsInt()
  @Min(1)
  endMinute: number;

  @ApiPropertyOptional({ example: 'Khách quen' })
  @IsOptional()
  @IsString()
  note?: string;
}

export class AdminStatusDto {
  @ApiProperty({
    description: 'Trạng thái mới, dùng đúng chuỗi mà client đang hiển thị',
    example: 'confirmed',
  })
  @IsIn([...bookingStatuses, ...paymentStatuses, ...userStatuses])
  status: string;
}
