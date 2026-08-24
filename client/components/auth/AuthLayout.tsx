import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import type { ReactNode } from "react";

import Screen from "@/components/ui/Screen";
import Touch from "@/components/ui/Pressable";

type AuthLayoutProps = {
  backHref: string;
  backLabel: string;
  children: ReactNode;
  /** Chiều cao vùng tiêu đề, giữ đúng khoảng trống của từng trang như bản web. */
  headerHeight?: number;
  maxWidth?: number;
  title: string;
};

/**
 * Nền chung của ba trang đăng nhập / đăng ký / quên mật khẩu: dải xanh chuyển sắc,
 * vạch kẻ chéo mờ và hai vòng tròn viền dày ở đáy. RN không có radial-gradient nên
 * dùng gradient dọc cùng dải màu, khác biệt gần như không nhận ra ở kích thước này.
 */
export default function AuthLayout({
  backHref,
  backLabel,
  children,
  headerHeight = 115,
  maxWidth = 402,
  title,
}: AuthLayoutProps) {
  const router = useRouter();

  return (
    <Screen backgroundColor="#087640" edges={["top", "bottom"]} statusBarStyle="light">
      <LinearGradient
        colors={["#42af67", "#218d4c", "#087640", "#08713e"]}
        locations={[0, 0.38, 0.76, 1]}
        style={{ bottom: 0, left: 0, position: "absolute", right: 0, top: 0 }}
      />
      <View className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full border-[50px] border-[#139253]/65" pointerEvents="none" />
      <View className="absolute -bottom-36 -right-20 h-72 w-72 rounded-full border-[45px] border-[#188a4e]/60" pointerEvents="none" />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1">
        <ScrollView contentContainerClassName="px-3 pb-6" keyboardShouldPersistTaps="handled">
          <View className="w-full self-center" style={{ maxWidth }}>
            <View className="items-center justify-start pt-4" style={{ height: headerHeight }}>
              <Touch accessibilityLabel={backLabel} className="absolute left-0 top-3 rounded p-1" onPress={() => router.navigate(backHref)}>
                <ArrowLeft color="#ffffff" size={22} strokeWidth={2.5} />
              </Touch>
              <Text className="text-[17px] font-bold text-white">{title}</Text>
            </View>

            {children}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
