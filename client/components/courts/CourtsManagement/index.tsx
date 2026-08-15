"use client";

import { CircleDollarSign, MapPinned, Pencil, Plus, Search, Wrench } from "lucide-react";
import { useState } from "react";

import { useAdminData } from "@/components/admin/AdminData";
import type { Court, CourtPayload, CourtStatus } from "@/components/admin/AdminData/types";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";
import AdminTableCard from "@/components/admin/shared/AdminTableCard";
import MetricCard from "@/components/admin/shared/MetricCard";
import StatusBadge from "@/components/admin/shared/StatusBadge";
import { formatCurrency } from "@/components/booking/BookingSchedule/utils";
import CourtFormPanel from "@/components/courts/CourtsManagement/components/CourtFormPanel";
import { courtsContent } from "@/components/courts/CourtsManagement/content";

const statusTone = { available: "emerald", inactive: "slate", maintenance: "orange" } as const;

export default function CourtsManagement() {
  const { courts, createCourt, updateCourt, venues } = useAdminData();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | CourtStatus>("all");
  const [editingCourt, setEditingCourt] = useState<Court | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const normalizedQuery = query.trim().toLocaleLowerCase("vi");
  const filteredCourts = courts.filter((court) => (status === "all" || court.status === status) && (!normalizedQuery || court.name.toLocaleLowerCase("vi").includes(normalizedQuery)));
  const averageRate = courts.length > 0 ? courts.reduce((total, court) => total + court.hourlyRate, 0) / courts.length : 0;

  function handleSave(payload: CourtPayload) {
    if (editingCourt) updateCourt(editingCourt.id, payload);
    else createCourt(payload);
    setEditingCourt(null);
    setIsCreating(false);
  }

  const searchControl = (
    <label className="flex h-10 min-w-[220px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3"><Search aria-hidden="true" className="size-4 text-slate-400" /><span className="sr-only">{courtsContent.searchPlaceholder}</span><input className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none" onChange={(event) => setQuery(event.target.value)} placeholder={courtsContent.searchPlaceholder} type="search" value={query} /></label>
  );

  return (
    <div className="space-y-5">
      <AdminPageHeader actions={<button className="flex h-10 items-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-bold text-white hover:bg-emerald-700" onClick={() => setIsCreating(true)} type="button"><Plus aria-hidden="true" className="size-4" />{courtsContent.createLabel}</button>} description={courtsContent.description} eyebrow="Cơ sở vật chất" title={courtsContent.title} />
      <div className="grid gap-3 sm:grid-cols-3">
        <MetricCard icon={MapPinned} label="Tổng số sân" value={`${courts.length}`} />
        <MetricCard icon={Wrench} label="Đang bảo trì" tone="orange" value={`${courts.filter((court) => court.status === "maintenance").length}`} />
        <MetricCard icon={CircleDollarSign} label="Giá thuê trung bình" tone="violet" value={formatCurrency(averageRate)} />
      </div>
      <AdminTableCard description={`${filteredCourts.length} sân phù hợp`} title="Danh sách sân" toolbar={<>{searchControl}<select aria-label="Lọc trạng thái sân" className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600" onChange={(event) => setStatus(event.target.value as "all" | CourtStatus)} value={status}><option value="all">{courtsContent.allStatusesLabel}</option>{Object.entries(courtsContent.statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></>}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">Tên sân</th><th className="px-4 py-3">Bề mặt</th><th className="px-4 py-3">Không gian</th><th className="px-4 py-3">Giá mỗi giờ</th><th className="px-4 py-3">Trạng thái</th><th className="px-5 py-3 text-right">Thao tác</th></tr></thead>
            <tbody className="divide-y divide-slate-100">{filteredCourts.map((court) => <tr className="hover:bg-slate-50/70" key={court.id}><td className="px-5 py-4 font-bold text-slate-800">{court.name}</td><td className="px-4 py-4 font-medium text-slate-600">{courtsContent.surfaceLabels[court.surface]}</td><td className="px-4 py-4 text-slate-600">{court.isIndoor ? courtsContent.indoorLabel : courtsContent.outdoorLabel}</td><td className="px-4 py-4 font-bold text-slate-700">{formatCurrency(court.hourlyRate)}</td><td className="px-4 py-4"><StatusBadge label={courtsContent.statusLabels[court.status]} tone={statusTone[court.status]} /></td><td className="px-5 py-4 text-right"><button aria-label={`${courtsContent.editLabel} ${court.name}`} className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700" onClick={() => setEditingCourt(court)} type="button"><Pencil aria-hidden="true" className="size-4" /></button></td></tr>)}</tbody>
          </table>
        </div>
        {filteredCourts.length === 0 && <p className="py-12 text-center text-sm font-medium text-slate-400">{courtsContent.emptyLabel}</p>}
      </AdminTableCard>
      {(isCreating || editingCourt) && <CourtFormPanel court={editingCourt ?? undefined} key={editingCourt?.id ?? "create"} onClose={() => { setEditingCourt(null); setIsCreating(false); }} onSave={handleSave} venues={venues} />}
    </div>
  );
}
