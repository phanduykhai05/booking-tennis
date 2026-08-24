import Select from "@/components/ui/Select";
import { formatDayMonthYear } from "@/lib/date";

type DateFilterProps = {
  allDatesLabel: string;
  dates: string[];
  onChange: (value: string) => void;
  value: string;
};

export default function DateFilter({ allDatesLabel, dates, onChange, value }: DateFilterProps) {
  return (
    <Select
      accessibilityLabel="Lọc lịch đặt theo ngày"
      onChange={onChange}
      options={[
        { label: allDatesLabel, value: "all" },
        ...dates.map((date) => ({ label: formatDayMonthYear(date), value: date })),
      ]}
      value={value}
      width={178}
    />
  );
}
