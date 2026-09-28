import { useRouter } from "expo-router";
import { CircleX } from "lucide-react-native";
import { useState } from "react";
import { Text, View } from "react-native";

import AuthLayout from "@/components/auth/AuthLayout";
import LookupMethodSelector from "@/components/auth/ForgotPassword/components/LookupMethodSelector";
import SupportActions from "@/components/auth/ForgotPassword/components/SupportActions";
import { forgotPasswordContent } from "@/components/auth/ForgotPassword/content";
import type { AccountLookupMethod } from "@/components/auth/ForgotPassword/types";
import Button from "@/components/ui/Button";
import { ErrorMessage, NoticeMessage, SuccessMessage } from "@/components/ui/Feedback";
import Touch from "@/components/ui/Pressable";
import TextField from "@/components/ui/TextField";
import { shadow } from "@/components/ui/theme";
import { forgotPassword, resetPassword } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/http";

const minPasswordLength = 6;

export default function ForgotPassword() {
  const router = useRouter();
  const [method, setMethod] = useState<AccountLookupMethod>("email");
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [expiresInMinutes, setExpiresInMinutes] = useState(0);
  /** Tài khoản đã được server xác nhận ở bước tìm kiếm; gửi kèm khi đặt lại mật khẩu. */
  const [account, setAccount] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const isEmailLookup = method === "email";
  const isResetStep = Boolean(account);

  const selectMethod = (nextMethod: AccountLookupMethod) => {
    setMethod(nextMethod);
    setValue("");
    setSentCode("");
    setErrorMessage("");
  };

  const backToLookup = () => {
    setAccount("");
    setCode("");
    setPassword("");
    setConfirmPassword("");
    setSentCode("");
    setErrorMessage("");
    setSuccessMessage("");
  };

  const requestCode = async () => {
    setSubmitting(true);
    setErrorMessage("");
    setSentCode("");

    const lookupAccount = isEmailLookup ? value.trim() : value.replace(/\D/g, "");

    try {
      const result = await forgotPassword(isEmailLookup ? { email: lookupAccount } : { phone: lookupAccount });
      setSentCode(result.code);
      setExpiresInMinutes(result.expiresInMinutes);
      setAccount(lookupAccount);
    } catch (error) {
      setErrorMessage(error instanceof ApiError ? error.message : forgotPasswordContent.errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const submitNewPassword = async () => {
    if (password.length < minPasswordLength) {
      setErrorMessage(forgotPasswordContent.shortPasswordMessage);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(forgotPasswordContent.mismatchMessage);
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      await resetPassword({ account, code: code.trim(), password });
      setSuccessMessage(forgotPasswordContent.resetSuccess);
      router.replace("/login");
    } catch (error) {
      setErrorMessage(error instanceof ApiError ? error.message : forgotPasswordContent.resetErrorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const fieldLabel = isEmailLookup ? forgotPasswordContent.emailLabel : forgotPasswordContent.phoneLabel;
  const fieldPlaceholder = isEmailLookup ? forgotPasswordContent.emailPlaceholder : forgotPasswordContent.phonePlaceholder;

  return (
    <AuthLayout
      backHref="/login"
      backLabel="Quay lại trang đăng nhập"
      headerHeight={188}
      maxWidth={364}
      title={forgotPasswordContent.title}
    >
      <View className="rounded-[9px] bg-white px-4 py-4" style={shadow.raised}>
        <Text className="text-[15px] leading-5 text-[#064b30]">
          {isResetStep ? forgotPasswordContent.resetDescription : forgotPasswordContent.description}
        </Text>

        {isResetStep ? (
          <View className="mt-4 gap-5">
            <TextField
              autoFocus
              keyboardType="number-pad"
              label={forgotPasswordContent.codeLabel}
              onChangeText={setCode}
              placeholder={forgotPasswordContent.codePlaceholder}
              value={code}
            />

            <TextField
              label={forgotPasswordContent.passwordLabel}
              onChangeText={setPassword}
              placeholder={forgotPasswordContent.passwordPlaceholder}
              secureTextEntry
              textContentType="newPassword"
              value={password}
            />

            <TextField
              label={forgotPasswordContent.confirmPasswordLabel}
              onChangeText={setConfirmPassword}
              placeholder={forgotPasswordContent.confirmPasswordPlaceholder}
              secureTextEntry
              textContentType="newPassword"
              value={confirmPassword}
            />
          </View>
        ) : (
          <View className="mt-4 gap-7">
            <LookupMethodSelector
              activeMethod={method}
              emailLabel={forgotPasswordContent.email}
              onSelect={selectMethod}
              phoneLabel={forgotPasswordContent.phone}
              title={forgotPasswordContent.lookupTitle}
            />

            <TextField
              keyboardType={isEmailLookup ? "email-address" : "phone-pad"}
              label={fieldLabel}
              onChangeText={setValue}
              placeholder={fieldPlaceholder}
              suffix={
                value ? (
                  <Touch accessibilityLabel={`Xóa ${fieldLabel}`} className="pl-2" onPress={() => setValue("")}>
                    <CircleX color="#007b49" size={18} strokeWidth={2.8} />
                  </Touch>
                ) : null
              }
              textContentType={isEmailLookup ? "emailAddress" : "telephoneNumber"}
              value={value}
            />
          </View>
        )}

        {errorMessage ? (
          <View className="mt-6">
            <ErrorMessage text={errorMessage} />
          </View>
        ) : null}

        {successMessage ? (
          <View className="mt-6">
            <SuccessMessage text={successMessage} />
          </View>
        ) : null}

        {sentCode ? (
          <View className="mt-6 gap-2">
            <SuccessMessage text={`${forgotPasswordContent.codeSent} ${sentCode}`} />
            <NoticeMessage text={forgotPasswordContent.expiresNote(expiresInMinutes)} />
          </View>
        ) : null}

        <View className="mt-10 gap-3">
          <Button
            fullWidth
            isLoading={isSubmitting}
            label={isResetStep ? forgotPasswordContent.resetSubmit : forgotPasswordContent.continue}
            onPress={() => void (isResetStep ? submitNewPassword() : requestCode())}
          />

          {isResetStep ? (
            <View className="flex-row justify-between">
              <Touch disabled={isSubmitting} onPress={() => void requestCode()}>
                <Text className="text-[14px] font-semibold text-[#007b49] underline">{forgotPasswordContent.resendLabel}</Text>
              </Touch>
              <Touch disabled={isSubmitting} onPress={backToLookup}>
                <Text className="text-[14px] font-semibold text-[#68716d] underline">{forgotPasswordContent.backToLookup}</Text>
              </Touch>
            </View>
          ) : null}
        </View>
      </View>

      <View className="mt-11">
        <Text className="text-[15px] leading-5 text-white">{forgotPasswordContent.supportDescription}</Text>
        <SupportActions
          fanpageLabel={forgotPasswordContent.fanpage}
          fanpageUrl={forgotPasswordContent.fanpageUrl}
          zaloLabel={forgotPasswordContent.zalo}
          zaloUrl={forgotPasswordContent.zaloUrl}
        />
      </View>
    </AuthLayout>
  );
}
