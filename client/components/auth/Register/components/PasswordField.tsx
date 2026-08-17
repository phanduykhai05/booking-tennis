"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type PasswordFieldProps = {
  autoComplete: "current-password" | "new-password";
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  value: string;
};

export default function PasswordField({ autoComplete, label, onChange, placeholder, required, value }: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <label className="block">
      <span className="mb-2.5 block text-[16px] font-bold text-[#034f30]">{label}</span>
      <span className="relative block">
        <input
          autoComplete={autoComplete}
          className="h-12 w-full rounded-md border border-[#d6d6d6] bg-white px-3 pr-11 text-sm text-[#25352f] outline-none transition placeholder:text-[#777] focus:border-[#087b49] focus:ring-2 focus:ring-[#087b49]/15"
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
          type={isVisible ? "text" : "password"}
          value={value}
        />
        <button
          aria-label={isVisible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#007b49] transition hover:text-[#005f38]"
          onClick={() => setIsVisible((visible) => !visible)}
          type="button"
        >
          {isVisible ? <EyeOff aria-hidden="true" size={19} strokeWidth={2.5} /> : <Eye aria-hidden="true" size={19} strokeWidth={2.5} />}
        </button>
      </span>
    </label>
  );
}
