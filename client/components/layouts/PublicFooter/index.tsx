import FooterContact from "@/components/layouts/PublicFooter/components/FooterContact";
import FooterLinkGroups from "@/components/layouts/PublicFooter/components/FooterLinkGroups";

export default function PublicFooter() {
  return (
    <footer className="w-full bg-[#3d4658] text-[#b3b3b3]" aria-label="Thông tin Ticketbox">
      <div className="mx-auto w-full max-w-[1472px] px-6 py-16 lg:px-0">
        <div className="grid gap-10 md:grid-cols-3 md:gap-x-20">
          <FooterContact />
          <FooterLinkGroups />
        </div>
      </div>
    </footer>
  );
}
