type SwitchFieldProps = {
  label: string;
  onChange: (value: boolean) => void;
  value: boolean;
};

export default function SwitchField({ label, onChange, value }: SwitchFieldProps) {
  return (
    <label className="flex flex-row items-center justify-between gap-3">
      <span className="flex-1 text-[15px] text-slate-700">{label}</span>
      <input checked={value} className="peer sr-only" onChange={(event) => onChange(event.target.checked)} role="switch" type="checkbox" />
      <span
        aria-hidden="true"
        className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#0f9b58]/40 ${value ? "bg-[#0f9b58]" : "bg-[#cbd5e1]"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-[left] ${value ? "left-[22px]" : "left-0.5"}`} />
      </span>
    </label>
  );
}
