import { Search, X } from "lucide-react-native";
import { useMemo, useState } from "react";
import { FlatList, Modal, Text, TextInput, View } from "react-native";

import { countries } from "@/components/auth/CountryPicker/countries";
import type { Country } from "@/components/auth/CountryPicker/types";
import CountryFlag from "@/components/ui/CountryFlag";
import Touch from "@/components/ui/Pressable";
import { matchesQuery } from "@/lib/format";

type CountryPickerProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (country: Country) => void;
  selectedCode: string;
};

export default function CountryPicker({ isOpen, onClose, onSelect, selectedCode }: CountryPickerProps) {
  const [query, setQuery] = useState("");

  const filteredCountries = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return countries;

    return countries.filter((country) => matchesQuery(country.name, trimmed) || country.dialCode.includes(trimmed));
  }, [query]);

  return (
    <Modal animationType="slide" onRequestClose={onClose} transparent visible={isOpen}>
      <View className="flex-1 justify-end bg-black/45">
        <Touch accessibilityLabel="Đóng" className="flex-1" onPress={onClose} />

        <View className="max-h-[75%] overflow-hidden rounded-t-2xl bg-[#0c703f] pb-3">
          <View className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-white/40" />

          <View className="flex-row items-center gap-2 px-4 pt-3">
            <View className="h-11 flex-1 flex-row items-center gap-2 rounded-full bg-white/15 px-4">
              <Search color="rgba(255,255,255,0.7)" size={17} strokeWidth={2.5} />
              <TextInput
                autoFocus
                className="min-w-0 flex-1 text-[14px] text-white"
                onChangeText={setQuery}
                placeholder="Tìm kiếm quốc gia"
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={query}
              />
            </View>
            <Touch accessibilityLabel="Đóng" className="h-11 w-11 items-center justify-center rounded-full" onPress={onClose}>
              <X color="rgba(255,255,255,0.8)" size={20} strokeWidth={2.5} />
            </Touch>
          </View>

          <FlatList
            className="mt-2 px-2"
            data={filteredCountries}
            keyExtractor={(country) => country.code}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <Text className="px-2.5 py-6 text-center text-[14px] text-white/70">Không tìm thấy quốc gia phù hợp</Text>
            }
            renderItem={({ item }) => (
              <Touch
                className={`flex-row items-center gap-3 rounded-lg px-2.5 py-2.5 ${item.code === selectedCode ? "bg-white/15" : ""}`}
                onPress={() => onSelect(item)}
              >
                <CountryFlag code={item.code} size={22} />
                <View className="min-w-0 flex-1">
                  <Text className="text-[16px] font-semibold text-white" numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text className="text-[14px] text-white/65">{item.dialCode}</Text>
                </View>
              </Touch>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}
