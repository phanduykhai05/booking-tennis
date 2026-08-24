import { X } from "lucide-react-native";
import { Modal, ScrollView, Text, View } from "react-native";
import type { ReactNode } from "react";

import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";

type SheetProps = {
  children: ReactNode;
  closeLabel: string;
  footer?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

/** Bottom sheet: nền mờ chạm để đóng, thân sheet cao tối đa 85% màn hình rồi tự cuộn. */
export default function Sheet({ children, closeLabel, footer, isOpen, onClose, title }: SheetProps) {
  return (
    <Modal animationType="slide" onRequestClose={onClose} transparent visible={isOpen}>
      <View className="flex-1 justify-end bg-[#081e16]/55">
        <Touch accessibilityLabel={closeLabel} className="flex-1" onPress={onClose} />
        <View className="max-h-[85%] overflow-hidden rounded-t-[18px] bg-white" style={shadow.sheet}>
          <View className="flex-row items-center border-b border-[#e7e9e8] px-4 py-3">
            <Text className="flex-1 text-[17px] font-bold text-[#172720]">{title}</Text>
            <Touch accessibilityLabel={closeLabel} className="-mr-1 p-1" onPress={onClose}>
              <X color="#68716d" size={20} />
            </Touch>
          </View>

          <ScrollView className="px-4 py-3" contentContainerClassName="pb-2">
            {children}
          </ScrollView>

          {footer ? <View className="border-t border-[#e7e9e8] px-4 py-3">{footer}</View> : null}
        </View>
      </View>
    </Modal>
  );
}
