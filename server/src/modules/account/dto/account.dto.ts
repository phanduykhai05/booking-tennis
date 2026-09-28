import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'khải duy' })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Họ tên phải có ít nhất 2 ký tự' })
  fullName?: string;

  @ApiPropertyOptional({ example: 'khaiduy@example.com' })
  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email?: string;

  @ApiPropertyOptional({ example: 2000 })
  @IsOptional()
  @IsInt({ message: 'Năm sinh phải là số nguyên' })
  @Min(1900, { message: 'Năm sinh phải nằm trong khoảng 1900 - 2100' })
  @Max(2100, { message: 'Năm sinh phải nằm trong khoảng 1900 - 2100' })
  birthYear?: number;

  @ApiPropertyOptional({ example: 'Khác' })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ example: 172 })
  @IsOptional()
  @IsInt({ message: 'Chiều cao phải là số nguyên' })
  @Min(50, { message: 'Chiều cao phải nằm trong khoảng 50 - 260 cm' })
  @Max(260, { message: 'Chiều cao phải nằm trong khoảng 50 - 260 cm' })
  heightCm?: number;

  @ApiPropertyOptional({ example: 65 })
  @IsOptional()
  @IsInt({ message: 'Cân nặng phải là số nguyên' })
  @Min(20, { message: 'Cân nặng phải nằm trong khoảng 20 - 300 kg' })
  @Max(300, { message: 'Cân nặng phải nằm trong khoảng 20 - 300 kg' })
  weightKg?: number;

  @ApiPropertyOptional({ example: 'Chơi vào buổi tối' })
  @IsOptional()
  @IsString()
  note?: string;
}

export class BuyTicketDto {
  @ApiProperty({ example: 2 })
  @IsInt({ message: 'Số lượng vé phải là số nguyên' })
  @Min(1, { message: 'Phải mua ít nhất 1 vé' })
  quantity: number;

  @ApiProperty({ example: '0912345678' })
  @Matches(/^0\d{8,10}$/, { message: 'Số điện thoại không hợp lệ' })
  phone: string;

  @ApiPropertyOptional({
    description:
      '"sepay" tạo vé chờ thanh toán kèm mã QR; mặc định "cash" giữ nguyên luồng trả tại quầy.',
    enum: ['cash', 'sepay'],
    example: 'sepay',
  })
  @IsOptional()
  @IsIn(['cash', 'sepay'], { message: 'Phương thức thanh toán không hợp lệ' })
  paymentMethod?: 'cash' | 'sepay';
}
