import { CircleX } from "lucide-react-native";
import { useState } from "react";
import { Text, View } from "react-native";

import AuthLayout from "@/components/auth/AuthLayout";
import LookupMethodSelector from "@/components/auth/ForgotPassword/components/LookupMethodSelector";
import SupportActions from "@/components/auth/ForgotPassword/components/SupportActions";
import { forgotPasswordContent } from "@/components/auth/ForgotPassword/content";
import type { AccountLookupMethod } from "@/components/auth/ForgotPassword/types";
import Button from "@/components/ui/Button";
import { ErrorMessage, SuccessMessage } from "@/components/ui/Feedback";
import Touch from "@/components/ui/Pressable";
import TextField from "@/components/ui/TextField";
import { shadow } from "@/components/ui/theme";
import { forgotPassword } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/http";

export default function ForgotPassword() {
  const [method, setMethod] = useState<AccountLookupMethod>("email");
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const isEmailLookup = method === "email";

  const selectMethod = (nextMethod: AccountLookupMethod) => {
    setMethod(nextMethod);
    setValue("");
    setSentCode("");
    setErrorMessage("");
  };

  const submit = async () => {
    setSubmitting(true);
    setErrorMessage("");
    setSentCode("");

    try {
      const result = await forgotPassword(isEmailLookup ? { email: value } : { phone: value.replace(/\D/g, "") });
      setSentCode(result.code);
    } catch (error) {
      setErrorMessage(error instanceof ApiError ? error.message : forgotPasswordContent.errorMessage);
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
        <Text className="text-[15px] leading-5 text-[#064b30]">{forgotPasswordContent.description}</Text>

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

        {errorMessage ? (
          <View className="mt-6">
            <ErrorMessage text={errorMessage} />
          </View>
        ) : null}

        {sentCode ? (
          <View className="mt-6">
            <SuccessMessage text={`${forgotPasswordContent.codeSent} ${sentCode}`} />
          </View>
        ) : null}

        <View className="mt-10">
          <Button fullWidth isLoading={isSubmitting} label={forgotPasswordContent.continue} onPress={() => void submit()} />
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
