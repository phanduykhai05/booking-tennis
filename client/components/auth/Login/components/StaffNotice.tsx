type StaffNoticeProps = {
  message: string;
};

export default function StaffNotice({ message }: StaffNoticeProps) {
  return (
    <div className="overflow-hidden rounded-[6px] border border-[#e7ad16] bg-white px-5 py-5">
      {/* Hai vệt vàng chéo ở hai góc đối nhau, giữ lại nét trang trí của bản web. */}
      <div className="absolute -left-7 -top-7 h-16 w-24 bg-[#edac1a]" style={{ transform: "rotate(-30deg)" }} />
      <div className="absolute -bottom-8 -right-7 h-16 w-24 bg-[#edac1a]" style={{ transform: "rotate(-30deg)" }} />
      <span className="text-center text-[14px] leading-7 text-[#d89100] underline">{message}</span>
    </div>
  );
}
