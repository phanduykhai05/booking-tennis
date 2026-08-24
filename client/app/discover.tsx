import DiscoverFeed from "@/components/discover/DiscoverFeed";
import type { DiscoverPost } from "@/components/discover/DiscoverFeed/types";
import { ErrorMessage, LoadingState } from "@/components/ui/Feedback";
import Screen from "@/components/ui/Screen";
import { getDiscoverPosts } from "@/lib/api/endpoints";
import { useAsync } from "@/lib/useAsync";

export default function DiscoverScreen() {
  const { data, errorMessage, isLoading } = useAsync<DiscoverPost[]>(
    () => getDiscoverPosts(),
    [],
    "Không tải được bài viết khám phá",
  );

  if (isLoading || !data) {
    return (
      <Screen backgroundColor="#f7f7f7">
        {errorMessage ? <ErrorMessage text={errorMessage} /> : <LoadingState label="Đang tải bài viết…" />}
      </Screen>
    );
  }

  return <DiscoverFeed posts={data} />;
}
