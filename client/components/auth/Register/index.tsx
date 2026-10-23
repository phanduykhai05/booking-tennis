import { useState } from "react";
import { useNavigate } from "react-router";

import AuthLayout from "@/components/auth/AuthLayout";
import PasswordField from "@/components/auth/Register/components/PasswordField";
import PhoneField from "@/components/auth/Register/components/PhoneField";
import RegisterField from "@/components/auth/Register/components/RegisterField";
import { initialRegisterValues, registerContent, registerFields } from "@/components/auth/Register/content";
import type { RegisterFormValues } from "@/components/auth/Register/types";
import Button from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/Feedback";
import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";
import { register } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/http";
import { useSession } from "@/lib/api/session";

export default function Register() {
  const [values, setValues] = useState<RegisterFormValues>(initialRegisterValues);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useSession();

  const setField = (field: keyof RegisterFormValues, value: string) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
  };

  const submit = async () => {
    if (values.password !== values.passwordConfirmation) {
      setErrorMessage(registerContent.passwordMismatch);
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      signIn(
        await register({
          fullName: values.fullName,
          password: values.password,
          phone: values.phone.replace(/\D/g, ""),
          ...(values.email ? { email: values.email } : {}),
        }),
      );
      navigate("/home", { replace: true });
    } catch (error) {
      setErrorMessage(error instanceof ApiError ? error.message : registerContent.errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout backHref="/" backLabel="Quay lại" headerHeight={128} title={registerContent.title}>
      <div className="rounded-[9px] bg-white px-4 pb-9 pt-8" style={shadow.raised}>
        <div className="gap-[25px]">
          <PhoneField label={registerContent.phone} onChange={(value) => setField("phone", value)} value={values.phone} />

          {registerFields.map((field) => (
            <RegisterField
              field={field}
              key={field.id}
              onChange={(value) => setField(field.id, value)}
              onClear={() => setField(field.id, "")}
              value={values[field.id]}
            />
          ))}

          <PasswordField
            isNewPassword
            label={registerContent.password}
            onChange={(value) => setField("password", value)}
            placeholder="Nhập mật khẩu (*)"
            value={values.password}
          />
          <PasswordField
            isNewPassword
            label={registerContent.passwordConfirmation}
            onChange={(value) => setField("passwordConfirmation", value)}
            placeholder="Nhập lại mật khẩu"
            value={values.passwordConfirmation}
          />
        </div>

        {errorMessage ? (
          <div className="mt-6">
            <ErrorMessage text={errorMessage} />
          </div>
        ) : null}

        <div className="mt-10">
          <Button
            fullWidth
            isLoading={isSubmitting}
            label={isSubmitting ? registerContent.registering : registerContent.register}
            onPress={() => void submit()}
          />
        </div>

        <div className="mt-7 flex-row justify-center gap-1">
          <span className="text-[14px] text-[#323232]">{registerContent.alreadyHaveAccount}</span>
          <Touch onPress={() => navigate("/login", { replace: true })}>
            <span className="text-[14px] font-bold text-[#007b49] underline">{registerContent.signIn}</span>
          </Touch>
        </div>
      </div>
    </AuthLayout>
  );
}
