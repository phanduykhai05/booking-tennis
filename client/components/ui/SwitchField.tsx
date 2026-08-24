import { Switch, Text, View } from "react-native";

type SwitchFieldProps = {
  label: string;
  onChange: (value: boolean) => void;
  value: boolean;
};

export default function SwitchField({ label, onChange, value }: SwitchFieldProps) {
  return (
    <View className="flex-row items-center justify-between gap-3">
      <Text className="flex-1 text-[15px] text-slate-700">{label}</Text>
      <Switch
        onValueChange={onChange}
        thumbColor="#ffffff"
        trackColor={{ false: "#cbd5e1", true: "#0f9b58" }}
        value={value}
      />
    </View>
  );
}
