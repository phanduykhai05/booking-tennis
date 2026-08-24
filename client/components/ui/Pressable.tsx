import { Pressable as RNPressable } from "react-native";
import type { PressableProps, StyleProp, ViewStyle } from "react-native";
import type { ReactNode } from "react";

type TouchProps = Omit<PressableProps, "children" | "style"> & {
  children?: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

/**
 * Pressable với phản hồi chạm thống nhất: mờ nhẹ khi nhấn, mờ hơn khi disabled.
 * Dùng biến thể `active:` của NativeWind thay vì `style` dạng hàm, vì NativeWind
 * đã chiếm prop `style` để đổ class vào.
 */
export default function Touch({ children, className = "", disabled, ...props }: TouchProps) {
  return (
    <RNPressable
      accessibilityState={{ disabled: Boolean(disabled) }}
      className={`${disabled ? "opacity-55" : "active:opacity-70"} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </RNPressable>
  );
}
