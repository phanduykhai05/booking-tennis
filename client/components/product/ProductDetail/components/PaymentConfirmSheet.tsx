import { CalendarDays, Check, ChevronDown, Ticket } from "lucide-react";
import { useState } from "react";

import CountryPicker from "@/components/auth/CountryPicker";
import { defaultCountry } from "@/components/auth/CountryPicker/countries";
import type { Country } from "@/components/auth/CountryPicker/types";
import type { BookingEvent, CheckoutLabels } from "@/components/product/ProductDetail/types";
import Button from "@/components/ui/Button";
import CountryFlag from "@/components/ui/CountryFlag";
import { ErrorMessage, NoticeMessage } from "@/components/ui/Feedback";
import Touch from "@/components/ui/Pressable";
import Sheet from "@/components/ui/Sheet";
import { formatCurrency } from "@/lib/format";

export type TicketPaymentMethod = "cash" | "sepay";

type PaymentConfirmSheetProps = {
  accountInitial: string;
  accountName: string;
  errorMessage: string;
  event: BookingEvent;
  isOpen: boolean;
  isSubmitting: boolean;
  labels: CheckoutLabels;
  onClose: () => void;
  onConfirm: (phone: string, method: TicketPaymentMethod) => void;
  quantity: number;
  requiresSignIn: boolean;
};

const paymentMethods: { description: string; id: TicketPaymentMethod; label: string }[] = [
  { description: "Quét mã QR, hệ thống tự xác nhận khi tiền vào.", id: "sepay", label: "Chuyển khoản SePay" },
  { description: "Trả trực tiếp khi đến sân.", id: "cash", label: "Tiền mặt tại quầy" },
];

export default function PaymentConfirmSheet({
  accountInitial,
  accountName,
  errorMessage,
  event,
  isOpen,
  isSubmitting,
  labels,
  onClose,
  onConfirm,
  quantity,
  requiresSignIn,
}: PaymentConfirmSheetProps) {
  const [phone, setPhone] = useState("");
  const [shouldSavePhone, setShouldSavePhone] = useState(true);
  const [country, setCountry] = useState<Country>(defaultCountry);
  const [isCountryPickerOpen, setCountryPickerOpen] = useState(false);
  const [method, setMethod] = useState<TicketPaymentMethod>("sepay");
  const hasValidPhone = phone.replace(/\D/g, "").length >= 9;

  return (
    <Sheet
      closeLabel={labels.cancel}
      footer={
        <div className="flex-row gap-3">
          <div className="flex-1">
            <Button fullWidth label={labels.cancel} onPress={onClose} tone="outline" />
          </div>
          <div className="flex-[2.1]">
            <Button
              disabled={!hasValidPhone}
              fullWidth
              isLoading={isSubmitting}
              label={labels.confirm}
              onPress={() => onConfirm(phone, method)}
            />
          </div>
        </div>
      }
      isOpen={isOpen}
      onClose={onClose}
      title={labels.title}
    >
      <div className="gap-3">
        <div>
          <span className="mb-1.5 text-[16px] font-semibold text-[#007b45]">{labels.userInfo}</span>
          <div className="h-14 flex-row items-center gap-2 rounded-lg border border-[#9bd9b8] bg-[#edfcf2] px-2.5">
            <div className="h-9 w-9 items-center justify-center rounded-full bg-[#6570d7]">
              <span className="text-[18px] font-medium uppercase text-white">{accountInitial}</span>
            </div>
            <span className="text-[15px] font-medium text-[#172720]">{accountName}</span>
          </div>
        </div>

        <div>
          <span className="mb-1 text-[15px] font-medium text-[#172720]">
            {labels.phone}
            <span className="text-[#e63345]">*</span>
          </span>
          <div className="h-10 flex-row overflow-hidden rounded-lg border border-[#d7ddda] bg-white">
            <Touch
              accessibilityLabel={`Chọn quốc gia, hiện tại ${country.name}`}
              className="w-[58px] flex-row items-center justify-center gap-1 border-r border-[#e4e7e5]"
              onPress={() => setCountryPickerOpen(true)}
            >
              <CountryFlag code={country.code} size={16} />
              <ChevronDown color="#172720" size={14} />
            </Touch>
            <input
              aria-label={labels.phone}
              className="min-w-0 flex-1 bg-transparent px-2 text-[15px] text-[#172720] outline-none placeholder:text-[#929794]"
              inputMode="tel"
              onChange={(event) => setPhone(event.target.value)}
              placeholder={labels.phonePlaceholder}
              type="tel"
              value={phone}
            />
          </div>

          <Touch className="mt-2 flex-row items-center gap-2" onPress={() => setShouldSavePhone((value) => !value)}>
            <div
              className={`h-[17px] w-[17px] items-center justify-center rounded-[2px] border ${shouldSavePhone ? "border-[#008447] bg-[#008447]" : "border-[#aeb9b3] bg-white"}`}
            >
              {shouldSavePhone ? <Check color="#ffffff" size={13} strokeWidth={3} /> : null}
            </div>
            <span className="flex-1 text-[13px] text-[#49544f]">{labels.addPhone}</span>
          </Touch>
        </div>

        <div>
          <span className="mb-1.5 text-[15px] font-medium text-[#172720]">Phương thức thanh toán</span>
          <div className="gap-2">
            {paymentMethods.map((option) => {
              const isActive = method === option.id;

              return (
                <Touch
                  aria-checked={isActive}
                  role="radio"
                  className={`flex-row items-start gap-2.5 rounded-lg border px-3 py-2.5 ${isActive ? "border-[#008447] bg-[#edfcf2]" : "border-[#d7ddda] bg-white"}`}
                  key={option.id}
                  onPress={() => setMethod(option.id)}
                >
                  <div
                    className={`mt-0.5 h-[18px] w-[18px] items-center justify-center rounded-full border-2 ${isActive ? "border-[#008447]" : "border-[#aeb9b3]"}`}
                  >
                    {isActive ? <div className="h-2.5 w-2.5 rounded-full bg-[#008447]" /> : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className={`text-[14px] font-semibold ${isActive ? "text-[#007b45]" : "text-[#172720]"}`}>
                      {option.label}
                    </span>
                    <span className="mt-0.5 text-[12px] text-[#68716d]">{option.description}</span>
                  </div>
                </Touch>
              );
            })}
          </div>
        </div>

        <div className="gap-2 border-b border-[#e1e6e3] pb-3">
          <div className="flex-row gap-2">
            <CalendarDays color="#8a9690" size={15} style={{ marginTop: 2 }} />
            <div className="flex-1">
              <span className="text-[14px] text-[#8a918e]">{labels.event}</span>
              <span className="text-[14px] font-semibold text-[#172720]">{event.title}</span>
            </div>
          </div>
          <div className="flex-row gap-2">
            <Ticket color="#8a9690" size={15} style={{ marginTop: 2 }} />
            <div className="flex-1">
              <span className="text-[14px] text-[#8a918e]">{labels.ticket}</span>
              <span className="text-[14px] font-semibold text-[#008447]">{quantity} vé</span>
            </div>
          </div>
        </div>

        <div className="flex-row items-center">
          <span className="flex-1 text-[16px] font-medium text-[#172720]">{labels.total}</span>
          <span className="text-[18px] font-bold text-[#007b45]">{formatCurrency(event.priceValue * quantity)}</span>
        </div>

        {requiresSignIn ? <NoticeMessage text={labels.signInMessage} /> : null}
        <ErrorMessage text={errorMessage} />
      </div>

      <CountryPicker
        isOpen={isCountryPickerOpen}
        onClose={() => setCountryPickerOpen(false)}
        onSelect={(selected) => {
          setCountry(selected);
          setCountryPickerOpen(false);
        }}
        selectedCode={country.code}
      />
    </Sheet>
  );
}
