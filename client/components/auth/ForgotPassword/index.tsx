"use client";

import { ArrowLeft, CircleX } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import styles from "@/components/auth/AuthPageAnimation.module.scss";
import LookupMethodSelector from "@/components/auth/ForgotPassword/components/LookupMethodSelector";
import SupportActions from "@/components/auth/ForgotPassword/components/SupportActions";
import { forgotPasswordContent } from "@/components/auth/ForgotPassword/content";
import type { AccountLookupMethod } from "@/components/auth/ForgotPassword/types";
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
    <main className="relative flex min-h-[100dvh] items-start justify-center overflow-x-hidden overflow-y-auto bg-[#087640] px-3 pb-[max(18px,env(safe-area-inset-bottom))] pt-[max(6px,env(safe-area-inset-top))] sm:p-8">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_50%_13%,#42af67_0%,#218d4c_38%,#087640_76%,#08713e_100%)]" />
      <div className="fixed inset-0 opacity-25 [background-image:repeating-linear-gradient(174deg,transparent_0,transparent_3px,rgba(255,255,255,0.24)_4px,transparent_5px)]" />
      <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full border-[50px] border-[#139253]/65" />
      <div className="absolute -bottom-36 -right-20 h-72 w-72 rounded-full border-[45px] border-[#188a4e]/60" />

      <section aria-labelledby="forgot-password-title" className={`relative w-full max-w-[364px] pb-3 ${styles.pageEnter}`}>
        <header className="relative flex h-[188px] items-start justify-center pt-3 text-white">
          <Link aria-label="Quay lại trang đăng nhập" className="absolute left-0 top-2 rounded p-1 transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" href="/login">
            <ArrowLeft aria-hidden="true" size={22} strokeWidth={2.5} />
          </Link>
          <h1 className="text-[17px] font-bold" id="forgot-password-title">{forgotPasswordContent.title}</h1>
        </header>

        <form className={`rounded-[9px] bg-white px-4 pb-4 pt-4 shadow-[0_12px_30px_rgba(0,64,36,0.14)] sm:px-[18px] ${styles.formEnter}`} onSubmit={(event) => { event.preventDefault(); void submit(); }}>
          <p className="text-sm leading-5 text-[#064b30]">{forgotPasswordContent.description}</p>
          <div className="mt-4 space-y-7">
            <LookupMethodSelector activeMethod={method} emailLabel={forgotPasswordContent.email} onSelect={selectMethod} phoneLabel={forgotPasswordContent.phone} title={forgotPasswordContent.lookupTitle} />
            <label className="block" key={method}>
              <span className="mb-2.5 block text-[16px] font-bold text-[#034f30]">{fieldLabel}</span>
              <span className="relative block">
                <input autoComplete={isEmailLookup ? "email" : "tel-national"} className="h-12 w-full rounded-md border border-[#d6d6d6] bg-white px-3 pr-11 text-sm text-[#25352f] outline-none transition placeholder:text-[#777] focus:border-[#087b49] focus:ring-2 focus:ring-[#087b49]/15" inputMode={isEmailLookup ? "email" : "tel"} onChange={(event) => setValue(event.target.value)} placeholder={fieldPlaceholder} required type={isEmailLookup ? "email" : "tel"} value={value} />
                {value && <button aria-label={`Xóa ${fieldLabel}`} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#007b49]" onClick={() => setValue("")} type="button"><CircleX aria-hidden="true" size={18} strokeWidth={2.8} /></button>}
              </span>
            </label>
          </div>
          {errorMessage && <p className="mt-6 rounded-md bg-[#fdecec] px-3 py-2 text-[13px] font-medium text-[#b3261e]" role="alert">{errorMessage}</p>}
          {sentCode && <p className="mt-6 rounded-md bg-[#e6f8ee] px-3 py-2 text-[13px] font-medium text-[#0b5133]" role="status">{forgotPasswordContent.codeSent} <b>{sentCode}</b></p>}
          <button className="mt-10 h-11 w-full rounded bg-[#087a46] text-sm font-bold text-white transition hover:bg-[#056b3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087a46] focus-visible:ring-offset-2 disabled:bg-[#8fb9a2]" disabled={isSubmitting} type="submit">{forgotPasswordContent.continue}</button>
        </form>

        <aside className="mt-11 text-sm leading-5 text-white">
          <p>{forgotPasswordContent.supportDescription}</p>
          <SupportActions fanpageLabel={forgotPasswordContent.fanpage} zaloLabel={forgotPasswordContent.zalo} />
        </aside>
      </section>
    </main>
  );
}
