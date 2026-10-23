import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";

import Screen from "@/components/ui/Screen";
import Touch from "@/components/ui/Pressable";

type AuthLayoutProps = {
  backHref: string;
  backLabel: string;
  children: ReactNode;
  /** Chiều cao vùng tiêu đề, giữ đúng khoảng trống của từng trang như bản web. */
  headerHeight?: number;
  maxWidth?: number;
  title: string;
};

/**
 * Nền chung của ba trang đăng nhập / đăng ký / quên mật khẩu: dải xanh chuyển sắc,
 * vạch kẻ chéo mờ và hai vòng tròn viền dày ở đáy. Giữ gradient dọc cùng dải màu
 * thay cho radial-gradient, khác biệt gần như không nhận ra ở kích thước này.
 */
export default function AuthLayout({
  backHref,
  backLabel,
  children,
  headerHeight = 115,
  maxWidth = 402,
  title,
}: AuthLayoutProps) {
  const navigate = useNavigate();

  return (
    <Screen backgroundColor="#087640" edges={["top", "bottom"]} statusBarStyle="light">
      <div
        style={{
          backgroundImage: "linear-gradient(180deg, #42af67 0%, #218d4c 38%, #087640 76%, #08713e 100%)",
          bottom: 0,
          left: 0,
          position: "absolute",
          right: 0,
          top: 0,
        }}
      />
      <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full border-[50px] border-[#139253]/65" />
      <div className="pointer-events-none absolute -bottom-36 -right-20 h-72 w-72 rounded-full border-[45px] border-[#188a4e]/60" />

      <div className="flex-1">
        <div className="grow shrink overflow-y-auto overflow-x-hidden">
          <div className="px-3 pb-6">
            <div className="w-full self-center" style={{ maxWidth }}>
              <div className="items-center justify-start pt-4" style={{ height: headerHeight }}>
                <Touch accessibilityLabel={backLabel} className="absolute left-0 top-3 rounded p-1" onPress={() => navigate(backHref)}>
                  <ArrowLeft color="#ffffff" size={22} strokeWidth={2.5} />
                </Touch>
                <span className="text-[17px] font-bold text-white">{title}</span>
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}
