function VietnamFlag() {
  return (
    <span
      aria-label="Tiếng Việt"
      className="flex size-6 items-center justify-center rounded-full bg-[#da251d] text-[13px] leading-none text-[#ffde00]"
      role="img"
    >
      ★
    </span>
  );
}

export default function LanguageSelector() {
  return (
    <button
      aria-label="Chọn ngôn ngữ"
      className="flex items-center gap-2 rounded-full transition-opacity hover:opacity-80"
      type="button"
    >
      <VietnamFlag />
      <svg aria-hidden="true" className="size-3 fill-white" viewBox="0 0 12 8">
        <path
          d="m1 1 5 5 5-5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
}
