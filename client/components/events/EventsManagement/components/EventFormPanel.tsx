import { useState } from "react";
import { View } from "react-native";

import type { Court, EventPayload, Venue, VenueEvent } from "@/components/admin/AdminData/types";
import { eventsContent } from "@/components/events/EventsManagement/content";
import Button from "@/components/ui/Button";
import DateField from "@/components/ui/DateField";
import Drawer from "@/components/ui/Drawer";
import { NoticeMessage } from "@/components/ui/Feedback";
import FormField from "@/components/ui/FormField";
import NumberField from "@/components/ui/NumberField";
import Select from "@/components/ui/Select";
import TextField from "@/components/ui/TextField";
import { formatMinutes } from "@/lib/format";

type EventFormPanelProps = {
  courts: Court[];
  errorMessage: string;
  event?: VenueEvent;
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: EventPayload) => void;
  venues: Venue[];
};

const noCourtValue = "none";

/** Bước 30 phút, khớp slotMinutes mặc định của lưới lịch; 49 mốc để chọn được cả 24:00. */
const minuteOptions = Array.from({ length: 49 }, (_, index) => ({
  label: formatMinutes(index * 30),
  value: String(index * 30),
}));

export default function EventFormPanel({
  courts,
  errorMessage,
  event,
  isOpen,
  onClose,
  onSave,
  venues,
}: EventFormPanelProps) {
  // Panel mount cùng lúc với trang, lúc đó venues vẫn đang tải nên state khởi tạo rỗng;
  // vì vậy cơ sở mặc định phải suy ra lúc render chứ không chốt ở useState.
  const [pickedVenueId, setPickedVenueId] = useState(event?.venueId ?? "");
  const [courtId, setCourtId] = useState(event?.courtId ?? noCourtValue);
  const [title, setTitle] = useState(event?.title ?? "");
  const [courtLabel, setCourtLabel] = useState(event?.courtLabel ?? "");
  const [eventDate, setEventDate] = useState(event?.eventDate ?? new Date().toISOString().slice(0, 10));
  const [startMinute, setStartMinute] = useState(String(event?.startMinute ?? 540));
  const [endMinute, setEndMinute] = useState(String(event?.endMinute ?? 660));
  const [price, setPrice] = useState(event?.price ?? 60000);
  const [capacity, setCapacity] = useState(event?.capacity ?? 10);
  const [formError, setFormError] = useState("");

  const venueId = pickedVenueId || venues[0]?.id || "";

  // Đổi cơ sở thì sân cũ không còn hợp lệ nữa.
  const venueCourts = courts.filter((court) => court.venueId === venueId);
  const courtOptions = [
    { label: eventsContent.noCourtLabel, value: noCourtValue },
    ...venueCourts.map((court) => ({ label: court.name, value: court.id })),
  ];

  const save = () => {
    if (title.trim().length < 2) {
      setFormError("Tên sự kiện phải có ít nhất 2 ký tự");
      return;
    }

    if (Number(endMinute) <= Number(startMinute)) {
      setFormError("Giờ kết thúc phải sau giờ bắt đầu");
      return;
    }

    if (event && capacity < event.soldCount) {
      setFormError(`Đã bán ${event.soldCount} vé, không thể hạ sức chứa xuống ${capacity}`);
      return;
    }

    setFormError("");
    onSave({
      capacity,
      courtId: courtId === noCourtValue ? undefined : courtId,
      courtLabel: courtLabel.trim() || title.trim(),
      endMinute: Number(endMinute),
      eventDate,
      price,
      startMinute: Number(startMinute),
      title: title.trim(),
      venueId,
    });
  };

  return (
    <Drawer
      footer={<Button fullWidth label={eventsContent.saveLabel} onPress={save} size="large" />}
      isOpen={isOpen}
      onClose={onClose}
      title={event ? eventsContent.editLabel : eventsContent.createLabel}
      width={440}
    >
      <FormField label="Tên sự kiện">
        <TextField autoCapitalize="characters" onChangeText={setTitle} placeholder="SOCIAL SÁNG" value={title} />
      </FormField>

      <FormField label="Cơ sở">
        <Select
          accessibilityLabel="Cơ sở"
          onChange={(value) => {
            setPickedVenueId(value);
            setCourtId(noCourtValue);
          }}
          options={venues.map((venue) => ({ label: venue.name, value: venue.id }))}
          value={venueId}
        />
      </FormField>

      <FormField label={eventsContent.courtLabel}>
        <Select accessibilityLabel={eventsContent.courtLabel} onChange={setCourtId} options={courtOptions} value={courtId} />
      </FormField>

      {courtId === noCourtValue ? <NoticeMessage text={eventsContent.noCourtNotice} /> : null}

      <FormField label="Nhãn sân hiển thị">
        <TextField onChangeText={setCourtLabel} placeholder="Sân 1 - 2" value={courtLabel} />
      </FormField>

      <FormField label="Ngày diễn ra">
        <View className="flex-row">
          <DateField
            accessibilityLabel="Chọn ngày diễn ra"
            displayValue={eventDate}
            onChange={setEventDate}
            tone="light"
            value={eventDate}
          />
        </View>
      </FormField>

      <View className="flex-row gap-3">
        <View className="flex-1">
          <FormField label="Giờ bắt đầu">
            <Select
              accessibilityLabel="Giờ bắt đầu"
              onChange={setStartMinute}
              options={minuteOptions}
              value={startMinute}
            />
          </FormField>
        </View>
        <View className="flex-1">
          <FormField label="Giờ kết thúc">
            <Select accessibilityLabel="Giờ kết thúc" onChange={setEndMinute} options={minuteOptions} value={endMinute} />
          </FormField>
        </View>
      </View>

      <NumberField label="Giá vé" onChange={setPrice} value={price} />
      <NumberField label={eventsContent.capacityLabel} onChange={setCapacity} value={capacity} />

      {formError || errorMessage ? <NoticeMessage text={formError || errorMessage} /> : null}
    </Drawer>
  );
}
