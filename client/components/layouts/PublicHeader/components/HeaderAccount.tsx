import { useNavigate } from "react-router";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useState } from "react";

import HeaderActions from "@/components/layouts/PublicHeader/components/HeaderActions";
import { headerActions } from "@/components/layouts/PublicHeader/mockData";
import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";
import { useSession } from "@/lib/api/session";

export default function HeaderAccount() {
  const navigate = useNavigate();
  const { isReady, session, signOut } = useSession();
  const [isMenuOpen, setMenuOpen] = useState(false);

  // Chưa đọc xong phiên đăng nhập hoặc chưa đăng nhập thì hiện nút khách.
  if (!isReady || !session) {
    return <HeaderActions actions={headerActions} />;
  }

  const { user } = session;

  return (
    <div className="w-full max-w-[300px]">
      <Touch
        accessibilityRole="button"
        className="h-9 w-full flex-row items-center gap-2 rounded-lg bg-white px-3"
        onPress={() => setMenuOpen((open) => !open)}
        style={shadow.card}
      >
        <div className="h-6 w-6 items-center justify-center rounded-full bg-[#656ad5]">
          <span className="text-[13px] font-semibold uppercase text-white">{user.avatarInitial}</span>
        </div>
        <span className="truncate min-w-0 flex-1 text-[14px] font-semibold text-[#0b7a4a]">
          {user.fullName}
        </span>
        <ChevronDown color="#0b7a4a" size={16} style={{ transform: `rotate(${isMenuOpen ? "180deg" : "0deg"})` }} />
      </Touch>

      {isMenuOpen ? (
        <div className="absolute right-0 top-11 z-50 w-56 overflow-hidden rounded-xl bg-white" style={shadow.raised}>
          <Touch
            className="flex-row items-center gap-2 px-4 py-3"
            onPress={() => {
              setMenuOpen(false);
              navigate("/account");
            }}
          >
            <User color="#0b7a4a" size={17} />
            <span className="text-[14px] text-[#1b2f25]">Tài khoản của tôi</span>
          </Touch>
          <Touch
            className="flex-row items-center gap-2 border-t border-[#eef3f0] px-4 py-3"
            onPress={() => {
              signOut();
              setMenuOpen(false);
              navigate("/login");
            }}
          >
            <LogOut color="#c0392b" size={17} />
            <span className="text-[14px] text-[#c0392b]">Đăng xuất</span>
          </Touch>
        </div>
      ) : null}
    </div>
  );
}
