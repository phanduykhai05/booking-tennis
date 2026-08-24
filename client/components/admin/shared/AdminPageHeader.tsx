import { Text, View } from "react-native";
import type { ReactNode } from "react";

type AdminPageHeaderProps = {
  actions?: ReactNode;
  description: string;
  eyebrow?: string;
  title: string;
};

export default function AdminPageHeader({ actions, description, eyebrow, title }: AdminPageHeaderProps) {
  return (
    <View className="flex-row flex-wrap items-end justify-between gap-3">
      <View className="min-w-[240px] flex-1">
        {eyebrow ? (
          <Text className="text-[12px] font-bold uppercase tracking-[2px] text-emerald-600">{eyebrow}</Text>
        ) : null}
        <Text className="mb-1 mt-1 text-[24px] font-bold text-slate-900">{title}</Text>
        <Text className="max-w-2xl text-[14px] text-slate-500">{description}</Text>
      </View>
      {actions ? <View className="flex-row flex-wrap items-center gap-2">{actions}</View> : null}
    </View>
  );
}
