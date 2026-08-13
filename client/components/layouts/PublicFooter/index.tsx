import BottomNavigation from "@/components/layouts/PublicFooter/components/BottomNavigation";
import { bottomNavigationItems, bottomNavigationLabel, publicFooterLabel } from "@/components/layouts/PublicFooter/mockData";

type PublicFooterProps = {
  activeItemId?: string;
};

export default function PublicFooter({ activeItemId = "home" }: PublicFooterProps) {
  const items = bottomNavigationItems.map((item) => ({
    ...item,
    isActive: item.id === activeItemId,
  }));

  return (
    <footer aria-label={publicFooterLabel} className="pointer-events-none fixed inset-x-0 bottom-0 z-[1100]">
      {/* Safe-area đặt ở lớp bọc: nhét vào trong nav cao cố định sẽ bóp nội dung trên máy có notch. */}
      <div className="pointer-events-auto w-full bg-white pb-[env(safe-area-inset-bottom)]">
        <BottomNavigation ariaLabel={bottomNavigationLabel} items={items} />
      </div>
    </footer>
  );
}
