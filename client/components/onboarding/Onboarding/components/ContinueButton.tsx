type ContinueButtonProps = {
  label: string;
  onClick: () => void;
};

export default function ContinueButton({ label, onClick }: ContinueButtonProps) {
  return (
    <div className="border-t border-slate-100 px-4 pb-6 pt-4">
      <button
        className="w-full rounded-full bg-emerald-800 py-3.5 text-base font-semibold text-white transition-colors hover:bg-emerald-900 active:scale-[0.99]"
        onClick={onClick}
        type="button"
      >
        {label}
      </button>
    </div>
  );
}
