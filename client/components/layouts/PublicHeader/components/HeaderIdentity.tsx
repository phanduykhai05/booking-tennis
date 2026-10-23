import { useNavigate } from "react-router";

import aloboIcons from "@/components/assets/icons";
import HeaderLogo from "@/components/layouts/PublicHeader/components/HeaderLogo";
import Touch from "@/components/ui/Pressable";
import { useSession } from "@/lib/api/session";

type HeaderAvatarProps = { brandName: string };

/** Đã đăng nhập thì thay logo bằng avatar chữ cái đầu (như bản gốc), bấm vào sang trang tài khoản. */
export function HeaderAvatar({ brandName }: HeaderAvatarProps) {
  const navigate = useNavigate();
  const { session } = useSession();

  if (!session) return <HeaderLogo brandName={brandName} />;

  return (
    <Touch
      accessibilityLabel="Tài khoản"
      className="h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#5d423a] lg:h-16 lg:w-16"
      onPress={() => navigate("/account")}
    >
      <span className="text-[26px] uppercase text-white lg:text-[32px]">{session.user.avatarInitial}</span>
    </Touch>
  );
}

export function HeaderUserName() {
  const { session } = useSession();

  if (!session) return null;

  return <span className="mt-2 truncate text-[18px] font-semibold text-[#ffe57a]">{session.user.fullName}</span>;
}

export function HeaderNotifications() {
  const navigate = useNavigate();
  const { session } = useSession();

  if (!session) return null;

  return (
    <Touch accessibilityLabel="Thông báo" className="rounded-full p-1" onPress={() => navigate("/notifications")}>
      <aloboIcons.notification color="#ffffff" height={22} width={22} />
    </Touch>
  );
}
