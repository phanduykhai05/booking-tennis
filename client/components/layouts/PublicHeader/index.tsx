import HeaderActions from "@/components/layouts/PublicHeader/components/HeaderActions";
import HeaderCategories from "@/components/layouts/PublicHeader/components/HeaderCategories";
import HeaderLogo from "@/components/layouts/PublicHeader/components/HeaderLogo";
import HeaderSearch from "@/components/layouts/PublicHeader/components/HeaderSearch";

export default function PublicHeader() {
  return (
    <>
      <div className="flex h-[76px] w-full items-center justify-center bg-[#2dc275]">
        <header className="flex h-full w-full max-w-[1275px] items-center justify-between gap-4 px-4 py-4 lg:px-2">
          <HeaderLogo />
          <div className="flex flex-1 items-center justify-end gap-4">
            <HeaderSearch />
            <HeaderActions />
          </div>
        </header>
      </div>
      <HeaderCategories />
    </>
  );
}
