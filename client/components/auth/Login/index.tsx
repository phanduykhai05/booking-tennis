"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import PasswordField from "@/components/auth/Register/components/PasswordField";
import PhoneField from "@/components/auth/Register/components/PhoneField";
import styles from "@/components/auth/AuthPageAnimation.module.scss";
import LoginTabs from "@/components/auth/Login/components/LoginTabs";
import StaffNotice from "@/components/auth/Login/components/StaffNotice";
import { initialLoginValues, loginContent } from "@/components/auth/Login/content";
import type { LoginMethod, LoginValues } from "@/components/auth/Login/types";
import { login } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/http";
import { useSession } from "@/lib/api/session";

export default function Login() {
  const [method, setMethod] = useState<LoginMethod>("phone");
  const [values, setValues] = useState<LoginValues>(initialLoginValues);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();
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
      router.push("/home");
    } catch (error) {
      setErrorMessage(error instanceof ApiError ? error.message : loginContent.errorMessage);
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

      <section aria-labelledby="login-title" className={`relative w-full max-w-[402px] pb-3 ${styles.pageEnter}`}>
        <header className="relative flex h-[115px] items-start justify-center pt-4 text-white">
          <Link aria-label="Quay lại" className="absolute left-0 top-3 rounded p-1 transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" href="/">
            <ArrowLeft aria-hidden="true" size={22} strokeWidth={2.5} />
          </Link>
          <h1 className="text-[17px] font-bold" id="login-title">{loginContent.title}</h1>
        </header>

        <div className={`overflow-hidden rounded-[7px] bg-white shadow-[0_12px_30px_rgba(0,64,36,0.14)] ${styles.formEnter}`}>
          <LoginTabs activeMethod={method} emailLabel={loginContent.email} onSelect={setMethod} phoneLabel={loginContent.phone} />
          <form className="px-4 pb-6 pt-7 sm:px-[18px]" onSubmit={(event) => { event.preventDefault(); void submit(); }}>
            <div className={`space-y-7 ${styles.tabPanel}`} key={method}>
              {isPhoneLogin ? (
                <PhoneField label={loginContent.phoneLabel} onChange={(value) => setField("phone", value)} value={values.phone} />
              ) : (
                <label className="block">
                  <span className="mb-2.5 block text-[16px] font-bold text-[#034f30]">{loginContent.emailLabel}</span>
                  <input autoComplete="email" className="h-12 w-full rounded-md border border-[#d6d6d6] bg-white px-3 text-sm text-[#25352f] outline-none transition placeholder:text-[#777] focus:border-[#087b49] focus:ring-2 focus:ring-[#087b49]/15" onChange={(event) => setField("email", event.target.value)} placeholder={loginContent.emailPlaceholder} required type="email" value={values.email} />
                </label>
              )}
              <PasswordField autoComplete="current-password" label={loginContent.password} onChange={(value) => setField("password", value)} placeholder={loginContent.passwordPlaceholder} required value={values.password} />
            </div>
            {errorMessage && <p className="mt-5 rounded-md bg-[#fdecec] px-3 py-2 text-[13px] font-medium text-[#b3261e]" role="alert">{errorMessage}</p>}
            <button className="mt-8 h-11 w-full rounded bg-[#087a46] text-sm font-bold text-white transition hover:bg-[#056b3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087a46] focus-visible:ring-offset-2 active:scale-[0.99] disabled:bg-[#8fb9a2]" disabled={isSubmitting} type="submit">
              {isSubmitting ? loginContent.signingIn : loginContent.signIn}
            </button>
            <p className="mt-7 text-center text-[14px] text-[#323232]">
              {loginContent.forgotPasswordPrompt} <Link className="font-bold text-[#007b49] underline underline-offset-2" href="/forgot-password">{loginContent.forgotPassword}</Link>
            </p>
          </form>
        </div>

        <p className="my-5 text-center text-[14px] text-white">
          {loginContent.registerPrompt} <Link className="font-bold underline underline-offset-2" href="/register">{loginContent.register}</Link>
        </p>
        <StaffNotice message={loginContent.staffNotice} />
      </section>
    </main>
  );
}
