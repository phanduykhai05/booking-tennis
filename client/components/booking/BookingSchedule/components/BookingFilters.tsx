import { View } from "react-native";

import type {
  BookingCourt,
  BookingFilterState,
  BookingScheduleContent,
  BookingStatus,
} from "@/components/booking/BookingSchedule/types";
import SearchField from "@/components/ui/SearchField";
import Select from "@/components/ui/Select";

type BookingFiltersProps = {
  content: BookingScheduleContent;
  courts: BookingCourt[];
  filters: BookingFilterState;
  onChange: (filters: BookingFilterState) => void;
  statusOptions: BookingStatus[];
};

export default function BookingFilters({ content, courts, filters, onChange, statusOptions }: BookingFiltersProps) {
  return (
    <View className="flex-row flex-wrap items-center gap-2">
      <SearchField
        accessibilityLabel={content.searchLabel}
        onChange={(query) => onChange({ ...filters, query })}
        placeholder={content.searchPlaceholder}
        value={filters.query}
      />
      <Select
        accessibilityLabel={content.statusFilterLabel}
        onChange={(status) => onChange({ ...filters, status })}
        options={[
          { label: content.allStatusesLabel, value: "all" as const },
          ...statusOptions.map((status) => ({ label: content.bookingStatusLabels[status], value: status })),
        ]}
        value={filters.status}
        width={190}
      />
      <Select
        accessibilityLabel={content.courtFilterLabel}
        onChange={(courtId) => onChange({ ...filters, courtId })}
        options={[
          { label: content.allCourtsLabel, value: "all" },
          ...courts.map((court) => ({ label: court.name, value: court.id })),
        ]}
        value={filters.courtId}
        width={190}
      />
    </View>
  );
}
