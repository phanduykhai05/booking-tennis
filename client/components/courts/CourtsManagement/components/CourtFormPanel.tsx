import { X } from "lucide-react";
import { useEffect, useState } from "react";

import type { Court, CourtPayload, CourtStatus, CourtSurface, Venue } from "@/components/admin/AdminData/types";
import { courtsContent } from "@/components/courts/CourtsManagement/content";

type CourtFormPanelProps = {
  court?: Court;
  onClose: () => void;
  onSave: (payload: CourtPayload) => void;
  venues: Venue[];
};

export default function CourtFormPanel({ court, onClose, onSave, venues }: CourtFormPanelProps) {
  const [name, setName] = useState(court?.name ?? "");
  const [surface, setSurface] = useState<CourtSurface>(court?.surface ?? "hard");
  const [status, setStatus] = useState<CourtStatus>(court?.status ?? "available");
  const [hourlyRate, setHourlyRate] = useState(`${court?.hourlyRate ?? 180000}`);
  const [isIndoor, setIsIndoor] = useState(court?.isIndoor ?? false);
  const [venueId, setVenueId] = useState(court?.venueId ?? venues[0]?.id ?? "");

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave({ hourlyRate: Number(hourlyRate), isIndoor, name: name.trim(), status, surface, venueId });
  }

  const inputClassName = "mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15";

  return (
    <div className="fixed inset-0 z-[1400] flex items-end justify-end sm:items-stretch">
      <button aria-label="Đóng" className="absolute inset-0 bg-slate-950/35 backdrop-blur-[2px]" onClick={onClose} type="button" />
      <aside aria-labelledby="court-form-title" aria-modal="true" className="relative z-10 flex max-h-[92dvh] w-full flex-col rounded-t-3xl bg-white shadow-2xl sm:max-h-none sm:w-[420px] sm:rounded-none" role="dialog">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
          <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-600">TennisHub Admin</p><h2 className="mt-1 text-xl font-bold text-slate-900" id="court-form-title">{court ? courtsContent.editLabel : courtsContent.createLabel}</h2></div>
          <button aria-label="Đóng" className="flex size-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200" onClick={onClose} type="button"><X aria-hidden="true" className="size-5" /></button>
        </div>
        <form className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5" id="court-form" onSubmit={handleSubmit}>
          <label className="block text-xs font-bold text-slate-600">Tên sân<input autoFocus className={inputClassName} onChange={(event) => setName(event.target.value)} required value={name} /></label>
          <label className="block text-xs font-bold text-slate-600">Cơ sở<select className={inputClassName} onChange={(event) => setVenueId(event.target.value)} value={venueId}>{venues.map((venue) => <option key={venue.id} value={venue.id}>{venue.name}</option>)}</select></label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-xs font-bold text-slate-600">Bề mặt<select className={inputClassName} onChange={(event) => setSurface(event.target.value as CourtSurface)} value={surface}>{Object.entries(courtsContent.surfaceLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
            <label className="block text-xs font-bold text-slate-600">Trạng thái<select className={inputClassName} onChange={(event) => setStatus(event.target.value as CourtStatus)} value={status}>{Object.entries(courtsContent.statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
          </div>
          <label className="block text-xs font-bold text-slate-600">Giá thuê mỗi giờ<input className={inputClassName} min="0" onChange={(event) => setHourlyRate(event.target.value)} required type="number" value={hourlyRate} /></label>
          <label className="flex items-center justify-between rounded-xl border border-slate-200 p-4 text-sm font-semibold text-slate-700"><span>Sân trong nhà</span><input checked={isIndoor} className="size-4 accent-emerald-600" onChange={(event) => setIsIndoor(event.target.checked)} type="checkbox" /></label>
        </form>
        <div className="border-t border-slate-100 p-5"><button className="h-11 w-full rounded-xl bg-emerald-600 text-sm font-bold text-white hover:bg-emerald-700" form="court-form" type="submit">{courtsContent.saveLabel}</button></div>
      </aside>
    </div>
  );
}
