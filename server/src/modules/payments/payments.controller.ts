import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import type { AuthUser } from '../../common/auth/auth.decorators';
import { CurrentUser, Public } from '../../common/auth/auth.decorators';
import { CreateSepayCheckoutDto, SepayWebhookDto } from './dto/payment.dto';
import { PaymentsService } from './payments.service';

/** SePay gửi khoá ở dạng `Authorization: Apikey <key>`. */
const readApiKey = (header?: string) =>
  (header ?? '').replace(/^Apikey\s+/i, '').trim();

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tạo mã QR SePay cho lịch đặt sân hoặc vé sự kiện' })
  @Post('sepay/checkout')
  createSepayCheckout(
    @CurrentUser() user: AuthUser,
    @Body() dto: CreateSepayCheckoutDto,
  ) {
    return this.paymentsService.createSepayCheckout(user.id, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Trạng thái giao dịch, dùng để hỏi liên tục ở màn QR',
  })
  @Get(':paymentId/status')
  status(@CurrentUser() user: AuthUser, @Param('paymentId') paymentId: string) {
    return this.paymentsService.status(user.id, paymentId);
  }

  /**
   * SePay gọi vào đây khi có tiền vào tài khoản. Không dùng JWT — xác thực bằng
   * khoá riêng ở header, nên endpoint phải Public với guard của ứng dụng.
   */
  @ApiExcludeEndpoint()
  @HttpCode(HttpStatus.OK)
  @Post('sepay/webhook')
  @Public()
  handleSepayWebhook(
    @Headers('authorization') authorization: string,
    @Body() dto: SepayWebhookDto,
  ) {
    return this.paymentsService.handleSepayWebhook(
      readApiKey(authorization),
      dto,
    );
  }
}
