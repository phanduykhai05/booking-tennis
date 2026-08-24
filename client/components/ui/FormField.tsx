import { Text, View } from "react-native";
import type { ReactNode } from "react";

type FormFieldProps = {
  children: ReactNode;
  error?: string;
  label: string;
};

/** Bọc nhãn + control + thông báo lỗi, thay cho Form.Item của antd. */
export default function FormField({ children, error, label }: FormFieldProps) {
  return (
    <View>
      <Text className="mb-1.5 text-[14px] font-medium text-slate-700">{label}</Text>
      {children}
      {error ? <Text className="mt-1 text-[12px] text-rose-600">{error}</Text> : null}
    </View>
  );
}
