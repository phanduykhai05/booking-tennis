import { CircleAlert, CircleCheck, Inbox } from "lucide-react-native";
import { ActivityIndicator, Text, View } from "react-native";

type MessageProps = { text: string };

export function ErrorMessage({ text }: MessageProps) {
  if (!text) return null;

  return (
    <View accessibilityRole="alert" className="flex-row items-center gap-1.5 rounded-md bg-[#fdecec] px-3 py-2">
      <CircleAlert color="#b3261e" size={16} />
      <Text className="flex-1 text-[13px] font-medium text-[#b3261e]">{text}</Text>
    </View>
  );
}

export function SuccessMessage({ text }: MessageProps) {
  if (!text) return null;

  return (
    <View className="flex-row items-center gap-1.5 rounded-md bg-[#e6f8ee] px-3 py-2">
      <CircleCheck color="#0b5133" size={16} />
      <Text className="flex-1 text-[13px] font-medium text-[#0b5133]">{text}</Text>
    </View>
  );
}

export function NoticeMessage({ text }: MessageProps) {
  if (!text) return null;

  return (
    <View className="rounded-md bg-[#fff6e2] px-3 py-2">
      <Text className="text-[13px] text-[#8a5b00]">{text}</Text>
    </View>
  );
}

type EmptyStateProps = { description: string };

export function EmptyState({ description }: EmptyStateProps) {
  return (
    <View className="items-center gap-2 px-6 py-12">
      <Inbox color="#cbd5e1" size={34} />
      <Text className="text-center text-[14px] text-slate-500">{description}</Text>
    </View>
  );
}

type LoadingStateProps = { label: string };

export function LoadingState({ label }: LoadingStateProps) {
  return (
    <View className="items-center gap-3 px-6 py-16">
      <ActivityIndicator color="#0f9b58" size="large" />
      <Text className="text-center text-[14px] text-slate-500">{label}</Text>
    </View>
  );
}
