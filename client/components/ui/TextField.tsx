import { useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";

type TextFieldProps = {
  autoCapitalize?: "characters" | "none" | "sentences" | "words";
  autoFocus?: boolean;
  /** Tên giữ như bản React Native để màn hình gọi không phải đổi; ánh xạ sang inputMode/type của web. */
  keyboardType?: "default" | "email-address" | "number-pad" | "numeric" | "phone-pad";
  label?: string;
  multiline?: boolean;
  onChangeText: (value: string) => void;
  placeholder?: string;
  prefix?: ReactNode;
  secureTextEntry?: boolean;
  suffix?: ReactNode;
  textContentType?: string;
  value: string;
};

const inputModes: Record<NonNullable<TextFieldProps["keyboardType"]>, HTMLAttributes<HTMLInputElement>["inputMode"]> = {
  default: "text",
  "email-address": "email",
  "number-pad": "numeric",
  numeric: "decimal",
  "phone-pad": "tel",
};

const autoCompletes: Record<string, string> = {
  emailAddress: "email",
  name: "name",
  newPassword: "new-password",
  password: "current-password",
  telephoneNumber: "tel",
};

/** Ô nhập chuẩn: viền đổi màu khi focus, khe trước/sau để gắn icon hoặc nút xoá. */
export default function TextField({
  autoCapitalize = "none",
  autoFocus,
  keyboardType = "default",
  label,
  multiline,
  onChangeText,
  placeholder,
  prefix,
  secureTextEntry,
  suffix,
  textContentType,
  value,
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const shared = {
    autoCapitalize,
    autoComplete: textContentType ? autoCompletes[textContentType] : undefined,
    autoFocus,
    className: "min-w-0 flex-1 bg-transparent text-[15px] text-[#25352f] outline-none placeholder:text-[#777777]",
    onBlur: () => setIsFocused(false),
    onFocus: () => setIsFocused(true),
    placeholder,
    value,
  };

  return (
    <label>
      {label ? <span className="mb-2.5 text-[16px] font-bold text-[#034f30]">{label}</span> : null}
      <div
        className={`flex-row items-center rounded-md border bg-white px-3 ${multiline ? "min-h-[88px] py-2" : "h-12"} ${isFocused ? "border-[#087b49]" : "border-[#d6d6d6]"}`}
      >
        {prefix}
        {multiline ? (
          <textarea {...shared} className={`${shared.className} min-h-[72px] resize-none`} onChange={(event) => onChangeText(event.target.value)} />
        ) : (
          <input
            {...shared}
            inputMode={inputModes[keyboardType]}
            onChange={(event) => onChangeText(event.target.value)}
            type={secureTextEntry ? "password" : keyboardType === "email-address" ? "email" : "text"}
          />
        )}
        {suffix}
      </div>
    </label>
  );
}
