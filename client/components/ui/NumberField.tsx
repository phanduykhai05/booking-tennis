import { formatNumber } from "@/lib/format";

type NumberFieldProps = {
  label: string;
  onChange: (value: number) => void;
  value: number;
};

/** Nhập số tiền: hiển thị có dấu chấm ngăn nghìn, trả ra số nguyên cho tầng dữ liệu. */
export default function NumberField({ label, onChange, value }: NumberFieldProps) {
  return (
    <label>
      <span className="mb-1.5 text-[14px] font-medium text-slate-700">{label}</span>
      <input
        className="h-11 rounded-md border border-slate-200 bg-white px-3 text-[15px] text-slate-800 outline-none focus:border-[#0f9b58]"
        inputMode="numeric"
        onChange={(event) => onChange(Number(event.target.value.replace(/\D/g, "")) || 0)}
        value={formatNumber(value)}
      />
    </label>
  );
}
