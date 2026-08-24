import { Text, View } from "react-native";

export type StatusTone = "blue" | "emerald" | "orange" | "rose" | "slate" | "violet";

type TagProps = {
  label: string;
  tone: StatusTone;
};

const toneClassName: Record<StatusTone, string> = {
  blue: "bg-sky-50 text-sky-700",
  emerald: "bg-emerald-50 text-emerald-700",
  orange: "bg-orange-50 text-orange-700",
  rose: "bg-rose-50 text-rose-700",
  slate: "bg-slate-100 text-slate-600",
  violet: "bg-violet-50 text-violet-700",
};

/** Nhãn trạng thái nhỏ; nền và chữ đi cùng một tông để đọc được ở cỡ 12px. */
export default function Tag({ label, tone }: TagProps) {
  const [background, text] = toneClassName[tone].split(" ");

  return (
    <View className={`self-start rounded px-2 py-1 ${background}`}>
      <Text className={`text-[12px] font-semibold ${text}`}>{label}</Text>
    </View>
  );
}
