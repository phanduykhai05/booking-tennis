import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Cấu hình SePay đọc từ biến môi trường. Xem `.env.example` để biết cần điền gì.
 *
 * Chưa điền khoá thì `isConfigured` = false: tầng trên sẽ từ chối tạo giao dịch và
 * từ chối webhook, thay vì im lặng xác nhận một khoản tiền chưa hề vào tài khoản.
 */
@Injectable()
export class SepayConfig {
  constructor(private readonly config: ConfigService) {}

  get accountNumber() {
    return this.config.get<string>('SEPAY_ACCOUNT_NUMBER') ?? '';
  }

  get bankCode() {
    return this.config.get<string>('SEPAY_BANK_CODE') ?? '';
  }

  get accountName() {
    return this.config.get<string>('SEPAY_ACCOUNT_NAME') ?? '';
  }

  /** Khoá SePay gửi kèm webhook ở header `Authorization: Apikey <key>`. */
  get webhookApiKey() {
    return this.config.get<string>('SEPAY_WEBHOOK_API_KEY') ?? '';
  }

  /** Số phút mã QR còn hiệu lực; hết hạn thì giao dịch bị huỷ và chỗ giữ được nhả ra. */
  get expiresInMinutes() {
    const raw = Number(this.config.get<string>('SEPAY_QR_EXPIRES_MINUTES'));
    return Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 15;
  }

  get isConfigured() {
    return Boolean(this.accountNumber && this.bankCode && this.webhookApiKey);
  }

  /** Ảnh VietQR do SePay dựng sẵn, không cần gọi API nào khác. */
  buildQrUrl(amount: number, transferContent: string) {
    const params = new URLSearchParams({
      acc: this.accountNumber,
      amount: String(amount),
      bank: this.bankCode,
      des: transferContent,
      template: 'compact',
    });

    return `https://qr.sepay.vn/img?${params.toString()}`;
  }
}
