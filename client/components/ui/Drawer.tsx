import { X } from "lucide-react-native";
import { Modal, ScrollView, Text, View, useWindowDimensions } from "react-native";
import type { ReactNode } from "react";

import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";

type DrawerProps = {
  children: ReactNode;
  footer?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  placement?: "left" | "right";
  title: string;
  width?: number;
};

/**
 * Panel trượt ngang thay cho antd Drawer, dùng cho chi tiết đặt sân và form sân bên admin.
 * Trên màn hẹp panel chiếm gần hết bề ngang để form vẫn đọc được.
 */
export default function Drawer({ children, footer, isOpen, onClose, placement = "right", title, width = 460 }: DrawerProps) {
  const { width: screenWidth } = useWindowDimensions();
  const panelWidth = Math.min(width, screenWidth - 40);

  return (
    <Modal animationType="slide" onRequestClose={onClose} transparent visible={isOpen}>
      <View className={`flex-1 bg-[#0f172a]/45 ${placement === "right" ? "flex-row-reverse" : "flex-row"}`}>
        <View className="bg-white" style={[{ width: panelWidth }, shadow.raised]}>
          <View className="flex-row items-center border-b border-slate-200 px-4 py-4">
            <Text className="flex-1 text-[17px] font-bold text-slate-900">{title}</Text>
            <Touch accessibilityLabel="Đóng" className="-mr-1 p-1" onPress={onClose}>
              <X color="#64748b" size={20} />
            </Touch>
          </View>

          <ScrollView className="flex-1 px-4 py-4" contentContainerClassName="pb-6 gap-4">
            {children}
          </ScrollView>

          {footer ? <View className="border-t border-slate-200 px-4 py-3">{footer}</View> : null}
        </View>
        <Touch accessibilityLabel="Đóng" className="flex-1" onPress={onClose} />
      </View>
    </Modal>
  );
}
