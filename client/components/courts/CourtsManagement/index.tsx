import { DollarSign, MapPin, Pencil, Plus, Wrench } from "lucide-react-native";
import { useState } from "react";
import { Text, View } from "react-native";

import { useAdminData } from "@/components/admin/AdminData";
import type { Court, CourtPayload, CourtStatus } from "@/components/admin/AdminData/types";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";
import AdminTableCard from "@/components/admin/shared/AdminTableCard";
import MetricCard, { metricIconColor } from "@/components/admin/shared/MetricCard";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import type { StatusTone } from "@/components/admin/shared/StatusBadge";
import CourtFormPanel from "@/components/courts/CourtsManagement/components/CourtFormPanel";
import { courtsContent } from "@/components/courts/CourtsManagement/content";
import Button from "@/components/ui/Button";
import DataTable from "@/components/ui/DataTable";
import type { Column } from "@/components/ui/DataTable";
import MetricGrid from "@/components/ui/MetricGrid";
import Touch from "@/components/ui/Pressable";
import SearchField from "@/components/ui/SearchField";
import Select from "@/components/ui/Select";
import { formatCurrency, matchesQuery } from "@/lib/format";

const statusTone: Record<CourtStatus, StatusTone> = { available: "emerald", inactive: "slate", maintenance: "orange" };

const statusFilterOptions = [
  { label: courtsContent.allStatusesLabel, value: "all" as const },
  ...(Object.entries(courtsContent.statusLabels) as [CourtStatus, string][]).map(([value, label]) => ({ label, value })),
];

export default function CourtsManagement() {
  const { courts, createCourt, updateCourt, venues } = useAdminData();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | CourtStatus>("all");
  const [editingCourt, setEditingCourt] = useState<Court | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const filteredCourts = courts.filter(
    (court) => (status === "all" || court.status === status) && (!query.trim() || matchesQuery(court.name, query)),
  );
  const averageRate = courts.length > 0 ? courts.reduce((total, court) => total + court.hourlyRate, 0) / courts.length : 0;

  const handleSave = (payload: CourtPayload) => {
    if (editingCourt) void updateCourt(editingCourt.id, payload);
    else void createCourt(payload);

    setIsPanelOpen(false);
    setEditingCourt(null);
  };

  const columns: Column<Court>[] = [
    {
      key: "name",
      render: (court) => <Text className="text-[14px] font-bold text-slate-900">{court.name}</Text>,
      title: "Tên sân",
      width: 160,
    },
    {
      key: "surface",
      render: (court) => <Text className="text-[14px] text-slate-700">{courtsContent.surfaceLabels[court.surface]}</Text>,
      title: "Bề mặt",
      width: 140,
    },
    {
      key: "isIndoor",
      render: (court) => (
        <Text className="text-[14px] text-slate-700">{court.isIndoor ? courtsContent.indoorLabel : courtsContent.outdoorLabel}</Text>
      ),
      title: "Không gian",
      width: 130,
    },
    {
      key: "hourlyRate",
      render: (court) => <Text className="text-[14px] font-bold text-slate-900">{formatCurrency(court.hourlyRate)}</Text>,
      sorter: (first, second) => first.hourlyRate - second.hourlyRate,
      title: "Giá mỗi giờ",
      width: 150,
    },
    {
      key: "status",
      render: (court) => <StatusBadge label={courtsContent.statusLabels[court.status]} tone={statusTone[court.status]} />,
      title: "Trạng thái",
      width: 150,
    },
    {
      align: "right",
      key: "actions",
      render: (court) => (
        <Touch
          accessibilityLabel={`${courtsContent.editLabel} ${court.name}`}
          className="h-9 w-9 items-center justify-center rounded-md border border-slate-200"
          onPress={() => {
            setEditingCourt(court);
            setIsPanelOpen(true);
          }}
        >
          <Pencil color="#334155" size={16} />
        </Touch>
      ),
      title: "Thao tác",
      width: 110,
    },
  ];

  return (
    <View className="gap-5">
      <AdminPageHeader
        actions={
          <Button
            icon={<Plus color="#ffffff" size={17} />}
            label={courtsContent.createLabel}
            onPress={() => {
              setEditingCourt(null);
              setIsPanelOpen(true);
            }}
            size="large"
          />
        }
        description={courtsContent.description}
        eyebrow="Cơ sở vật chất"
        title={courtsContent.title}
      />

      <MetricGrid minItemWidth={240}>
        <MetricCard icon={<MapPin color={metricIconColor.emerald} size={20} />} label="Tổng số sân" value={`${courts.length}`} />
        <MetricCard
          icon={<Wrench color={metricIconColor.orange} size={20} />}
          label="Đang bảo trì"
          tone="orange"
          value={`${courts.filter((court) => court.status === "maintenance").length}`}
        />
        <MetricCard
          icon={<DollarSign color={metricIconColor.violet} size={20} />}
          label="Giá thuê trung bình"
          tone="violet"
          value={formatCurrency(averageRate)}
        />
      </MetricGrid>

      <AdminTableCard
        description={`${filteredCourts.length} sân phù hợp`}
        title="Danh sách sân"
        toolbar={
          <>
            <SearchField
              accessibilityLabel={courtsContent.searchPlaceholder}
              onChange={setQuery}
              placeholder={courtsContent.searchPlaceholder}
              value={query}
              width={220}
            />
            <Select
              accessibilityLabel="Lọc trạng thái sân"
              onChange={setStatus}
              options={statusFilterOptions}
              value={status}
              width={180}
            />
          </>
        }
      >
        <DataTable columns={columns} emptyText={courtsContent.emptyLabel} rowKey={(court) => court.id} rows={filteredCourts} />
      </AdminTableCard>

      <CourtFormPanel
        court={editingCourt ?? undefined}
        isOpen={isPanelOpen}
        key={editingCourt?.id ?? "create"}
        onClose={() => {
          setIsPanelOpen(false);
          setEditingCourt(null);
        }}
        onSave={handleSave}
        venues={venues}
      />
    </View>
  );
}
