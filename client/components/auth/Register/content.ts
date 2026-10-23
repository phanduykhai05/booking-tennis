import type { RegisterField, RegisterFormValues } from "@/components/auth/Register/types";

export const registerContent = {
  alreadyHaveAccount: "Bạn đã có tài khoản?",
  email: "Email của bạn?",
  errorMessage: "Không đăng ký được, thử lại sau",
  fullName: "Tên đầy đủ (*)",
  password: "Mật khẩu (*)",
  passwordConfirmation: "Nhập mật khẩu",
  phone: "Số điện thoại của bạn?",
  passwordMismatch: "Mật khẩu nhập lại chưa khớp",
  register: "ĐĂNG KÝ",
  registering: "ĐANG ĐĂNG KÝ…",
  signIn: "Đăng nhập",
  title: "Đăng ký",
};

export const registerFields: RegisterField[] = [
  {
    autoComplete: "email",
    id: "email",
    label: registerContent.email,
    placeholder: "Nhập email của bạn",
    type: "email",
  },
  {
    autoComplete: "name",
    id: "fullName",
    label: registerContent.fullName,
    placeholder: "Nhập họ và tên",
    required: true,
    type: "text",
  },
];

export const initialRegisterValues: RegisterFormValues = {
  email: "",
  fullName: "",
  password: "",
  passwordConfirmation: "",
  phone: "",
};
