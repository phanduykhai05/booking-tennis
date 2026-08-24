import { Text, TextInput, View } from "react-native";
import { useState } from "react";

import { formatNumber } from "@/lib/format";

type NumberFieldProps = {
  label: string;
  onChange: (value: number) => void;
  value: number;
};

/** Nhập số tiền: hiển thị có dấu chấm ngăn nghìn, trả ra số nguyên cho tầng dữ liệu. */
export default function NumberField({ label, onChange, value }: NumberFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <Text className="mb-1.5 text-[14px] font-medium text-slate-700">{label}</Text>
      <View className={`h-11 justify-center rounded-md border bg-white px-3 ${isFocused ? "border-[#0f9b58]" : "border-slate-200"}`}>
        <TextInput
          className="text-[15px] text-slate-800"
          keyboardType="number-pad"
          onBlur={() => setIsFocused(false)}
          onChangeText={(text) => onChange(Number(text.replace(/\D/g, "")) || 0)}
          onFocus={() => setIsFocused(true)}
          value={formatNumber(value)}
        />
      </View>
    </View>
  );
}
