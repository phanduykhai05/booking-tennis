
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
    <div className="w-full bg-[#0f9b58]">
      <HeaderBackdrop />

      <div className="w-full max-w-[1275px] self-center px-3 pb-4 pt-4">
        {/*
          Mỗi khối có z-index tạo stacking context riêng nên `z-50`
          đặt trong HeaderAccount không thắng được HeaderSearch. Menu tài khoản tràn
          xuống dưới hàng này, vì vậy phải nâng chính hàng này lên trên khối tìm kiếm.
        */}
        <div className="z-50 flex-row items-start gap-3">
          <HeaderLogo brandName={publicHeaderContent.brandName} />

          <div className="min-w-0 flex-1 pt-1.5">
            <TodayLabel />
            <div className="mt-3.5">
              <HeaderAccount />
            </div>
          </div>

          <LanguageSelector label={publicHeaderContent.languageLabel} />
        </div>

        <div className="mt-4">
          <HeaderSearch
            favoriteLabel={publicHeaderContent.favoriteLabel}
            onChange={onSearchChange}
            placeholder={publicHeaderContent.searchPlaceholder}
            shortcuts={headerShortcuts}
            submitLabel={publicHeaderContent.searchSubmitLabel}
            value={searchValue}
          />
        </div>
      </div>
    </div>
  );
}
