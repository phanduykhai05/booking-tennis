import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Min,
  ValidateNested,
} from 'class-validator';

export class BookingSlotDto {
  @ApiProperty({ example: 'court-01' })
  @IsString()
  courtId: string;

  @ApiProperty({ example: 420, description: 'Số phút tính từ 00:00' })
  @IsInt()
  @Min(0)
  startMinute: number;

  @ApiProperty({ example: 480 })
  @IsInt()
  @Min(1)
  endMinute: number;
}

export class CreateBookingDto {
  @ApiProperty({ example: 'muse-pickle' })
  @IsString()
  venueId: string;

  @ApiProperty({ example: '2026-08-17' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Ngày phải theo định dạng YYYY-MM-DD',
  })
  date: string;

  @ApiProperty({ isArray: true, type: BookingSlotDto })
  @IsArray()
  @ArrayMinSize(1, { message: 'Cần chọn ít nhất một khung giờ' })
  @ValidateNested({ each: true })
  @Type(() => BookingSlotDto)
  slots: BookingSlotDto[];

  @ApiPropertyOptional({ example: 'Cần mượn thêm vợt' })
  @IsOptional()
  @IsString()
  note?: string;
}
