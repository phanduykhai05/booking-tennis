import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import type { ReactNode } from "react";
import type { KeyboardTypeOptions, TextInputProps } from "react-native";

type TextFieldProps = {
  autoCapitalize?: TextInputProps["autoCapitalize"];
  autoFocus?: boolean;
  keyboardType?: KeyboardTypeOptions;
  label?: string;
  multiline?: boolean;
  onChangeText: (value: string) => void;
  placeholder?: string;
  prefix?: ReactNode;
  secureTextEntry?: boolean;
  suffix?: ReactNode;
  textContentType?: TextInputProps["textContentType"];
  value: string;
};

/** Ô nhập chuẩn: viền đổi màu khi focus, khe trước/sau để gắn icon hoặc nút xoá. */
export default function TextField({
  autoCapitalize = "none",
  autoFocus,
  keyboardType,
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

  return (
    <View>
      {label ? <Text className="mb-2.5 text-[16px] font-bold text-[#034f30]">{label}</Text> : null}
      <View
        className={`flex-row items-center rounded-md border bg-white px-3 ${multiline ? "min-h-[88px] py-2" : "h-12"} ${isFocused ? "border-[#087b49]" : "border-[#d6d6d6]"}`}
      >
        {prefix}
        <TextInput
          autoCapitalize={autoCapitalize}
          autoFocus={autoFocus}
          className="min-w-0 flex-1 text-[15px] text-[#25352f]"
          keyboardType={keyboardType}
          multiline={multiline}
          onBlur={() => setIsFocused(false)}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          placeholderTextColor="#777777"
          secureTextEntry={secureTextEntry}
          style={multiline ? { textAlignVertical: "top" } : undefined}
          textContentType={textContentType}
          value={value}
        />
        {suffix}
      </View>
    </View>
  );
}
