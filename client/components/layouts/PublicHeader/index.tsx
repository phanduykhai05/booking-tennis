import HeaderActions from "@/components/layouts/PublicHeader/components/HeaderActions";
import HeaderBackdrop from "@/components/layouts/PublicHeader/components/HeaderBackdrop";
import HeaderLogo from "@/components/layouts/PublicHeader/components/HeaderLogo";
import HeaderSearch from "@/components/layouts/PublicHeader/components/HeaderSearch";
import LanguageSelector from "@/components/layouts/PublicHeader/components/LanguageSelector";
import TodayLabel from "@/components/layouts/PublicHeader/components/TodayLabel";
import { headerActions, headerShortcuts, publicHeaderContent } from "@/components/layouts/PublicHeader/mockData";

export default function PublicHeader() {
  return (
    <header className="relative w-full overflow-hidden bg-[#0f9b58] shadow-[0_8px_24px_-14px_rgba(3,52,32,0.9)]">
      <HeaderBackdrop />

      <div className="relative mx-auto w-full max-w-[1275px] px-3 pb-4 pt-4 sm:px-4">
        <div className="flex items-start gap-3 lg:items-center">
          <HeaderLogo brandName={publicHeaderContent.brandName} />

          {/* Mobile xếp dọc dưới ngày; desktop trải ngang để lấp khoảng trống bên phải. */}
          <div className="flex min-w-0 flex-1 flex-col pt-1.5 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:pt-0">
            <TodayLabel fallbackLabel={publicHeaderContent.todayFallbackLabel} />
            <div className="mt-3.5 lg:mt-0 lg:shrink-0">
              <HeaderActions actions={headerActions} />
            </div>
          </div>

          <LanguageSelector label={publicHeaderContent.languageLabel} />
        </div>

        <div className="relative mt-4">
          <HeaderSearch
            favoriteLabel={publicHeaderContent.favoriteLabel}
            inputLabel={publicHeaderContent.searchInputLabel}
            placeholder={publicHeaderContent.searchPlaceholder}
            shortcuts={headerShortcuts}
            submitLabel={publicHeaderContent.searchSubmitLabel}
          />
        </div>
      </div>
    </header>
  );
}
