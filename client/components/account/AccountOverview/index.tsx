import AccountMenuList from "@/components/account/AccountOverview/components/AccountMenuList";
import AloboIntro from "@/components/account/AccountOverview/components/AloboIntro";
import { accountContent, activityItems, systemItems } from "@/components/account/AccountOverview/mockData";
import PublicFooter from "@/components/layouts/PublicFooter";

export default function AccountOverview() {
  return (
    <div className="min-h-[100dvh] bg-[#eaf8f1] pb-24">
      <div className="h-[104px] bg-[radial-gradient(ellipse_at_50%_-45%,#58c670_0%,#249a53_63%,#148040_100%)]" />
      <main className="relative -mt-[30px] min-h-[calc(100dvh-74px)] rounded-t-[26px] bg-[#eaf8f1] pt-px">
        <AloboIntro appName={accountContent.appName} loginLabel={accountContent.login} offer={accountContent.offer} registerLabel={accountContent.register} />
        <div className="mt-3 px-[18px]">
          <h2 className="mb-2 text-[16px] font-bold text-[#007c43]">{accountContent.activityTitle}</h2>
          <AccountMenuList items={activityItems} />
        </div>
        <div className="mt-3 px-[18px]">
          <h2 className="mb-2 text-[16px] font-bold text-[#007c43]">{accountContent.systemTitle}</h2>
          <AccountMenuList items={systemItems} />
        </div>
      </main>
      <PublicFooter activeItemId="account" />
    </div>
  );
}
