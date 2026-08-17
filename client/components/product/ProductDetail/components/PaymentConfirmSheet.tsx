"use client";

import { CalendarDays, Check, ChevronDown, Ticket, X } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

import images from "@/components/assets/images";
import { defaultCountry } from "@/components/auth/CountryPicker/countries";
import type { Country } from "@/components/auth/CountryPicker/types";
import CountryCodeDialog from "@/components/product/ProductDetail/components/CountryCodeDialog";
import styles from "@/components/product/ProductDetail/components/PaymentConfirmSheet.module.scss";
import type { BookingEvent, CheckoutLabels } from "@/components/product/ProductDetail/types";

type PaymentConfirmSheetProps = {
  errorMessage: string;
  event: BookingEvent;
  isSubmitting: boolean;
  labels: CheckoutLabels;
  onClose: () => void;
  onConfirm: (phone: string) => void;
  quantity: number;
  requiresSignIn: boolean;
};

const formatTotal = (price: number, quantity: number) => `${(price * quantity).toLocaleString("vi-VN")} ₫`;
const flagsByCode = images.flags as Record<string, StaticImageData>;

export default function PaymentConfirmSheet({ errorMessage, event, isSubmitting, labels, onClose, onConfirm, quantity, requiresSignIn }: PaymentConfirmSheetProps) {
  const [phone, setPhone] = useState("");
  const [shouldSavePhone, setShouldSavePhone] = useState(true);
  const [country, setCountry] = useState<Country>(defaultCountry);
  const [isCountryDialogOpen, setCountryDialogOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const hasValidPhone = phone.replace(/\D/g, "").length >= 9;
  const closeWithAnimation = (afterClose: () => void) => {
    if (isClosing) return;
    setIsClosing(true);
    window.setTimeout(afterClose, 220);
  };

  return (
    <div aria-modal="true" className={`fixed inset-0 z-[80] flex items-end justify-center bg-[#081e16]/55 ${isClosing ? styles.backdropLeaving : styles.backdrop}`} onMouseDown={() => closeWithAnimation(onClose)} role="dialog">
      <section className={`max-h-[88dvh] w-full max-w-[410px] overflow-y-auto rounded-t-[18px] bg-white ${isClosing ? styles.sheetLeaving : styles.sheet}`} onMouseDown={(event) => event.stopPropagation()}>
        <header className="relative flex h-[63px] items-end border-b border-[#e7e9e8] px-4 pb-3">
          <span aria-hidden="true" className="absolute left-1/2 top-2 h-1 w-9 -translate-x-1/2 rounded-full bg-[#dadadd]" />
          <h2 className="text-[17px] font-bold text-[#16251f]">{labels.title}</h2>
          <button aria-label="Đóng" className="ml-auto -mr-1 p-1 text-[#68716d]" onClick={() => closeWithAnimation(onClose)} type="button"><X size={20} /></button>
        </header>

        <div className="space-y-3 px-4 py-3.5 text-[#172720]">
          <section>
            <h3 className="mb-1.5 text-[16px] font-semibold text-[#007b45]">{labels.userInfo}</h3>
            <div className="flex h-14 items-center gap-2 rounded-lg border border-[#9bd9b8] bg-[#edfcf2] px-2.5">
              <span className="flex size-9 items-center justify-center rounded-full bg-[#6570d7] text-xl font-medium text-white">k</span>
              <span className="text-[15px] font-medium">khải duy</span>
            </div>
          </section>

          <section>
            <label className="mb-1 block text-[15px] font-medium">{labels.phone}<span className="ml-0.5 text-[#e63345]">*</span></label>
            <div className="flex h-10 overflow-hidden rounded-lg border border-[#d7ddda] bg-white focus-within:border-[#008447]">
              <button aria-label={`Chọn quốc gia, hiện tại ${country.name}`} className="flex w-[58px] items-center justify-center gap-1 border-r border-[#e4e7e5] text-[13px]" onClick={() => setCountryDialogOpen(true)} type="button"><Image alt="" className="size-4 rounded-full object-cover" height={16} src={flagsByCode[country.code]} width={16} /><ChevronDown size={14} /></button>
              <input aria-label={labels.phone} className="min-w-0 flex-1 px-2 text-[15px] outline-none placeholder:text-[#929794]" inputMode="tel" onChange={(event) => setPhone(event.target.value)} placeholder={labels.phonePlaceholder} type="tel" value={phone} />
            </div>
            <label className="mt-2 flex cursor-pointer items-center gap-2 text-[13px] text-[#49544f]">
              <input checked={shouldSavePhone} className="sr-only" onChange={(event) => setShouldSavePhone(event.target.checked)} type="checkbox" />
              <span className={`flex size-[17px] items-center justify-center rounded-[2px] border ${shouldSavePhone ? "border-[#008447] bg-[#008447] text-white" : "border-[#aeb9b3] bg-white"}`}><Check size={13} strokeWidth={3} /></span>
              {labels.addPhone}
            </label>
          </section>

          <dl className="space-y-2 border-b border-[#e1e6e3] pb-3 text-[14px]">
            <div className="flex gap-2"><CalendarDays aria-hidden="true" className="mt-0.5 text-[#8a9690]" size={15} /><div><dt className="text-[#8a918e]">{labels.event}</dt><dd className="font-semibold">{event.title}</dd></div></div>
            <div className="flex gap-2"><Ticket aria-hidden="true" className="mt-0.5 text-[#8a9690]" size={15} /><div><dt className="text-[#8a918e]">{labels.ticket}</dt><dd className="font-semibold text-[#008447]">{quantity} vé</dd></div></div>
          </dl>

          <div className="flex items-center text-[16px] font-medium"><span>{labels.total}</span><strong className="ml-auto text-[18px] font-bold text-[#007b45]">{formatTotal(event.priceValue, quantity)}</strong></div>

          {requiresSignIn && <p className="rounded-md bg-[#fff6e2] px-3 py-2 text-[13px] text-[#8a5b00]">{labels.signInMessage}</p>}
          {errorMessage && <p className="rounded-md bg-[#fdecec] px-3 py-2 text-[13px] font-medium text-[#b3261e]" role="alert">{errorMessage}</p>}
        </div>

        <footer className="flex gap-3 border-t border-[#e7e9e8] px-4 py-3">
          <button className="h-10 flex-1 rounded-lg border border-[#008447] text-[16px] font-semibold text-[#008447]" onClick={() => closeWithAnimation(onClose)} type="button">{labels.cancel}</button>
          <button className="h-10 flex-[2.1] rounded-lg bg-[#008447] text-[16px] font-semibold text-white disabled:bg-[#e7e7e8] disabled:text-[#b7b8bb]" disabled={!hasValidPhone || isSubmitting} onClick={() => onConfirm(phone)} type="button">{labels.confirm}</button>
        </footer>
      </section>
      {isCountryDialogOpen && <CountryCodeDialog onClose={() => setCountryDialogOpen(false)} onSelect={(selectedCountry) => { setCountry(selectedCountry); setCountryDialogOpen(false); }} />}
    </div>
  );
}
