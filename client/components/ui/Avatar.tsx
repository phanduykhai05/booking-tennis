import { Text, View } from "react-native";

type AvatarProps = {
  background?: string;
  color?: string;
  label: string;
  size?: number;
};

/** Chữ cái đại diện; dùng khi chưa có ảnh đại diện thật từ API. */
export default function Avatar({ background = "#e8f6ee", color = "#0b7a4a", label, size = 40 }: AvatarProps) {
  return (
    <View
      className="items-center justify-center rounded-full"
      style={{ backgroundColor: background, height: size, width: size }}
    >
      <Text className="font-semibold uppercase" style={{ color, fontSize: size * 0.42 }}>
        {label}
      </Text>
    </View>
  );
}

/** Hai chữ cái cuối của tên, giống cách antd Avatar hiển thị ở bản web. */
export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((part) => part[0] ?? "")
    .join("");
}
