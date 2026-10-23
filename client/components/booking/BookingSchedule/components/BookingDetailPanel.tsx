import { useState } from "react";

import StatusBadge from "@/components/admin/shared/StatusBadge";
import { bookingStatusStyles } from "@/components/booking/BookingSchedule/components/bookingStatusStyles";
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
import Avatar, { getInitials } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Drawer from "@/components/ui/Drawer";
import FormField from "@/components/ui/FormField";
import TextField from "@/components/ui/TextField";

type BookingDetailPanelProps = {
  booking?: CourtBooking;
  content: BookingScheduleContent;
  court?: BookingCourt;
  customer?: BookingCustomer;
  isOpen: boolean;
  onClose: () => void;
  onCreate: (input: CreateBookingInput) => void;
  onStatusChange: (status: BookingStatus) => void;
  selection: BookingSelection | null;
};

type DescriptionRowProps = { isLast?: boolean; label: string; value: string };

// Dòng cuối được đánh dấu bằng prop để bỏ viền dưới, thay vì dựa vào `:last-child`.
function DescriptionRow({ isLast, label, value }: DescriptionRowProps) {
  return (
    <div className={`flex-row ${isLast ? "" : "border-b border-slate-200"}`}>
      <div className="w-[130px] bg-slate-50 px-3 py-2">
        <span className="text-[13px] text-slate-500">{label}</span>
      </div>
      <div className="flex-1 px-3 py-2">
        <span className="text-[13px] text-slate-800">{value}</span>
      </div>
    </div>
  );
}

export default function BookingDetailPanel({
  booking,
  content,
  court,
  customer,
  isOpen,
  onClose,
  onCreate,
  onStatusChange,
  selection,
}: BookingDetailPanelProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({ name: "", phone: "" });

  const isCreating = selection?.kind === "slot";
  const canChangeStatus = Boolean(booking) && booking?.status !== "cancelled" && booking?.status !== "completed";

  const submitCreate = () => {
    const nextErrors = {
      name: customerName.trim() ? "" : "Nhập tên khách hàng",
      phone: customerPhone.trim() ? "" : "Nhập số điện thoại",
    };
    setErrors(nextErrors);

    if (nextErrors.name || nextErrors.phone) return;

    onCreate({ customerName: customerName.trim(), customerPhone: customerPhone.trim(), note: note.trim() });
    setCustomerName("");
    setCustomerPhone("");
    setNote("");
  };

  const renderFooter = () => {
    if (isCreating) return <Button fullWidth label={content.createBookingLabel} onPress={submitCreate} size="large" />;

    if (canChangeStatus) {
      return (
        <div className="flex-row gap-2">
          <div className="flex-1">
            <Button fullWidth label={content.cancelBookingLabel} onPress={() => onStatusChange("cancelled")} size="large" tone="danger" />
          </div>
          <div className="flex-1">
            <Button fullWidth label={content.confirmBookingLabel} onPress={() => onStatusChange("confirmed")} size="large" />
          </div>
        </div>
      );
    }

    return <Button fullWidth label={content.closeLabel} onPress={onClose} size="large" tone="outline" />;
  };

  return (
    <Drawer
      footer={renderFooter()}
      isOpen={isOpen}
      onClose={onClose}
      title={isCreating ? content.createBookingLabel : content.bookingDetailLabel}
    >
      {court ? (
        <div
          className={`rounded-lg border p-3 ${court.status === "available" ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}
        >
          <div className="flex-row items-center justify-between gap-2">
            <span className="text-[15px] font-bold text-slate-900">{court.name}</span>
            <StatusBadge
              label={content.courtStatusLabels[court.status]}
              tone={court.status === "available" ? "emerald" : "slate"}
            />
          </div>
          <span className="mt-1 text-[13px] text-slate-600">
            {content.surfaceLabels[court.surface]}
            {court.isIndoor ? ` · ${content.indoorLabel}` : ""}
          </span>
        </div>
      ) : null}

      {selection?.kind === "slot" ? (
        <div className="gap-4">
          <div className="rounded-lg border border-sky-200 bg-sky-50 p-3">
            <span className="text-[14px] font-semibold text-sky-900">{content.createBookingDescription}</span>
            <span className="mt-1 text-[13px] text-sky-800">
              {formatDateLabel(selection.date)} · {formatMinutes(selection.startMinute)} – {formatMinutes(selection.endMinute)}
            </span>
          </div>

          <FormField error={errors.name} label={content.customerNameLabel}>
            <TextField
              autoCapitalize="words"
              onChangeText={setCustomerName}
              placeholder={content.customerNamePlaceholder}
              value={customerName}
            />
          </FormField>

          <FormField error={errors.phone} label={content.customerPhoneLabel}>
            <TextField
              keyboardType="phone-pad"
              onChangeText={setCustomerPhone}
              placeholder={content.customerPhonePlaceholder}
              value={customerPhone}
            />
          </FormField>

          <FormField label={content.noteLabel}>
            <TextField multiline onChangeText={setNote} placeholder={content.notePlaceholder} value={note} />
          </FormField>
        </div>
      ) : booking && customer ? (
        <div className="gap-4">
          {/* Khối tóm tắt: mã, trạng thái và giá trị — ba thứ cần thấy ngay khi mở panel. */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex-row flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[12px] text-slate-500">{content.bookingCodeLabel}</span>
                <span className="mt-0.5 text-[20px] font-bold text-slate-900">{booking.code}</span>
              </div>
              <div className="rounded px-2 py-1" style={{ backgroundColor: bookingStatusStyles[booking.status].background }}>
                <span className="text-[12px] font-semibold" style={{ color: bookingStatusStyles[booking.status].text }}>
                  {content.bookingStatusLabels[booking.status]}
                </span>
              </div>
            </div>
            <span className="mt-3 text-[24px] font-bold text-emerald-600">{formatCurrency(booking.totalPrice)}</span>
          </div>

          <div className="flex-row items-center gap-3">
            <Avatar label={getInitials(customer.name)} size={44} />
            <div className="min-w-0 flex-1">
              <span className="text-[15px] font-bold text-slate-900">{customer.name}</span>
              <span className="text-[12px] text-slate-500">{customer.phone}</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-200">
            <DescriptionRow label={content.dateLabel} value={formatDateLabel(booking.bookingDate)} />
            <DescriptionRow
              label={content.timeLabel}
              value={`${formatMinutes(booking.startMinute)} – ${formatMinutes(booking.endMinute)}`}
            />
            <DescriptionRow
              isLast={!booking.note}
              label={content.paymentLabel}
              value={content.paymentStatusLabels[booking.paymentStatus]}
            />
            {booking.note ? <DescriptionRow isLast label={content.noteLabel} value={booking.note} /> : null}
          </div>
        </div>
      ) : null}
    </Drawer>
  );
}
