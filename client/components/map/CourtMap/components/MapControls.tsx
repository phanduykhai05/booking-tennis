import { Crosshair, Layers3 } from "lucide-react";

type MapControlsProps = {
  currentLocationLabel: string;
  isVenueLayerVisible: boolean;
  layersLabel: string;
  onLocate: () => void;
  onToggleVenueLayer: () => void;
};

export default function MapControls({ currentLocationLabel, isVenueLayerVisible, layersLabel, onLocate, onToggleVenueLayer }: MapControlsProps) {
  return (
    <div className="absolute bottom-24 right-4 z-[1001] flex flex-col gap-3">
      <button aria-label={layersLabel} aria-pressed={isVenueLayerVisible} className={`flex size-12 items-center justify-center rounded-full shadow-[0_3px_12px_rgba(15,23,42,0.2)] transition-transform hover:scale-105 active:scale-95 ${isVenueLayerVisible ? "bg-white text-slate-700" : "bg-slate-700 text-white"}`} onClick={onToggleVenueLayer} type="button">
        <Layers3 aria-hidden="true" className="size-6" strokeWidth={2} />
      </button>
      <button aria-label={currentLocationLabel} className="flex size-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-[0_3px_12px_rgba(15,110,70,0.35)] transition-transform hover:scale-105 active:scale-95" onClick={onLocate} type="button">
        <Crosshair aria-hidden="true" className="size-6" strokeWidth={2.2} />
      </button>
    </div>
  );
}
