import { CalendarDays, CheckCircle2, Clock3, CreditCard, Phone, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";

import type {
  BookingCourt,
  BookingCustomer,
  BookingScheduleContent,
  BookingSelection,
  BookingStatus,
  CourtBooking,
  CreateBookingInput,
} from "@/components/booking/BookingSchedule/types";
import { formatCurrency, formatDateLabel, formatMinutes } from "@/components/booking/BookingSchedule/utils";

type BookingDetailPanelProps = {
  booking?: CourtBooking;
  content: BookingScheduleContent;
  court?: BookingCourt;
  customer?: BookingCustomer;
  onClose: () => void;
  onCreate: (input: CreateBookingInput) => void;
  onStatusChange: (status: BookingStatus) => void;
  selection: BookingSelection;
};

type DetailItemProps = {
  icon: typeof CalendarDays;
  label: string;
  value: string;
};

function DetailItem({ icon: Icon, label, value }: DetailItemProps) {
  return (
    <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
      <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        <Icon aria-hidden="true" className="size-3.5" />
        {label}
      </dt>
      <dd className="mt-1.5 text-sm font-bold text-slate-700">{value}</dd>
    </div>
  );
}

export default function BookingDetailPanel({ booking, content, court, customer, onClose, onCreate, onStatusChange, selection }: BookingDetailPanelProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onCreate({ customerName: customerName.trim(), customerPhone: customerPhone.trim(), note: note.trim() });
  }

  const isCreating = selection.kind === "slot";
  const title = isCreating ? content.createBookingLabel : content.bookingDetailLabel;

  return (
    <div className="fixed inset-0 z-[1200] flex items-end justify-end sm:items-stretch" role="presentation">
      <button aria-label={content.closeLabel} className="absolute inset-0 bg-slate-950/35 backdrop-blur-[2px]" onClick={onClose} type="button" />
      <aside aria-labelledby="booking-detail-title" aria-modal="true" className="relative z-10 flex max-h-[92dvh] w-full flex-col rounded-t-3xl bg-white shadow-2xl sm:max-h-none sm:w-[420px] sm:rounded-none" role="dialog">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-600">{content.venueName}</p>
            <h2 className="mt-1 text-xl font-bold text-slate-900" id="booking-detail-title">{title}</h2>
            {isCreating && <p className="mt-1 text-sm text-slate-500">{content.createBookingDescription}</p>}
          </div>
          <button aria-label={content.closeLabel} className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40" onClick={onClose} type="button">
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          {court && (
            <div className="mb-4 flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
              <div>
                <p className="text-sm font-bold text-emerald-950">{court.name}</p>
                <p className="mt-0.5 text-xs text-emerald-700">{content.surfaceLabels[court.surface]}</p>
              </div>
              <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase text-emerald-700 shadow-sm">{content.courtStatusLabels[court.status]}</span>
            </div>
          )}

          {isCreating ? (
            <form className="space-y-4" id="create-booking-form" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-2">
                <DetailItem icon={CalendarDays} label={content.dateLabel} value={formatDateLabel(selection.date)} />
                <DetailItem icon={Clock3} label={content.timeLabel} value={`${formatMinutes(selection.startMinute)} – ${formatMinutes(selection.endMinute)}`} />
              </div>
              <label className="block">
                <span className="text-xs font-bold text-slate-600">{content.customerNameLabel}</span>
                <input autoFocus className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-800 outline-none transition-shadow focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15" onChange={(event) => setCustomerName(event.target.value)} placeholder={content.customerNamePlaceholder} required type="text" value={customerName} />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-slate-600">{content.customerPhoneLabel}</span>
                <input className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-800 outline-none transition-shadow focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15" onChange={(event) => setCustomerPhone(event.target.value)} placeholder={content.customerPhonePlaceholder} required type="tel" value={customerPhone} />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-slate-600">{content.noteLabel}</span>
                <textarea className="mt-1.5 min-h-24 w-full resize-y rounded-lg border border-slate-200 p-3 text-sm text-slate-800 outline-none transition-shadow focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15" onChange={(event) => setNote(event.target.value)} placeholder={content.notePlaceholder} value={note} />
              </label>
            </form>
          ) : booking && customer ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <DetailItem icon={CalendarDays} label={content.dateLabel} value={formatDateLabel(booking.bookingDate)} />
                <DetailItem icon={Clock3} label={content.timeLabel} value={`${formatMinutes(booking.startMinute)} – ${formatMinutes(booking.endMinute)}`} />
                <DetailItem icon={UserRound} label={content.customerLabel} value={customer.name} />
                <DetailItem icon={Phone} label={content.customerPhoneLabel} value={customer.phone} />
                <DetailItem icon={CreditCard} label={content.paymentLabel} value={content.paymentStatusLabels[booking.paymentStatus]} />
                <DetailItem icon={CheckCircle2} label={content.statusLabel} value={content.bookingStatusLabels[booking.status]} />
              </div>
              <dl className="divide-y divide-slate-100 rounded-xl border border-slate-200 px-4">
                <div className="flex items-center justify-between gap-4 py-3 text-sm">
                  <dt className="text-slate-500">{content.bookingCodeLabel}</dt>
                  <dd className="font-bold text-slate-800">{booking.code}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-3 text-sm">
                  <dt className="text-slate-500">{content.priceLabel}</dt>
                  <dd className="font-bold text-emerald-700">{formatCurrency(booking.totalPrice)}</dd>
                </div>
                {booking.note && (
                  <div className="py-3 text-sm">
                    <dt className="text-slate-500">{content.noteLabel}</dt>
                    <dd className="mt-1 font-medium leading-6 text-slate-700">{booking.note}</dd>
                  </div>
                )}
              </dl>
            </div>
          ) : null}
        </div>

        <div className="border-t border-slate-100 bg-white px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-4">
          {isCreating ? (
            <button className="h-11 w-full rounded-xl bg-[#0f9b58] px-4 text-sm font-bold text-white shadow-[0_5px_14px_-6px_rgba(15,155,88,0.8)] transition-colors hover:bg-[#0b864c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/45 active:scale-[0.99]" form="create-booking-form" type="submit">
              {content.createBookingLabel}
            </button>
          ) : booking && booking.status !== "cancelled" && booking.status !== "completed" ? (
            <div className="grid grid-cols-2 gap-2">
              <button className="h-11 rounded-xl border border-rose-200 bg-white px-3 text-sm font-bold text-rose-600 transition-colors hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/30" onClick={() => onStatusChange("cancelled")} type="button">{content.cancelBookingLabel}</button>
              <button className="h-11 rounded-xl bg-[#0f9b58] px-3 text-sm font-bold text-white transition-colors hover:bg-[#0b864c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/45" onClick={() => onStatusChange("confirmed")} type="button">{content.confirmBookingLabel}</button>
            </div>
          ) : (
            <button className="h-11 w-full rounded-xl bg-slate-100 px-4 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-200" onClick={onClose} type="button">{content.closeLabel}</button>
          )}
        </div>
      </aside>
    </div>
  );
}
