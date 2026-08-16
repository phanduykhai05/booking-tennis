"use client";

import { Col, Input, Row, Select } from "antd";

import type {
  BookingCourt,
  BookingFilterState,
  BookingScheduleContent,
  BookingStatus,
} from "@/components/booking/BookingSchedule/types";

type BookingFiltersProps = {
  content: BookingScheduleContent;
  courts: BookingCourt[];
  filters: BookingFilterState;
  onChange: (filters: BookingFilterState) => void;
  statusOptions: BookingStatus[];
};

export default function BookingFilters({ content, courts, filters, onChange, statusOptions }: BookingFiltersProps) {
  return (
    <Row gutter={[8, 8]} role="search">
      <Col span={24} md={10}>
        <Input.Search
          allowClear
          aria-label={content.searchLabel}
          onChange={(event) => onChange({ ...filters, query: event.target.value })}
          placeholder={content.searchPlaceholder}
          size="large"
          value={filters.query}
        />
      </Col>
      <Col span={12} md={7}>
        <Select<BookingFilterState["status"]>
          aria-label={content.statusFilterLabel}
          className="!w-full"
          onChange={(status) => onChange({ ...filters, status })}
          options={[
            { label: content.allStatusesLabel, value: "all" },
            ...statusOptions.map((status) => ({ label: content.bookingStatusLabels[status], value: status })),
          ]}
          size="large"
          value={filters.status}
        />
      </Col>
      <Col span={12} md={7}>
        <Select
          aria-label={content.courtFilterLabel}
          className="!w-full"
          onChange={(courtId) => onChange({ ...filters, courtId })}
          options={[
            { label: content.allCourtsLabel, value: "all" },
            ...courts.map((court) => ({ label: court.name, value: court.id })),
          ]}
          size="large"
          value={filters.courtId}
        />
      </Col>
    </Row>
  );
}
