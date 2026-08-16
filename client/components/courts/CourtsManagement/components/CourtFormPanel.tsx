"use client";

import { Button, Drawer, Form, Input, InputNumber, Select, Switch } from "antd";

import type { Court, CourtPayload, CourtStatus, CourtSurface, Venue } from "@/components/admin/AdminData/types";
import { courtsContent } from "@/components/courts/CourtsManagement/content";

type CourtFormPanelProps = {
  court?: Court;
  onClose: () => void;
  onSave: (payload: CourtPayload) => void;
  open: boolean;
  venues: Venue[];
};

type CourtFormValues = {
  hourlyRate: number;
  isIndoor: boolean;
  name: string;
  status: CourtStatus;
  surface: CourtSurface;
  venueId: string;
};

function toOptions(labels: Record<string, string>) {
  return Object.entries(labels).map(([value, label]) => ({ label, value }));
}

export default function CourtFormPanel({ court, onClose, onSave, open, venues }: CourtFormPanelProps) {
  const [form] = Form.useForm<CourtFormValues>();

  const initialValues: CourtFormValues = {
    hourlyRate: court?.hourlyRate ?? 180000,
    isIndoor: court?.isIndoor ?? false,
    name: court?.name ?? "",
    status: court?.status ?? "available",
    surface: court?.surface ?? "hard",
    venueId: court?.venueId ?? venues[0]?.id ?? "",
  };

  function handleFinish(values: CourtFormValues) {
    onSave({ ...values, name: values.name.trim() });
  }

  return (
    <Drawer
      destroyOnHidden
      footer={<Button block form="court-form" htmlType="submit" size="large" type="primary">{courtsContent.saveLabel}</Button>}
      onClose={onClose}
      open={open}
      title={court ? courtsContent.editLabel : courtsContent.createLabel}
      width={420}
    >
      <Form<CourtFormValues> form={form} id="court-form" initialValues={initialValues} layout="vertical" onFinish={handleFinish}>
        <Form.Item label="Tên sân" name="name" rules={[{ message: "Nhập tên sân", required: true }]}>
          <Input autoFocus />
        </Form.Item>
        <Form.Item label="Cơ sở" name="venueId">
          <Select options={venues.map((venue) => ({ label: venue.name, value: venue.id }))} />
        </Form.Item>
        <Form.Item label="Bề mặt" name="surface">
          <Select options={toOptions(courtsContent.surfaceLabels)} />
        </Form.Item>
        <Form.Item label="Trạng thái" name="status">
          <Select options={toOptions(courtsContent.statusLabels)} />
        </Form.Item>
        <Form.Item label="Giá thuê mỗi giờ" name="hourlyRate" rules={[{ message: "Nhập giá thuê", required: true }]}>
          <InputNumber<number>
            className="!w-full"
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            min={0}
            parser={(value) => Number(`${value}`.replaceAll(".", ""))}
            step={10000}
          />
        </Form.Item>
        <Form.Item label="Sân trong nhà" name="isIndoor" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
