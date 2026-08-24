import { CircleX } from "lucide-react-native";

import type { RegisterField as RegisterFieldType } from "@/components/auth/Register/types";
import Touch from "@/components/ui/Pressable";
import TextField from "@/components/ui/TextField";

type RegisterFieldProps = {
  field: RegisterFieldType;
  onChange: (value: string) => void;
  onClear: () => void;
  value: string;
};

export default function RegisterField({ field, onChange, onClear, value }: RegisterFieldProps) {
  return (
    <TextField
      autoCapitalize={field.type === "email" ? "none" : "words"}
      keyboardType={field.type === "email" ? "email-address" : "default"}
      label={field.label}
      onChangeText={onChange}
      placeholder={field.placeholder}
      suffix={
        value ? (
          <Touch accessibilityLabel={`Xóa ${field.label}`} className="pl-2" onPress={onClear}>
            <CircleX color="#007b49" size={18} strokeWidth={2.8} />
          </Touch>
        ) : null
      }
      textContentType={field.type === "email" ? "emailAddress" : "name"}
      value={value}
    />
  );
}
