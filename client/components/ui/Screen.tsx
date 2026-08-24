import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { ReactNode } from "react";
import type { Edge } from "react-native-safe-area-context";

type ScreenProps = {
  backgroundColor: string;
  children: ReactNode;
  /** Cạnh nào cần chừa vùng an toàn; mặc định chỉ chừa phía trên vì đáy đã có thanh điều hướng riêng. */
  edges?: Edge[];
  statusBarStyle?: "dark" | "light";
};

/**
 * Khung màn hình: nền phủ kín tai thỏ và thanh trạng thái, thay cho `min-h-[100dvh]`
 * cùng `env(safe-area-inset-*)` của bản web.
 */
export default function Screen({ backgroundColor, children, edges = ["top"], statusBarStyle = "dark" }: ScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1"
      style={{
        backgroundColor,
        paddingBottom: edges.includes("bottom") ? insets.bottom : 0,
        paddingLeft: edges.includes("left") ? insets.left : 0,
        paddingRight: edges.includes("right") ? insets.right : 0,
        paddingTop: edges.includes("top") ? insets.top : 0,
      }}
    >
      <StatusBar style={statusBarStyle} />
      {children}
    </View>
  );
}
