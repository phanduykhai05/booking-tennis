import { useState } from "react";
import { useNavigate } from "react-router";

import AuthLayout from "@/components/auth/AuthLayout";
import LoginTabs from "@/components/auth/Login/components/LoginTabs";
import StaffNotice from "@/components/auth/Login/components/StaffNotice";
import { initialLoginValues, loginContent } from "@/components/auth/Login/content";
import type { LoginMethod, LoginValues } from "@/components/auth/Login/types";
import PasswordField from "@/components/auth/Register/components/PasswordField";
import PhoneField from "@/components/auth/Register/components/PhoneField";
import Button from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/Feedback";
import Touch from "@/components/ui/Pressable";
import TextField from "@/components/ui/TextField";
import { shadow } from "@/components/ui/theme";
import { login } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/http";
import { useSession } from "@/lib/api/session";

export default function Login() {
  const [method, setMethod] = useState<LoginMethod>("phone");
  const [values, setValues] = useState<LoginValues>(initialLoginValues);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useSession();

  const setField = (field: keyof LoginValues, value: string) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
  };

  const isPhoneLogin = method === "phone";

  const submit = async () => {
    setSubmitting(true);
    setErrorMessage("");

    try {
      signIn(
        await login({
          password: values.password,
          ...(isPhoneLogin ? { phone: values.phone.replace(/\D/g, "") } : { email: values.email }),
        }),
      );
      navigate("/home", { replace: true });
    } catch (error) {
      setErrorMessage(error instanceof ApiError ? error.message : loginContent.errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout backHref="/" backLabel="Quay lại" title={loginContent.title}>
      <div className="overflow-hidden rounded-[7px] bg-white" style={shadow.raised}>
        <LoginTabs activeMethod={method} emailLabel={loginContent.email} onSelect={setMethod} phoneLabel={loginContent.phone} />

        <div className="px-4 pb-6 pt-7">
          <div className="gap-7">
            {isPhoneLogin ? (
              <PhoneField label={loginContent.phoneLabel} onChange={(value) => setField("phone", value)} value={values.phone} />
            ) : (
              <TextField
                keyboardType="email-address"
                label={loginContent.emailLabel}
                onChangeText={(value) => setField("email", value)}
                placeholder={loginContent.emailPlaceholder}
                textContentType="emailAddress"
                value={values.email}
              />
            )}

            <PasswordField
              label={loginContent.password}
              onChange={(value) => setField("password", value)}
              placeholder={loginContent.passwordPlaceholder}
              value={values.password}
            />
          </div>

          {errorMessage ? (
            <div className="mt-5">
              <ErrorMessage text={errorMessage} />
            </div>
          ) : null}

          <div className="mt-8">
            <Button
              fullWidth
              isLoading={isSubmitting}
              label={isSubmitting ? loginContent.signingIn : loginContent.signIn}
              onPress={() => void submit()}
            />
          </div>

          <div className="mt-7 flex-row justify-center gap-1">
            <span className="text-[14px] text-[#323232]">{loginContent.forgotPasswordPrompt}</span>
            <Touch onPress={() => navigate("/forgot-password")}>
              <span className="text-[14px] font-bold text-[#007b49] underline">{loginContent.forgotPassword}</span>
            </Touch>
          </div>
        </div>
      </div>

      <div className="my-5 flex-row justify-center gap-1">
        <span className="text-[14px] text-white">{loginContent.registerPrompt}</span>
        <Touch onPress={() => navigate("/register", { replace: true })}>
          <span className="text-[14px] font-bold text-white underline">{loginContent.register}</span>
        </Touch>
      </div>

      <StaffNotice message={loginContent.staffNotice} />
    </AuthLayout>
  );
}
