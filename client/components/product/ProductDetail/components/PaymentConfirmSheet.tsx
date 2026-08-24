import { CalendarDays, Check, ChevronDown, Ticket } from "lucide-react-native";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

import CountryPicker from "@/components/auth/CountryPicker";
import { defaultCountry } from "@/components/auth/CountryPicker/countries";
import type { Country } from "@/components/auth/CountryPicker/types";
import type { BookingEvent, CheckoutLabels } from "@/components/product/ProductDetail/types";
import Button from "@/components/ui/Button";
import CountryFlag from "@/components/ui/CountryFlag";
import { ErrorMessage, NoticeMessage } from "@/components/ui/Feedback";
import Touch from "@/components/ui/Pressable";
import Sheet from "@/components/ui/Sheet";
import { formatCurrency } from "@/lib/format";

type PaymentConfirmSheetProps = {
  accountInitial: string;
  accountName: string;
  errorMessage: string;
  event: BookingEvent;
  isOpen: boolean;
  isSubmitting: boolean;
  labels: CheckoutLabels;
  onClose: () => void;
  onConfirm: (phone: string) => void;
  quantity: number;
  requiresSignIn: boolean;
};

export default function PaymentConfirmSheet({
  accountInitial,
  accountName,
  errorMessage,
  event,
  isOpen,
  isSubmitting,
  labels,
  onClose,
  onConfirm,
  quantity,
  requiresSignIn,
}: PaymentConfirmSheetProps) {
  const [phone, setPhone] = useState("");
  const [shouldSavePhone, setShouldSavePhone] = useState(true);
  const [country, setCountry] = useState<Country>(defaultCountry);
  const [isCountryPickerOpen, setCountryPickerOpen] = useState(false);
  const hasValidPhone = phone.replace(/\D/g, "").length >= 9;

  return (
    <Sheet
      closeLabel={labels.cancel}
      footer={
        <View className="flex-row gap-3">
          <View className="flex-1">
            <Button fullWidth label={labels.cancel} onPress={onClose} tone="outline" />
          </View>
          <View className="flex-[2.1]">
            <Button
              disabled={!hasValidPhone}
              fullWidth
              isLoading={isSubmitting}
              label={labels.confirm}
              onPress={() => onConfirm(phone)}
            />
          </View>
        </View>
      }
      isOpen={isOpen}
      onClose={onClose}
      title={labels.title}
    >
      <View className="gap-3">
        <View>
          <Text className="mb-1.5 text-[16px] font-semibold text-[#007b45]">{labels.userInfo}</Text>
          <View className="h-14 flex-row items-center gap-2 rounded-lg border border-[#9bd9b8] bg-[#edfcf2] px-2.5">
            <View className="h-9 w-9 items-center justify-center rounded-full bg-[#6570d7]">
              <Text className="text-[18px] font-medium uppercase text-white">{accountInitial}</Text>
            </View>
            <Text className="text-[15px] font-medium text-[#172720]">{accountName}</Text>
          </View>
        </View>

        <View>
          <Text className="mb-1 text-[15px] font-medium text-[#172720]">
            {labels.phone}
            <Text className="text-[#e63345]">*</Text>
          </Text>
          <View className="h-10 flex-row overflow-hidden rounded-lg border border-[#d7ddda] bg-white">
            <Touch
              accessibilityLabel={`Chọn quốc gia, hiện tại ${country.name}`}
              className="w-[58px] flex-row items-center justify-center gap-1 border-r border-[#e4e7e5]"
              onPress={() => setCountryPickerOpen(true)}
            >
              <CountryFlag code={country.code} size={16} />
              <ChevronDown color="#172720" size={14} />
            </Touch>
            <TextInput
              accessibilityLabel={labels.phone}
              className="min-w-0 flex-1 px-2 text-[15px] text-[#172720]"
              keyboardType="phone-pad"
              onChangeText={setPhone}
              placeholder={labels.phonePlaceholder}
              placeholderTextColor="#929794"
              value={phone}
            />
          </View>

          <Touch className="mt-2 flex-row items-center gap-2" onPress={() => setShouldSavePhone((value) => !value)}>
            <View
              className={`h-[17px] w-[17px] items-center justify-center rounded-[2px] border ${shouldSavePhone ? "border-[#008447] bg-[#008447]" : "border-[#aeb9b3] bg-white"}`}
            >
              {shouldSavePhone ? <Check color="#ffffff" size={13} strokeWidth={3} /> : null}
            </View>
            <Text className="flex-1 text-[13px] text-[#49544f]">{labels.addPhone}</Text>
          </Touch>
        </View>

        <View className="gap-2 border-b border-[#e1e6e3] pb-3">
          <View className="flex-row gap-2">
            <CalendarDays color="#8a9690" size={15} style={{ marginTop: 2 }} />
            <View className="flex-1">
              <Text className="text-[14px] text-[#8a918e]">{labels.event}</Text>
              <Text className="text-[14px] font-semibold text-[#172720]">{event.title}</Text>
            </View>
          </View>
          <View className="flex-row gap-2">
            <Ticket color="#8a9690" size={15} style={{ marginTop: 2 }} />
            <View className="flex-1">
              <Text className="text-[14px] text-[#8a918e]">{labels.ticket}</Text>
              <Text className="text-[14px] font-semibold text-[#008447]">{quantity} vé</Text>
            </View>
          </View>
        </View>

        <View className="flex-row items-center">
          <Text className="flex-1 text-[16px] font-medium text-[#172720]">{labels.total}</Text>
          <Text className="text-[18px] font-bold text-[#007b45]">{formatCurrency(event.priceValue * quantity)}</Text>
        </View>

        {requiresSignIn ? <NoticeMessage text={labels.signInMessage} /> : null}
        <ErrorMessage text={errorMessage} />
      </View>

      <CountryPicker
        isOpen={isCountryPickerOpen}
        onClose={() => setCountryPickerOpen(false)}
        onSelect={(selected) => {
          setCountry(selected);
          setCountryPickerOpen(false);
        }}
        selectedCode={country.code}
      />
    </Sheet>
  );
}
