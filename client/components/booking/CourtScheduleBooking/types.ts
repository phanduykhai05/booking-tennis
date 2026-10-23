export type SlotStatus = "available" | "booked" | "event" | "locked";

export type BlockedSlotStatus = Exclude<SlotStatus, "available">;

export type ScheduleCourt = {
  id: string;
  isIndoor: boolean;
  name: string;
  status: "available" | "inactive" | "maintenance";
  surface: "clay" | "hard" | "synthetic";
};

export type ScheduleCourtGroup = {
  courts: ScheduleCourt[];
  id: string;
  name: string;
};

export type ScheduleEntry = {
  courtId: string;
  endMinute: number;
  startMinute: number;
  status: BlockedSlotStatus;
  title: string;
};

export type SchedulePriceRule = {
  endMinute: number;
  id: string;
  label: string;
  pricePerHour: number;
  startMinute: number;
};

export type CourtScheduleConfig = {
  endMinute: number;
  initialDate: string;
  slotMinutes: number;
  startMinute: number;
};

/** Đúng payload của `GET /venues/:id/schedule`. */
export type CourtScheduleData = {
  config: CourtScheduleConfig;
  entries: ScheduleEntry[];
  groups: ScheduleCourtGroup[];
  priceRules: SchedulePriceRule[];
  venue: { id: string; name: string; phone: string };
};

export type SelectedSlot = {
  courtId: string;
  courtName: string;
  endMinute: number;
  price: number;
  startMinute: number;
};

export type CourtScheduleContent = {
  backLabel: string;
  confirmSheet: {
    backLabel: string;
    confirmLabel: string;
    emptyMessage: string;
    signInMessage: string;
    successMessage: string;
    title: string;
  };
  datePickerLabel: string;
  emptySelection: string;
  errorMessage: string;
  hotline: string;
  loadingMessage: string;
  nextLabel: string;
  notice: {
    prefix: string;
    suffix: string;
    text: string;
  };
  priceListLabel: string;
  priceSheet: {
    closeLabel: string;
    courtsTitle: string;
    priceTitle: string;
    priceUnit: string;
    title: string;
  };
  retryLabel: string;
  scrollLabel: string;
  selectedSummary: string;
  slotStatusLabels: Record<SlotStatus, string>;
  timeColumnLabel: string;
  title: string;
  totalLabel: string;
};
