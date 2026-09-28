import { Image } from "expo-image";
import { Copy } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import * as Clipboard from "expo-clipboard";

import { sepayContent } from "@/components/payments/SepayCheckoutSheet/content";
import Button from "@/components/ui/Button";
import { ErrorMessage, NoticeMessage, SuccessMessage } from "@/components/ui/Feedback";
import Touch from "@/components/ui/Pressable";
import Sheet from "@/components/ui/Sheet";
import { getPaymentProgress } from "@/lib/api/endpoints";
import { useSession } from "@/lib/api/session";
import type { ApiPaymentStatus, ApiSepayCheckout } from "@/lib/api/types";
import { formatCurrency } from "@/lib/format";

type SepayCheckoutSheetProps = {
  checkout: ApiSepayCheckout | null;
  isOpen: boolean;
  onClose: () => void;
  /** Gọi khi tiền đã vào, để màn cha tải lại dữ liệu. */
  onPaid?: () => void;
};

const pollIntervalMs = 4000;

const countdownLabel = (msLeft: number) => {
  const total = Math.max(Math.floor(msLeft / 1000), 0);
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

/**
 * `qrUrl` từ server chốt số tiền tại lúc tạo giao dịch. Sau khi khách trả thiếu,
 * số còn nợ đã khác nên phải dựng lại ảnh QR theo đúng phần còn lại.
 */
const buildQrUrl = (checkout: ApiSepayCheckout, amount: number) => {
  if (amount === checkout.amount) return checkout.qrUrl;

  const params = new URLSearchParams({
    acc: checkout.accountNumber,
    amount: String(amount),
    bank: checkout.bankCode,
    des: checkout.transferContent,
    template: "compact",
  });

  return `https://qr.sepay.vn/img?${params.toString()}`;
};

/**
 * Màn quét QR: hỏi trạng thái giao dịch theo chu kỳ cho tới khi webhook của SePay
 * báo tiền đã vào, hoặc tới khi mã hết hạn.
 */
export default function SepayCheckoutSheet({ checkout, isOpen, onClose, onPaid }: SepayCheckoutSheetProps) {
  const { token } = useSession();
  const [status, setStatus] = useState<ApiPaymentStatus>("unpaid");
  const [outstanding, setOutstanding] = useState(0);
  const [msLeft, setMsLeft] = useState(0);
  const [copiedField, setCopiedField] = useState("");
  /** Chặn gọi onPaid nhiều lần: prop là hàm inline nên đổi định danh mỗi lần render. */
  const hasReportedPaid = useRef(false);

  const paymentId = checkout?.paymentId ?? "";
  const expiresAt = checkout?.expiresAt ?? "";
  // Chỉ "paid" mới dừng hỏi. Trả thiếu vẫn phải hỏi tiếp để bắt được lần chuyển bù.
  const isPaid = status === "paid";
  const amountDue = outstanding || checkout?.amount || 0;

  // Đồng hồ đếm ngược, chạy độc lập với việc hỏi trạng thái.
  useEffect(() => {
    if (!isOpen || !expiresAt) return;

    const tick = () => setMsLeft(new Date(expiresAt).getTime() - Date.now());
    tick();
    const timer = setInterval(tick, 1000);

    return () => clearInterval(timer);
  }, [expiresAt, isOpen]);

  // setState nằm trong callback của promise để effect không cập nhật state ngay trong thân hàm.
  useEffect(() => {
    if (!isOpen || !token || !paymentId || isPaid) return;

    let isActive = true;

    const check = () => {
      getPaymentProgress(token, paymentId)
        .then((progress) => {
          if (!isActive) return;
          setStatus(progress.status);
          setOutstanding(progress.amount);
        })
        .catch(() => undefined);
    };

    check();
    const timer = setInterval(check, pollIntervalMs);

    return () => {
      isActive = false;
      clearInterval(timer);
    };
  }, [isOpen, isPaid, paymentId, token]);

  // Mỗi giao dịch chỉ báo "đã trả" một lần, dù effect chạy lại vì onPaid đổi định danh.
  useEffect(() => {
    if (!isPaid || hasReportedPaid.current) return;

    hasReportedPaid.current = true;
    onPaid?.();
  }, [isPaid, onPaid]);

  // QR mới mở thì mọi trạng thái của giao dịch trước phải được xoá sạch.
  useEffect(() => {
    hasReportedPaid.current = false;
    setStatus("unpaid");
    setOutstanding(0);
    setCopiedField("");
  }, [paymentId]);

  const copy = async (field: string, value: string) => {
    await Clipboard.setStringAsync(value);
    setCopiedField(field);
  };

  // Hết hạn chỉ tính khi chưa nhận được đồng nào; đã trả một phần thì vẫn cho bù tiếp.
  const isExpired = msLeft <= 0 && status === "unpaid";
  const canStillPay = !isPaid && !isExpired;

  const rows = checkout
    ? [
        { id: "bank", label: sepayContent.bankLabel, value: checkout.bankCode },
        { id: "account", label: sepayContent.accountLabel, value: checkout.accountNumber },
        { id: "holder", label: sepayContent.holderLabel, value: checkout.accountName },
        {
          id: "amount",
          label: isPaid ? sepayContent.amountLabel : sepayContent.remainingLabel,
          value: formatCurrency(isPaid ? checkout.totalAmount : amountDue),
        },
        { id: "content", label: sepayContent.contentLabel, value: checkout.transferContent },
      ]
    : [];

  return (
    <Sheet
      closeLabel={sepayContent.close}
      footer={<Button fullWidth label={isPaid ? sepayContent.done : sepayContent.close} onPress={onClose} />}
      isOpen={isOpen}
      onClose={onClose}
      title={sepayContent.title}
    >
      {!checkout ? (
        <View className="items-center gap-3 py-10">
          <ActivityIndicator color="#0f9b58" size="large" />
          <Text className="text-[14px] text-[#68716d]">{sepayContent.loading}</Text>
        </View>
      ) : (
        <View className="gap-3">
          {isPaid ? <SuccessMessage text={sepayContent.paid} /> : null}
          {status === "partial" ? <NoticeMessage text={sepayContent.partial(formatCurrency(amountDue))} /> : null}
          {isExpired ? <ErrorMessage text={sepayContent.expired} /> : null}

          {canStillPay ? (
            <>
              <Text className="text-[14px] leading-5 text-[#3c4742]">{sepayContent.qrHint}</Text>
              <View className="items-center">
                <Image
                  contentFit="contain"
                  source={{ uri: buildQrUrl(checkout, amountDue) }}
                  style={{ borderRadius: 12, height: 240, width: 240 }}
                />
              </View>
              <View className="flex-row items-center justify-center gap-2">
                <ActivityIndicator color="#0f9b58" size="small" />
                <Text className="text-[13px] text-[#68716d]">{sepayContent.waiting}</Text>
              </View>
              {msLeft > 0 ? (
                <Text className="text-center text-[13px] font-semibold text-[#008447]">
                  {sepayContent.expiresIn(countdownLabel(msLeft))}
                </Text>
              ) : null}
            </>
          ) : null}

          <View className="mt-1 overflow-hidden rounded-xl border border-[#e1e6e3]">
            {rows.map((row, index) => (
              <View
                className={`flex-row items-center gap-2 px-3 py-2.5 ${index + 1 < rows.length ? "border-b border-[#eef1ef]" : ""}`}
                key={row.id}
              >
                <Text className="w-[120px] text-[13px] text-[#68716d]">{row.label}</Text>
                <Text className="min-w-0 flex-1 text-[14px] font-semibold text-[#172720]">{row.value}</Text>
                <Touch
                  accessibilityLabel={`${sepayContent.copy} ${row.label}`}
                  className="p-1"
                  onPress={() => void copy(row.id, row.value)}
                >
                  <Copy color={copiedField === row.id ? "#008447" : "#8a9690"} size={16} />
                </Touch>
              </View>
            ))}
          </View>

          {copiedField ? <Text className="text-right text-[12px] text-[#008447]">{sepayContent.copied}</Text> : null}

          <NoticeMessage text={sepayContent.contentWarning} />
        </View>
      )}
    </Sheet>
  );
}
