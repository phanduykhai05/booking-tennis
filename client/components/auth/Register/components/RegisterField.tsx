import { CircleX } from "lucide-react";

import type { RegisterField as RegisterFieldType } from "@/components/auth/Register/types";

type RegisterFieldProps = {
  field: RegisterFieldType;
  onChange: (value: string) => void;
  onClear: () => void;
  value: string;
};

export default function RegisterField({ field, onChange, onClear, value }: RegisterFieldProps) {
  return (
    <label className="block">
      <span className="mb-2.5 block text-[16px] font-bold text-[#034f30]">{field.label}</span>
      <span className="relative block">
        <input
          autoComplete={field.autoComplete}
          className="h-12 w-full rounded-md border border-[#d6d6d6] bg-white px-3 pr-11 text-sm text-[#25352f] outline-none transition placeholder:text-[#777] focus:border-[#087b49] focus:ring-2 focus:ring-[#087b49]/15"
          id={field.id}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          required={field.required}
          type={field.type}
          value={value}
        />
        {value && (
          <button
            aria-label={`Xóa ${field.label}`}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#007b49] transition hover:text-[#005f38]"
            onClick={onClear}
            type="button"
          >
            <CircleX aria-hidden="true" size={18} strokeWidth={2.8} />
          </button>
        )}
      </span>
    </label>
  );
}
