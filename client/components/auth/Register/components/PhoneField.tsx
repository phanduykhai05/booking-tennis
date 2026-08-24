import { ChevronDown } from "lucide-react-native";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

import CountryPicker from "@/components/auth/CountryPicker";
import { defaultCountry } from "@/components/auth/CountryPicker/countries";
import type { Country } from "@/components/auth/CountryPicker/types";
import CountryFlag from "@/components/ui/CountryFlag";
import Touch from "@/components/ui/Pressable";

type PhoneFieldProps = {
  label: string;
  onChange: (value: string) => void;
  value: string;
};

export default function PhoneField({ label, onChange, value }: PhoneFieldProps) {
  const [country, setCountry] = useState<Country>(defaultCountry);
  const [isPickerOpen, setPickerOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <Text className="mb-2.5 text-[16px] font-bold text-[#034f30]">{label}</Text>
      <View
        className={`h-12 flex-row overflow-hidden rounded-md border bg-white ${isFocused ? "border-[#087b49]" : "border-[#d6d6d6]"}`}
      >
        <Touch
          accessibilityLabel={`Chọn quốc gia, hiện tại ${country.name}`}
          className="shrink-0 flex-row items-center gap-2 border-r border-[#e1e1e1] px-3"
          onPress={() => setPickerOpen(true)}
        >
          <CountryFlag code={country.code} size={18} />
          <Text className="text-[13px] text-[#064c31]">{country.dialCode}</Text>
          <ChevronDown color="#064c31" size={13} strokeWidth={2.5} />
        </Touch>
        <TextInput
          className="min-w-0 flex-1 px-3 text-[15px] text-[#25352f]"
          keyboardType="phone-pad"
          onBlur={() => setIsFocused(false)}
          onChangeText={onChange}
          onFocus={() => setIsFocused(true)}
          placeholder="Nhập số điện thoại"
          placeholderTextColor="#777777"
          textContentType="telephoneNumber"
          value={value}
        />
      </View>

      <CountryPicker
        isOpen={isPickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(selected) => {
          setCountry(selected);
          setPickerOpen(false);
        }}
        selectedCode={country.code}
      />
    </View>
  );
}
