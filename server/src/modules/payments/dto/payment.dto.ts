import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min, ValidateIf } from 'class-validator';

export class CreateSepayCheckoutDto {
  @ApiPropertyOptional({
    description: 'Trả tiền cho lịch đặt sân. Không đi cùng ticketId.',
  })
  @ValidateIf((dto: CreateSepayCheckoutDto) => !dto.ticketId)
  @IsString({ message: 'Cần bookingId hoặc ticketId để tạo giao dịch' })
  bookingId?: string;

  @ApiPropertyOptional({
    description: 'Trả tiền cho vé sự kiện. Không đi cùng bookingId.',
  })
  @IsOptional()
  @IsString()
  ticketId?: string;
}

/**
 * Payload SePay POST sang khi có tiền vào tài khoản. Chỉ khai báo những trường
 * thực sự dùng để đối soát; SePay gửi thêm nhiều trường khác nhưng không cần.
 */
export class SepayWebhookDto {
  @ApiProperty({ example: 92704 })
  @IsOptional()
  id?: number;

  @ApiPropertyOptional({ example: 'Vietcombank' })
  @IsOptional()
  @IsString()
  gateway?: string;

  @ApiPropertyOptional({ example: 'TH26081601' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 150000 })
  @IsInt({ message: 'transferAmount phải là số nguyên' })
  @Min(0)
  transferAmount: number;

  @ApiPropertyOptional({ example: 'in', description: '"in" là tiền vào' })
  @IsOptional()
  @IsString()
  transferType?: string;

  @ApiPropertyOptional({ example: 'MBVCB.3278907687' })
  @IsOptional()
  @IsString()
  referenceCode?: string;
}
