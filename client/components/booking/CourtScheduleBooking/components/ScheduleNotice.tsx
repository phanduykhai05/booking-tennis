type ScheduleNoticeProps = {
  hotline: string;
  prefix: string;
  suffix: string;
  text: string;
};

export default function ScheduleNotice({ hotline, prefix, suffix, text }: ScheduleNoticeProps) {
  return (
    <span className="bg-[#f0fbf4] px-3 py-2 text-[13px] leading-5 text-[#f26522]">
      <span className="font-bold">{prefix}</span> {text}{" "}
      <a className="font-bold underline" href={`tel:${hotline.replace(/\D/g, "")}`}>
        {hotline}
      </a>{" "}
      {suffix}
    </span>
  );
}
