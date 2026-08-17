type StaffNoticeProps = {
  message: string;
};

export default function StaffNotice({ message }: StaffNoticeProps) {
  return (
    <aside className="relative overflow-hidden rounded-[6px] bg-white px-5 py-5 text-center text-sm leading-7 text-[#d89100] shadow-[inset_0_0_0_1px_#e7ad16]">
      <span aria-hidden="true" className="absolute -left-7 -top-7 h-16 w-24 rotate-[-30deg] bg-[#edac1a]" />
      <span aria-hidden="true" className="absolute -bottom-8 -right-7 h-16 w-24 rotate-[-30deg] bg-[#edac1a]" />
      <span className="relative underline decoration-1 underline-offset-2">{message}</span>
    </aside>
  );
}
