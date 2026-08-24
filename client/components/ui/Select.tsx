import { Check, ChevronDown } from "lucide-react-native";
import { useState } from "react";
import { FlatList, Modal, Text, View } from "react-native";

import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";

export type SelectOption<T extends string> = { label: string; value: T };

type SelectProps<T extends string> = {
  accessibilityLabel: string;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  size?: "large" | "medium" | "small";
  value: T;
  width?: number;
};

/** Dropdown thay cho antd Select: nút hiện nhãn đang chọn, chạm mở danh sách trong Modal. */
export default function Select<T extends string>({
  accessibilityLabel,
  onChange,
  options,
  size = "medium",
  value,
  width,
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const active = options.find((option) => option.value === value);

  return (
    <>
      <Touch
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        className={`flex-row items-center justify-between gap-2 rounded-md border border-[#d6d6d6] bg-white px-3 ${size === "large" ? "h-12" : size === "small" ? "h-9" : "h-11"}`}
        onPress={() => setIsOpen(true)}
        style={width ? { width } : undefined}
      >
        <Text className="flex-1 text-[14px] text-[#25352f]" numberOfLines={1}>
          {active?.label ?? ""}
        </Text>
        <ChevronDown color="#64748b" size={16} />
      </Touch>

      <Modal animationType="fade" onRequestClose={() => setIsOpen(false)} transparent visible={isOpen}>
        <Touch accessibilityLabel="Đóng danh sách" className="flex-1 justify-center bg-black/40 px-6" onPress={() => setIsOpen(false)}>
          <View className="max-h-[60%] overflow-hidden rounded-xl bg-white" style={shadow.raised}>
            <Text className="border-b border-[#eef0ef] px-4 py-3 text-[15px] font-bold text-[#0b5133]">{accessibilityLabel}</Text>
            <FlatList
              data={options}
              keyExtractor={(option) => option.value}
              renderItem={({ item }) => (
                <Touch
                  className={`flex-row items-center gap-2 px-4 py-3 ${item.value === value ? "bg-[#f1fbf5]" : ""}`}
                  onPress={() => {
                    onChange(item.value);
                    setIsOpen(false);
                  }}
                >
                  <Text className="flex-1 text-[15px] text-[#25352f]">{item.label}</Text>
                  {item.value === value ? <Check color="#008447" size={17} /> : null}
                </Touch>
              )}
            />
          </View>
        </Touch>
      </Modal>
    </>
  );
}
