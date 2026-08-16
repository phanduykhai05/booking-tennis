"use client";

import { DollarOutlined, EditOutlined, EnvironmentOutlined, PlusOutlined, ToolOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Select, Table, Typography } from "antd";
import type { TableProps } from "antd";
import { useState } from "react";

import { useAdminData } from "@/components/admin/AdminData";
import type { Court, CourtPayload, CourtStatus } from "@/components/admin/AdminData/types";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";
import AdminTableCard from "@/components/admin/shared/AdminTableCard";
import MetricCard from "@/components/admin/shared/MetricCard";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import type { StatusTone } from "@/components/admin/shared/StatusBadge";
import { formatCurrency } from "@/components/booking/BookingSchedule/utils";
import CourtFormPanel from "@/components/courts/CourtsManagement/components/CourtFormPanel";
import { courtsContent } from "@/components/courts/CourtsManagement/content";

const statusTone: Record<CourtStatus, StatusTone> = { available: "emerald", inactive: "slate", maintenance: "orange" };

const statusFilterOptions = [
  { label: courtsContent.allStatusesLabel, value: "all" },
  ...Object.entries(courtsContent.statusLabels).map(([value, label]) => ({ label, value })),
];

export default function CourtsManagement() {
  const { courts, createCourt, updateCourt, venues } = useAdminData();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | CourtStatus>("all");
  const [editingCourt, setEditingCourt] = useState<Court | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const normalizedQuery = query.trim().toLocaleLowerCase("vi");
  const filteredCourts = courts.filter((court) =>
    (status === "all" || court.status === status)
    && (!normalizedQuery || court.name.toLocaleLowerCase("vi").includes(normalizedQuery)));
  const averageRate = courts.length > 0 ? courts.reduce((total, court) => total + court.hourlyRate, 0) / courts.length : 0;

  function handleSave(payload: CourtPayload) {
    if (editingCourt) updateCourt(editingCourt.id, payload);
    else createCourt(payload);
    setIsPanelOpen(false);
    setEditingCourt(null);
  }

  function handleEdit(court: Court) {
    setEditingCourt(court);
    setIsPanelOpen(true);
  }

  const columns: TableProps<Court>["columns"] = [
    { dataIndex: "name", key: "name", render: (name: string) => <Typography.Text strong>{name}</Typography.Text>, title: "Tên sân" },
    { dataIndex: "surface", key: "surface", render: (surface: Court["surface"]) => courtsContent.surfaceLabels[surface], title: "Bề mặt" },
    { dataIndex: "isIndoor", key: "isIndoor", render: (isIndoor: boolean) => isIndoor ? courtsContent.indoorLabel : courtsContent.outdoorLabel, title: "Không gian" },
    {
      dataIndex: "hourlyRate",
      key: "hourlyRate",
      render: (rate: number) => <Typography.Text strong>{formatCurrency(rate)}</Typography.Text>,
      sorter: (first, second) => first.hourlyRate - second.hourlyRate,
      title: "Giá mỗi giờ",
    },
    { dataIndex: "status", key: "status", render: (value: CourtStatus) => <StatusBadge label={courtsContent.statusLabels[value]} tone={statusTone[value]} />, title: "Trạng thái" },
    {
      align: "right",
      key: "actions",
      render: (_, court) => <Button aria-label={`${courtsContent.editLabel} ${court.name}`} icon={<EditOutlined />} onClick={() => handleEdit(court)} />,
      title: "Thao tác",
    },
  ];

  return (
    <div className="space-y-5">
      <AdminPageHeader
        actions={<Button icon={<PlusOutlined />} onClick={() => { setEditingCourt(null); setIsPanelOpen(true); }} size="large" type="primary">{courtsContent.createLabel}</Button>}
        description={courtsContent.description}
        eyebrow="Cơ sở vật chất"
        title={courtsContent.title}
      />

      <Row gutter={[16, 16]}>
        <Col span={24} md={8}><MetricCard icon={<EnvironmentOutlined />} label="Tổng số sân" value={`${courts.length}`} /></Col>
        <Col span={24} md={8}><MetricCard icon={<ToolOutlined />} label="Đang bảo trì" tone="orange" value={`${courts.filter((court) => court.status === "maintenance").length}`} /></Col>
        <Col span={24} md={8}><MetricCard icon={<DollarOutlined />} label="Giá thuê trung bình" tone="violet" value={formatCurrency(averageRate)} /></Col>
      </Row>

      <AdminTableCard
        description={`${filteredCourts.length} sân phù hợp`}
        title="Danh sách sân"
        toolbar={
          <>
            <Input.Search allowClear className="!w-[220px]" onChange={(event) => setQuery(event.target.value)} placeholder={courtsContent.searchPlaceholder} value={query} />
            <Select aria-label="Lọc trạng thái sân" className="!w-[180px]" onChange={setStatus} options={statusFilterOptions} value={status} />
          </>
        }
      >
        <Table<Court>
          columns={columns}
          dataSource={filteredCourts}
          locale={{ emptyText: courtsContent.emptyLabel }}
          pagination={{ hideOnSinglePage: true, pageSize: 10 }}
          rowKey="id"
          scroll={{ x: 860 }}
        />
      </AdminTableCard>

      <CourtFormPanel
        court={editingCourt ?? undefined}
        key={editingCourt?.id ?? "create"}
        onClose={() => { setIsPanelOpen(false); setEditingCourt(null); }}
        onSave={handleSave}
        open={isPanelOpen}
        venues={venues}
      />
    </div>
  );
}
