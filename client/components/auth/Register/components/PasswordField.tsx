import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";

import Touch from "@/components/ui/Pressable";
import TextField from "@/components/ui/TextField";

type PasswordFieldProps = {
  isNewPassword?: boolean;
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
};

export default function PasswordField({ isNewPassword, label, onChange, placeholder, value }: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TextField
      label={label}
      onChangeText={onChange}
      placeholder={placeholder}
      secureTextEntry={!isVisible}
      suffix={
        <Touch
          accessibilityLabel={isVisible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          className="pl-2"
          onPress={() => setIsVisible((visible) => !visible)}
        >
          {isVisible ? <EyeOff color="#007b49" size={19} strokeWidth={2.5} /> : <Eye color="#007b49" size={19} strokeWidth={2.5} />}
        </Touch>
      }
      textContentType={isNewPassword ? "newPassword" : "password"}
      value={value}
    />
  );
}
