type LanguageSelectorProps = {
  label: string;
};

function VietnamFlag() {
  return (
    <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 20 20">
      <rect fill="#da251d" height="20" width="20" />
      <path d="M10 3 11.57 7.84 16.66 7.84 12.54 10.83 14.12 15.66 10 12.67 5.89 15.66 7.46 10.83 3.34 7.84 8.43 7.84Z" fill="#ffde00" />
    </svg>
  );
}

export default function LanguageSelector({ label }: LanguageSelectorProps) {
  return (
    <button
      aria-label={label}
      className="size-6 shrink-0 overflow-hidden rounded-full shadow-[0_2px_6px_rgba(3,52,32,0.45)] ring-1 ring-white/60 transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
      type="button"
    >
      <VietnamFlag />
    </button>
  );
}
