import { useState } from "react";
import { View } from "react-native";

import type { Court, CourtPayload, CourtStatus, CourtSurface, Venue } from "@/components/admin/AdminData/types";
import { courtsContent } from "@/components/courts/CourtsManagement/content";
import Button from "@/components/ui/Button";
import Drawer from "@/components/ui/Drawer";
import FormField from "@/components/ui/FormField";
import NumberField from "@/components/ui/NumberField";
import Select from "@/components/ui/Select";
import SwitchField from "@/components/ui/SwitchField";
import TextField from "@/components/ui/TextField";

type CourtFormPanelProps = {
  court?: Court;
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: CourtPayload) => void;
  venues: Venue[];
};

function toOptions<T extends string>(labels: Record<T, string>) {
  return (Object.entries(labels) as [T, string][]).map(([value, label]) => ({ label, value }));
}

export default function CourtFormPanel({ court, isOpen, onClose, onSave, venues }: CourtFormPanelProps) {
  const [name, setName] = useState(court?.name ?? "");
  const [venueId, setVenueId] = useState(court?.venueId ?? venues[0]?.id ?? "");
  const [surface, setSurface] = useState<CourtSurface>(court?.surface ?? "hard");
  const [status, setStatus] = useState<CourtStatus>(court?.status ?? "available");
  const [hourlyRate, setHourlyRate] = useState(court?.hourlyRate ?? 180000);
  const [isIndoor, setIsIndoor] = useState(court?.isIndoor ?? false);
  const [nameError, setNameError] = useState("");

  const save = () => {
    if (!name.trim()) {
      setNameError("Nhập tên sân");
      return;
    }

    setNameError("");
    onSave({ hourlyRate, isIndoor, name: name.trim(), status, surface, venueId });
  };

  return (
    <Drawer
      footer={<Button fullWidth label={courtsContent.saveLabel} onPress={save} size="large" />}
      isOpen={isOpen}
      onClose={onClose}
      title={court ? courtsContent.editLabel : courtsContent.createLabel}
      width={420}
    >
      <FormField error={nameError} label="Tên sân">
        <TextField autoCapitalize="words" onChangeText={setName} placeholder="Sân số 1" value={name} />
      </FormField>

      <FormField label="Cơ sở">
        <Select
          accessibilityLabel="Cơ sở"
          onChange={setVenueId}
          options={venues.map((venue) => ({ label: venue.name, value: venue.id }))}
          value={venueId}
        />
      </FormField>

      <FormField label="Bề mặt">
        <Select accessibilityLabel="Bề mặt" onChange={setSurface} options={toOptions(courtsContent.surfaceLabels)} value={surface} />
      </FormField>

      <FormField label="Trạng thái">
        <Select accessibilityLabel="Trạng thái" onChange={setStatus} options={toOptions(courtsContent.statusLabels)} value={status} />
      </FormField>

      <NumberField label="Giá thuê mỗi giờ" onChange={setHourlyRate} value={hourlyRate} />

      <View className="pt-1">
        <SwitchField label="Sân trong nhà" onChange={setIsIndoor} value={isIndoor} />
      </View>
    </Drawer>
  );
}
