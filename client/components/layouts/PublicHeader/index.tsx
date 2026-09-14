import { View } from "react-native";

import HeaderAccount from "@/components/layouts/PublicHeader/components/HeaderAccount";
import HeaderBackdrop from "@/components/layouts/PublicHeader/components/HeaderBackdrop";
import HeaderLogo from "@/components/layouts/PublicHeader/components/HeaderLogo";
import HeaderSearch from "@/components/layouts/PublicHeader/components/HeaderSearch";
import LanguageSelector from "@/components/layouts/PublicHeader/components/LanguageSelector";
import TodayLabel from "@/components/layouts/PublicHeader/components/TodayLabel";
import { headerShortcuts, publicHeaderContent } from "@/components/layouts/PublicHeader/mockData";

type PublicHeaderProps = {
  onSearchChange: (value: string) => void;
  searchValue: string;
};

export default function PublicHeader({ onSearchChange, searchValue }: PublicHeaderProps) {
  return (
    <View className="w-full bg-[#0f9b58]">
      <HeaderBackdrop />

      <View className="w-full max-w-[1275px] self-center px-3 pb-4 pt-4">
        <View className="flex-row items-start gap-3">
          <HeaderLogo brandName={publicHeaderContent.brandName} />

          <View className="min-w-0 flex-1 pt-1.5">
            <TodayLabel />
            <View className="mt-3.5">
              <HeaderAccount />
            </View>
          </View>

          <LanguageSelector label={publicHeaderContent.languageLabel} />
        </View>

        <View className="mt-4">
          <HeaderSearch
            favoriteLabel={publicHeaderContent.favoriteLabel}
            onChange={onSearchChange}
            placeholder={publicHeaderContent.searchPlaceholder}
            shortcuts={headerShortcuts}
            submitLabel={publicHeaderContent.searchSubmitLabel}
            value={searchValue}
          />
        </View>
      </View>
    </View>
  );
}
