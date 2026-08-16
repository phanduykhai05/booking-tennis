"use client";

import { UserOutlined } from "@ant-design/icons";
import { Alert, Avatar, Button, Descriptions, Drawer, Flex, Form, Input, Space, Tag, Typography } from "antd";

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

type BookingDetailPanelProps = {
  booking?: CourtBooking;
  content: BookingScheduleContent;
  court?: BookingCourt;
  customer?: BookingCustomer;
  onClose: () => void;
  onCreate: (input: CreateBookingInput) => void;
  onStatusChange: (status: BookingStatus) => void;
  open: boolean;
  // Nullable để Drawer luôn được mount, nhờ vậy còn chạy được animation lúc đóng.
  selection: BookingSelection | null;
};

const emptyCreateValues: CreateBookingInput = { customerName: "", customerPhone: "", note: "" };

function getInitials(name: string) {
  return name.split(" ").slice(-2).map((part) => part[0]).join("");
}

export default function BookingDetailPanel({ booking, content, court, customer, onClose, onCreate, onStatusChange, open, selection }: BookingDetailPanelProps) {
  const isCreating = selection?.kind === "slot";
  const canChangeStatus = Boolean(booking) && booking?.status !== "cancelled" && booking?.status !== "completed";

  function handleFinish(values: CreateBookingInput) {
    onCreate({
      customerName: values.customerName.trim(),
      customerPhone: values.customerPhone.trim(),
      note: values.note?.trim() ?? "",
    });
  }

  function renderFooter() {
    if (isCreating) {
      return <Button block form="create-booking-form" htmlType="submit" size="large" type="primary">{content.createBookingLabel}</Button>;
    }
    if (canChangeStatus) {
      return (
        <Space className="w-full" classNames={{ item: "flex-1" }}>
          <Button block danger onClick={() => onStatusChange("cancelled")} size="large">{content.cancelBookingLabel}</Button>
          <Button block onClick={() => onStatusChange("confirmed")} size="large" type="primary">{content.confirmBookingLabel}</Button>
        </Space>
      );
    }
    return <Button block onClick={onClose} size="large">{content.closeLabel}</Button>;
  }

  return (
    <Drawer
      destroyOnHidden
      footer={renderFooter()}
      onClose={onClose}
      open={open}
      title={isCreating ? content.createBookingLabel : content.bookingDetailLabel}
      width={460}
    >
      {court ? (
        <Alert
          className="!mb-4"
          description={`${content.surfaceLabels[court.surface]}${court.isIndoor ? ` · ${content.indoorLabel}` : ""}`}
          message={
            <Flex align="center" gap="small" justify="space-between">
              <Typography.Text strong>{court.name}</Typography.Text>
              <StatusBadge label={content.courtStatusLabels[court.status]} tone={court.status === "available" ? "emerald" : "slate"} />
            </Flex>
          }
          type={court.status === "available" ? "success" : "warning"}
        />
      ) : null}

      {selection?.kind === "slot" ? (
        <Form<CreateBookingInput> id="create-booking-form" initialValues={emptyCreateValues} layout="vertical" onFinish={handleFinish}>
          <Alert
            className="!mb-4"
            description={`${formatDateLabel(selection.date)} · ${formatMinutes(selection.startMinute)} – ${formatMinutes(selection.endMinute)}`}
            message={content.createBookingDescription}
            showIcon
            type="info"
          />

          <Form.Item label={content.customerNameLabel} name="customerName" rules={[{ message: "Nhập tên khách hàng", required: true }]}>
            <Input autoFocus placeholder={content.customerNamePlaceholder} size="large" />
          </Form.Item>
          <Form.Item label={content.customerPhoneLabel} name="customerPhone" rules={[{ message: "Nhập số điện thoại", required: true }]}>
            <Input placeholder={content.customerPhonePlaceholder} size="large" type="tel" />
          </Form.Item>
          <Form.Item label={content.noteLabel} name="note">
            <Input.TextArea placeholder={content.notePlaceholder} rows={3} />
          </Form.Item>
        </Form>
      ) : booking && customer ? (
        <div className="space-y-4">
          {/* Khối tóm tắt: mã, trạng thái và giá trị — ba thứ cần thấy ngay khi mở panel. */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <Flex align="center" gap="middle" justify="space-between" wrap>
              <div>
                <Typography.Text className="!text-xs" type="secondary">{content.bookingCodeLabel}</Typography.Text>
                <Typography.Title className="!mb-0 !mt-0.5" level={4}>{booking.code}</Typography.Title>
              </div>
              <Tag color={bookingStatusStyles[booking.status].accent} style={{ marginInlineEnd: 0 }}>
                {content.bookingStatusLabels[booking.status]}
              </Tag>
            </Flex>
            <Typography.Title className="!mb-0 !mt-3" level={3} type="success">{formatCurrency(booking.totalPrice)}</Typography.Title>
          </div>

          <Flex align="center" gap="middle">
            <Avatar icon={<UserOutlined />} size={44}>{getInitials(customer.name)}</Avatar>
            <div className="min-w-0">
              <Typography.Paragraph className="!mb-0" strong>{customer.name}</Typography.Paragraph>
              <Typography.Text className="!text-xs" type="secondary">{customer.phone}</Typography.Text>
            </div>
          </Flex>

          <Descriptions bordered column={1} items={[
            { children: <span className="capitalize">{formatDateLabel(booking.bookingDate)}</span>, key: "date", label: content.dateLabel },
            { children: `${formatMinutes(booking.startMinute)} – ${formatMinutes(booking.endMinute)}`, key: "time", label: content.timeLabel },
            { children: content.paymentStatusLabels[booking.paymentStatus], key: "payment", label: content.paymentLabel },
            ...(booking.note ? [{ children: booking.note, key: "note", label: content.noteLabel }] : []),
          ]} size="small" />
        </div>
      ) : null}
    </Drawer>
  );
}
