"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import PasswordField from "@/components/auth/Register/components/PasswordField";
import PhoneField from "@/components/auth/Register/components/PhoneField";
import RegisterField from "@/components/auth/Register/components/RegisterField";
import styles from "@/components/auth/AuthPageAnimation.module.scss";
import { initialRegisterValues, registerContent, registerFields } from "@/components/auth/Register/content";
import type { RegisterFormValues } from "@/components/auth/Register/types";
import { register } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/http";
import { useSession } from "@/lib/api/session";

export default function Register() {
  const [values, setValues] = useState<RegisterFormValues>(initialRegisterValues);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();
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
      router.push("/home");
    } catch (error) {
      setErrorMessage(error instanceof ApiError ? error.message : registerContent.errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-[100dvh] items-start justify-center overflow-x-hidden overflow-y-auto bg-[#087640] px-3 pb-[max(18px,env(safe-area-inset-bottom))] pt-[max(18px,env(safe-area-inset-top))] sm:p-8">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_50%_13%,#42af67_0%,#218d4c_38%,#087640_76%,#08713e_100%)]" />
      <div className="fixed inset-0 opacity-25 [background-image:repeating-linear-gradient(174deg,transparent_0,transparent_3px,rgba(255,255,255,0.24)_4px,transparent_5px)]" />
      <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full border-[50px] border-[#139253]/65" />
      <div className="absolute -bottom-36 -right-20 h-72 w-72 rounded-full border-[45px] border-[#188a4e]/60" />

      <section aria-labelledby="register-title" className={`relative w-full max-w-[402px] pb-3 ${styles.pageEnter}`}>
        <header className="relative flex h-32 items-start justify-center pt-4 text-white">
          <Link aria-label="Quay lại" className="absolute left-0 top-3 rounded p-1 transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" href="/">
            <ArrowLeft aria-hidden="true" size={22} strokeWidth={2.5} />
          </Link>
          <h1 className="text-[17px] font-bold" id="register-title">{registerContent.title}</h1>
        </header>

        <form className={`rounded-[9px] bg-white px-4 pb-9 pt-8 shadow-[0_12px_30px_rgba(0,64,36,0.14)] sm:px-[18px] ${styles.formEnter}`} onSubmit={(event) => { event.preventDefault(); void submit(); }}>
          <div className="space-y-[25px]">
            <PhoneField label={registerContent.phone} onChange={(value) => setField("phone", value)} value={values.phone} />
            {registerFields.map((field) => (
              <RegisterField field={field} key={field.id} onChange={(value) => setField(field.id, value)} onClear={() => setField(field.id, "")} value={values[field.id]} />
            ))}
            <PasswordField autoComplete="new-password" label={registerContent.password} onChange={(value) => setField("password", value)} placeholder="Nhập mật khẩu (*)" required value={values.password} />
            <PasswordField autoComplete="new-password" label={registerContent.passwordConfirmation} onChange={(value) => setField("passwordConfirmation", value)} placeholder="Nhập lại mật khẩu" value={values.passwordConfirmation} />
          </div>

          {errorMessage && <p className="mt-6 rounded-md bg-[#fdecec] px-3 py-2 text-[13px] font-medium text-[#b3261e]" role="alert">{errorMessage}</p>}
          <button className="mt-10 h-11 w-full rounded bg-[#087a46] text-sm font-bold text-white transition hover:bg-[#056b3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087a46] focus-visible:ring-offset-2 active:scale-[0.99] disabled:bg-[#8fb9a2]" disabled={isSubmitting} type="submit">
            {isSubmitting ? registerContent.registering : registerContent.register}
          </button>
          <p className="mt-7 text-center text-[14px] text-[#323232]">
            {registerContent.alreadyHaveAccount} <a className="font-bold text-[#007b49]" href="/login">
              {registerContent.signIn}
            </a>
          </p>
        </form>
      </section>
    </main>
  );
}
