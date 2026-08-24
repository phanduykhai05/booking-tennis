import { Text, View } from "react-native";
import type { ReactNode } from "react";

import { shadow } from "@/components/ui/theme";

type CardProps = {
  children: ReactNode;
  className?: string;
  description?: string;
  extra?: ReactNode;
  noBodyPadding?: boolean;
  title?: string;
};

/** Thẻ trắng bo góc dùng lại cho toàn bộ khu quản trị, thay cho antd Card. */
export default function Card({ children, className = "", description, extra, noBodyPadding, title }: CardProps) {
  return (
    <View className={`overflow-hidden rounded-xl border border-slate-200 bg-white ${className}`} style={shadow.card}>
      {title ? (
        <View className="flex-row flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
          <View className="min-w-0 flex-1">
            <Text className="text-[15px] font-bold text-slate-900">{title}</Text>
            {description ? <Text className="mt-0.5 text-[12px] text-slate-500">{description}</Text> : null}
          </View>
          {extra ? <View className="flex-row flex-wrap items-center gap-2">{extra}</View> : null}
        </View>
      ) : null}
      <View className={noBodyPadding ? "" : "p-4"}>{children}</View>
    </View>
  );
}
