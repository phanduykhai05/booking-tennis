import AuthenticatedHome from "@/components/home/AuthenticatedHome";
import type { Venue } from "@/components/home/NearbyVenues/types";
import type { SportCategory } from "@/components/home/SportCategories/types";
import { ErrorMessage, LoadingState } from "@/components/ui/Feedback";
import Screen from "@/components/ui/Screen";
import { getSports, getVenues } from "@/lib/api/endpoints";
import { useAsync } from "@/lib/useAsync";

type HomeData = { sports: SportCategory[]; venues: Venue[] };

export default function AuthenticatedHomeScreen() {
  const { data, errorMessage, isLoading } = useAsync<HomeData>(
    async () => {
      const [sports, venues] = await Promise.all([getSports(), getVenues()]);
      return { sports, venues };
    },
    [],
    "Không tải được danh sách sân",
  );

  if (isLoading || !data) {
    return (
      <Screen backgroundColor="#f5f6f5">
        {errorMessage ? <ErrorMessage text={errorMessage} /> : <LoadingState label="Đang tải danh sách sân…" />}
      </Screen>
    );
  }

  return <AuthenticatedHome sports={data.sports} venues={data.venues} />;
}
