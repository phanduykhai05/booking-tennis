
import { appLoadingContent } from "@/components/layouts/AppLoading/content";
import Spinner from "@/components/ui/Spinner";
import { shadow } from "@/components/ui/theme";

export default function AppLoading() {
  return (
    <div aria-label={appLoadingContent.label} className="flex-1 items-center justify-center bg-[#f5f6f5] px-6">
      <div className="items-center gap-4">
        <div className="h-20 w-20 items-center justify-center rounded-full bg-white" style={shadow.raised}>
          <div className="absolute inset-1 rounded-full border-[3px] border-[#d9f6e5]" />
          <Spinner color="#0f9b58" size="large" />
          <div className="absolute h-3 w-3 rounded-full bg-[#f4ca2d]" />
        </div>
        <span className="text-[15px] font-semibold text-[#28734d]">{appLoadingContent.label}</span>
      </div>
    </div>
  );
}
