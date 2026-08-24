import { Linking, Text } from "react-native";

type ScheduleNoticeProps = {
  hotline: string;
  prefix: string;
  suffix: string;
  text: string;
};

export default function ScheduleNotice({ hotline, prefix, suffix, text }: ScheduleNoticeProps) {
  return (
    <Text className="bg-[#f0fbf4] px-3 py-2 text-[13px] leading-5 text-[#f26522]">
      <Text className="font-bold">{prefix}</Text> {text}{" "}
      <Text className="font-bold underline" onPress={() => void Linking.openURL(`tel:${hotline.replace(/\D/g, "")}`)}>
        {hotline}
      </Text>{" "}
      {suffix}
    </Text>
  );
}
