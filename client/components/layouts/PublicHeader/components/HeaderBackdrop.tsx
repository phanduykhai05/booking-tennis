
import images from "@/components/assets/images";

/** Nền header: dải xanh chéo, tranh vận động viên làm vân mờ và hai quầng sáng ở hai góc. */
export default function HeaderBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "linear-gradient(135deg, #18b667 0%, #0f9b58 46%, #097a4f 100%)" }}
      />
      <img alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.22]" src={images.homeHeader} />
      <div className="absolute -right-24 -top-40 h-[420px] w-[420px] rounded-full bg-[#d4f78c]/15" />
      <div className="absolute -bottom-40 -left-28 h-[420px] w-[420px] rounded-full bg-[#02452f]/20" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/25" />
    </div>
  );
}
