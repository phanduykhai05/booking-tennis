import LanguageSelector from "@/components/layouts/PublicHeader/components/LanguageSelector";
import AccountMenu from "@/components/layouts/StarsHeader/components/AccountMenu";
import MyTicketsLink from "@/components/layouts/StarsHeader/components/MyTicketsLink";
import StarsHeaderLogo from "@/components/layouts/StarsHeader/components/StarsHeaderLogo";

export default function StarsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/50 backdrop-blur-2xl">
      <div className="mx-auto flex w-full max-w-[1275px] items-center justify-between gap-4 px-4 py-4 lg:px-2">
        <StarsHeaderLogo />
        <nav aria-label="Tiện ích tài khoản" className="flex shrink-0 items-center gap-1 sm:gap-2">
          <MyTicketsLink />
          <AccountMenu />
          <LanguageSelector />
        </nav>
      </div>
    </header>
  );
}
