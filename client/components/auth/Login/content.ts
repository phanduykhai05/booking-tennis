import type { LoginValues } from "@/components/auth/Login/types";

export const loginContent = {
  email: "Email",
  errorMessage: "Không đăng nhập được, thử lại sau",
  emailLabel: "Email của bạn?",
  emailPlaceholder: "Nhập email của bạn",
  forgotPassword: "Quên mật khẩu",
  forgotPasswordPrompt: "Bạn quên mật khẩu?",
  password: "Mật khẩu (*)",
  passwordPlaceholder: "Nhập mật khẩu (*)",
  phone: "Số điện thoại",
  phoneLabel: "Số điện thoại của bạn?",
  register: "Đăng ký",
  registerPrompt: "Bạn chưa có tài khoản?",
  signIn: "ĐĂNG NHẬP",
  signingIn: "ĐANG ĐĂNG NHẬP…",
  staffNotice: "Nếu bạn là CHỦ SÂN hoặc NHÂN VIÊN, Bấm vào đây để tải ứng dụng ALOBO - Quản lý sân thể thao!",
  title: "Đăng nhập",
};

export const initialLoginValues: LoginValues = {
  email: "",
  password: "",
  phone: "",
};
