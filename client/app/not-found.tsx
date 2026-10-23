import { useNavigate } from "react-router";

import Button from "@/components/ui/Button";
import Screen from "@/components/ui/Screen";

export default function NotFoundScreen() {
  const navigate = useNavigate();

  return (
    <Screen backgroundColor="#f5f6f5">
      <div className="flex-1 items-center justify-center gap-4 px-6">
        <span className="text-[19px] font-bold text-[#0b5133]">Không tìm thấy trang</span>
        <span className="text-center text-[14px] text-[#68716d]">Đường dẫn bạn mở không tồn tại hoặc đã bị gỡ.</span>
        <Button label="Về trang chủ" onPress={() => navigate("/", { replace: true })} />
      </div>
    </Screen>
  );
}
