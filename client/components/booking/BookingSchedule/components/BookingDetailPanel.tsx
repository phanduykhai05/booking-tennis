import { useState } from "react";
import { Text, View } from "react-native";

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

// RN không có bộ chọn `:last-child`, nên dòng cuối phải được đánh dấu bằng prop.
function DescriptionRow({ isLast, label, value }: DescriptionRowProps) {
  return (
    <View className={`flex-row ${isLast ? "" : "border-b border-slate-200"}`}>
      <View className="w-[130px] bg-slate-50 px-3 py-2">
        <Text className="text-[13px] text-slate-500">{label}</Text>
      </View>
      <View className="flex-1 px-3 py-2">
        <Text className="text-[13px] text-slate-800">{value}</Text>
      </View>
    </View>
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
        <View className="flex-row gap-2">
          <View className="flex-1">
            <Button fullWidth label={content.cancelBookingLabel} onPress={() => onStatusChange("cancelled")} size="large" tone="danger" />
          </View>
          <View className="flex-1">
            <Button fullWidth label={content.confirmBookingLabel} onPress={() => onStatusChange("confirmed")} size="large" />
          </View>
        </View>
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
        <View
          className={`rounded-lg border p-3 ${court.status === "available" ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}
        >
          <View className="flex-row items-center justify-between gap-2">
            <Text className="text-[15px] font-bold text-slate-900">{court.name}</Text>
            <StatusBadge
              label={content.courtStatusLabels[court.status]}
              tone={court.status === "available" ? "emerald" : "slate"}
            />
          </View>
          <Text className="mt-1 text-[13px] text-slate-600">
            {content.surfaceLabels[court.surface]}
            {court.isIndoor ? ` · ${content.indoorLabel}` : ""}
          </Text>
        </View>
      ) : null}

      {selection?.kind === "slot" ? (
        <View className="gap-4">
          <View className="rounded-lg border border-sky-200 bg-sky-50 p-3">
            <Text className="text-[14px] font-semibold text-sky-900">{content.createBookingDescription}</Text>
            <Text className="mt-1 text-[13px] text-sky-800">
              {formatDateLabel(selection.date)} · {formatMinutes(selection.startMinute)} – {formatMinutes(selection.endMinute)}
            </Text>
          </View>

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
        </View>
      ) : booking && customer ? (
        <View className="gap-4">
          {/* Khối tóm tắt: mã, trạng thái và giá trị — ba thứ cần thấy ngay khi mở panel. */}
          <View className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <View className="flex-row flex-wrap items-center justify-between gap-3">
              <View>
                <Text className="text-[12px] text-slate-500">{content.bookingCodeLabel}</Text>
                <Text className="mt-0.5 text-[20px] font-bold text-slate-900">{booking.code}</Text>
              </View>
              <View className="rounded px-2 py-1" style={{ backgroundColor: bookingStatusStyles[booking.status].background }}>
                <Text className="text-[12px] font-semibold" style={{ color: bookingStatusStyles[booking.status].text }}>
                  {content.bookingStatusLabels[booking.status]}
                </Text>
              </View>
            </View>
            <Text className="mt-3 text-[24px] font-bold text-emerald-600">{formatCurrency(booking.totalPrice)}</Text>
          </View>

          <View className="flex-row items-center gap-3">
            <Avatar label={getInitials(customer.name)} size={44} />
            <View className="min-w-0 flex-1">
              <Text className="text-[15px] font-bold text-slate-900">{customer.name}</Text>
              <Text className="text-[12px] text-slate-500">{customer.phone}</Text>
            </View>
          </View>

          <View className="overflow-hidden rounded-lg border border-slate-200">
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
          </View>
        </View>
      ) : null}
    </Drawer>
  );
}
