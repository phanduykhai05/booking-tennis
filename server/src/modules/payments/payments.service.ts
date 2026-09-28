import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';

import {
  paymentMethodToApi,
  paymentStatusToApi,
} from '../../common/api-mapping';
import { PrismaService } from '../../common/prisma/prisma.service';
import type { Payment } from '../../generated/prisma/client';
import { CreateSepayCheckoutDto, SepayWebhookDto } from './dto/payment.dto';
import { SepayConfig } from './sepay.config';

/** Không có ký tự dễ đọc nhầm (0/O, 1/I) vì người dùng có thể gõ tay nội dung chuyển khoản. */
const contentAlphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

/**
 * Ngân hàng hay chèn thêm tiền tố/hậu tố và bỏ dấu cách trong nội dung chuyển khoản,
 * nên khi đối soát ta bỏ hết ký tự không phải chữ/số rồi mới dò chuỗi con.
 */
const squash = (value: string) => value.toUpperCase().replace(/[^A-Z0-9]/g, '');

@Injectable()
export class PaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sepay: SepayConfig,
  ) {}

  private buildTransferContent() {
    const suffix = Array.from(
      { length: 8 },
      () => contentAlphabet[Math.floor(Math.random() * contentAlphabet.length)],
    ).join('');

    return `SP${suffix}`;
  }

  /** Cho tầng gọi kiểm tra TRƯỚC khi tạo dữ liệu, tránh để lại vé treo khi SePay chưa bật. */
  get isSepayAvailable() {
    return this.sepay.isConfigured;
  }

  private assertConfigured() {
    if (this.sepay.isConfigured) return;

    throw new ServiceUnavailableException(
      'Thanh toán SePay chưa được cấu hình. Vui lòng liên hệ quản trị viên.',
    );
  }

  private toCheckoutResponse(payment: Payment, expiresAt: Date) {
    const transferContent = payment.transferContent ?? '';
    // Trả thiếu rồi bù tiếp thì QR chỉ hiện phần còn nợ, không hiện lại tổng.
    const outstanding = Math.max(payment.amount - payment.paidAmount, 0);

    return {
      accountName: this.sepay.accountName,
      accountNumber: this.sepay.accountNumber,
      amount: outstanding,
      bankCode: this.sepay.bankCode,
      expiresAt: expiresAt.toISOString(),
      method: paymentMethodToApi[payment.method],
      paidAmount: payment.paidAmount,
      paymentId: payment.id,
      qrUrl: this.sepay.buildQrUrl(outstanding, transferContent),
      status: paymentStatusToApi[payment.status],
      totalAmount: payment.amount,
      transactionCode: payment.transactionCode,
      transferContent,
    };
  }

  private expiryFrom(createdAt: Date) {
    return new Date(
      createdAt.getTime() + this.sepay.expiresInMinutes * 60 * 1000,
    );
  }

  /**
   * Tạo (hoặc dùng lại) giao dịch SePay cho một lịch đặt sân hoặc một vé sự kiện.
   * Bấm lại khi QR chưa hết hạn sẽ trả về đúng giao dịch cũ, tránh đẻ ra nhiều
   * nội dung chuyển khoản cho cùng một khoản tiền.
   */
  async createSepayCheckout(userId: string, dto: CreateSepayCheckoutDto) {
    this.assertConfigured();

    if (Boolean(dto.bookingId) === Boolean(dto.ticketId)) {
      throw new BadRequestException(
        'Chỉ truyền một trong hai: bookingId hoặc ticketId',
      );
    }

    const target = dto.bookingId
      ? await this.prisma.booking.findUnique({ where: { id: dto.bookingId } })
      : await this.prisma.eventTicket.findUnique({
          where: { id: dto.ticketId },
        });

    if (!target) {
      throw new NotFoundException('Không tìm thấy khoản cần thanh toán');
    }

    if (target.userId !== userId) {
      throw new ForbiddenException('Bạn không có quyền thanh toán khoản này');
    }

    const { totalPrice: amount } = target;
    const subject = dto.bookingId
      ? { bookingId: dto.bookingId }
      : { ticketId: dto.ticketId };

    // Đã trả xong rồi thì không dựng thêm QR nữa, tránh khách chuyển khoản lần hai.
    const settled = await this.prisma.payment.findFirst({
      where: { ...subject, status: { in: ['PAID', 'PARTIAL'] } },
    });

    if (settled?.status === 'PAID') {
      throw new ConflictException('Khoản này đã được thanh toán');
    }

    const existing = await this.prisma.payment.findFirst({
      orderBy: { createdAt: 'desc' },
      where: {
        ...subject,
        method: 'SEPAY',
        status: 'UNPAID',
        transferContent: { not: null },
      },
    });

    if (existing && this.expiryFrom(existing.createdAt) > new Date()) {
      return this.toCheckoutResponse(
        existing,
        this.expiryFrom(existing.createdAt),
      );
    }

    // Còn giao dịch trả thiếu đang mở thì bù nốt phần còn lại chứ không thu lại từ đầu.
    if (settled?.status === 'PARTIAL') {
      return this.toCheckoutResponse(
        settled,
        this.expiryFrom(settled.createdAt),
      );
    }

    const transferContent = this.buildTransferContent();
    const payment = await this.prisma.payment.create({
      data: {
        amount,
        bookingId: dto.bookingId ?? null,
        method: 'SEPAY',
        status: 'UNPAID',
        ticketId: dto.ticketId ?? null,
        transactionCode: `SEPAY${Date.now()}${transferContent.slice(-4)}`,
        transferContent,
        userId,
      },
    });

    return this.toCheckoutResponse(payment, this.expiryFrom(payment.createdAt));
  }

  /** Client hỏi liên tục màn QR để biết tiền đã vào chưa. */
  async status(userId: string, paymentId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment) throw new NotFoundException('Không tìm thấy giao dịch');
    if (payment.userId !== userId) {
      throw new ForbiddenException('Bạn không có quyền xem giao dịch này');
    }

    const expiresAt = this.expiryFrom(payment.createdAt);

    return {
      amount: Math.max(payment.amount - payment.paidAmount, 0),
      expiresAt: expiresAt.toISOString(),
      isExpired: payment.status === 'UNPAID' && expiresAt <= new Date(),
      paidAmount: payment.paidAmount,
      paidAt: payment.paidAt === null ? null : payment.paidAt.toISOString(),
      paymentId: payment.id,
      status: paymentStatusToApi[payment.status],
      totalAmount: payment.amount,
      transactionCode: payment.transactionCode,
    };
  }

  /**
   * Xử lý webhook SePay. Trả về `{ success: true }` kể cả khi không khớp giao dịch nào,
   * vì SePay sẽ gửi lại mãi nếu nhận mã lỗi — mà tiền lạ vào tài khoản thì không phải
   * lỗi của ta. Trường hợp không khớp được ghi lại ở `matched: false` để đối soát tay.
   */
  async handleSepayWebhook(apiKey: string, dto: SepayWebhookDto) {
    this.assertConfigured();

    if (apiKey !== this.sepay.webhookApiKey) {
      throw new ForbiddenException('Khoá webhook không hợp lệ');
    }

    // Chỉ quan tâm tiền vào; SePay cũng bắn cả giao dịch chuyển đi.
    if (dto.transferType && dto.transferType !== 'in') {
      return { matched: false, reason: 'not-incoming', success: true };
    }

    const haystack = squash(`${dto.content ?? ''}${dto.description ?? ''}`);

    // PARTIAL cũng phải nằm trong danh sách dò, nếu không khách bù nốt sẽ không khớp được.
    const candidates = await this.prisma.payment.findMany({
      where: {
        method: 'SEPAY',
        status: { in: ['UNPAID', 'PARTIAL'] },
        transferContent: { not: null },
      },
    });

    const payment = candidates.find(
      (item) =>
        item.transferContent && haystack.includes(squash(item.transferContent)),
    );

    if (!payment) {
      return { matched: false, reason: 'no-matching-payment', success: true };
    }

    // Cộng dồn để lần chuyển thứ hai bù được phần còn thiếu của lần đầu.
    const paidAmount = payment.paidAmount + dto.transferAmount;
    const isFullyPaid = paidAmount >= payment.amount;

    await this.prisma.$transaction(async (tx) => {
      await tx.payment.update({
        data: {
          gatewayRef: dto.referenceCode ?? null,
          paidAmount,
          paidAt: isFullyPaid ? new Date() : null,
          status: isFullyPaid ? 'PAID' : 'PARTIAL',
        },
        where: { id: payment.id },
      });

      if (payment.bookingId) {
        await tx.booking.update({
          data: {
            paymentStatus: isFullyPaid ? 'PAID' : 'PARTIAL',
            ...(isFullyPaid ? { status: 'CONFIRMED' } : {}),
          },
          where: { id: payment.bookingId },
        });
      }

      if (payment.ticketId && isFullyPaid) {
        const ticket = await tx.eventTicket.update({
          data: { status: 'PAID' },
          where: { id: payment.ticketId },
        });

        // soldCount chỉ cộng khi tiền đã vào, nên vé chờ thanh toán không chiếm chỗ vĩnh viễn.
        await tx.venueEvent.update({
          data: { soldCount: { increment: ticket.quantity } },
          where: { id: ticket.eventId },
        });
      }

      const received = dto.transferAmount.toLocaleString('vi-VN');
      const missing = (payment.amount - paidAmount).toLocaleString('vi-VN');

      await tx.notification.create({
        data: {
          kind: 'BOOKING',
          message: isFullyPaid
            ? `Đã nhận ${received} ₫ cho giao dịch ${payment.transactionCode}.`
            : `Đã nhận ${received} ₫ cho giao dịch ${payment.transactionCode}, còn thiếu ${missing} ₫.`,
          title: isFullyPaid ? 'Thanh toán thành công' : 'Thanh toán chưa đủ',
          userId: payment.userId,
        },
      });
    });

    return {
      matched: true,
      paymentId: payment.id,
      status: isFullyPaid ? 'paid' : 'partial',
      success: true,
    };
  }

  /**
   * Huỷ các QR quá hạn chưa trả tiền và nhả chỗ đang giữ.
   * Gọi trước khi đọc chỗ trống để số liệu không bị vé treo làm sai.
   */
  async expireStalePayments() {
    const threshold = new Date(
      Date.now() - this.sepay.expiresInMinutes * 60 * 1000,
    );

    const stale = await this.prisma.payment.findMany({
      where: {
        createdAt: { lt: threshold },
        method: 'SEPAY',
        status: 'UNPAID',
      },
    });

    if (stale.length === 0) return { expired: 0 };

    await this.prisma.$transaction([
      this.prisma.payment.updateMany({
        data: { status: 'FAILED' },
        where: { id: { in: stale.map((item) => item.id) } },
      }),
      this.prisma.eventTicket.updateMany({
        data: { status: 'CANCELLED' },
        where: {
          id: {
            in: stale
              .map((item) => item.ticketId)
              .filter((id): id is string => id !== null),
          },
          status: 'PENDING',
        },
      }),
    ]);

    return { expired: stale.length };
  }
}
