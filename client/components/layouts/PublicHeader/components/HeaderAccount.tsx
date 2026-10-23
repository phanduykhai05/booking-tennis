import HeaderActions from "@/components/layouts/PublicHeader/components/HeaderActions";
import { headerActions } from "@/components/layouts/PublicHeader/mockData";
import { useSession } from "@/lib/api/session";

/**
 * Khách thấy nút Đăng nhập/Đăng kí. Đã đăng nhập thì avatar + tên ở bên trái thay chỗ (như bản gốc);
 * đăng xuất nằm ở trang Tài khoản.
 */
export default function HeaderAccount() {
  const { session } = useSession();

  if (session) return null;

  return (
    <div className="mt-3.5">
      <HeaderActions actions={headerActions} />
    </div>
  );
}
