import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'khải duy' })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({ example: 'khaiduy@example.com' })
  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email?: string;

  @ApiPropertyOptional({ example: 2000 })
  @IsOptional()
  @IsInt()
  @Min(1900)
  @Max(2100)
  birthYear?: number;

  @ApiPropertyOptional({ example: 'Khác' })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ example: 172 })
  @IsOptional()
  @IsInt()
  @Min(50)
  @Max(260)
  heightCm?: number;

  @ApiPropertyOptional({ example: 65 })
  @IsOptional()
  @IsInt()
  @Min(20)
  @Max(300)
  weightKg?: number;

  @ApiPropertyOptional({ example: 'Chơi vào buổi tối' })
  @IsOptional()
  @IsString()
  note?: string;
}

export class BuyTicketDto {
  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: '0912345678' })
  @Matches(/^0\d{8,10}$/, { message: 'Số điện thoại không hợp lệ' })
  phone: string;
}
