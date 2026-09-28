import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

import DiscoverFeed from "@/components/discover/DiscoverFeed";
import { apiTypeToFilter, discoverContent, filterToApiType } from "@/components/discover/DiscoverFeed/content";
import type { DiscoverFilterId, DiscoverPost } from "@/components/discover/DiscoverFeed/types";
import { ErrorMessage } from "@/components/ui/Feedback";
import Screen from "@/components/ui/Screen";
import { getDiscoverPosts } from "@/lib/api/endpoints";
import { useAsync } from "@/lib/useAsync";

export default function DiscoverScreen() {
  const { type } = useLocalSearchParams<{ type?: string }>();
  const [activeFilter, setActiveFilter] = useState<DiscoverFilterId>(
    type ? (apiTypeToFilter[type] ?? "all") : "all",
  );

  const apiType = filterToApiType[activeFilter];
  const { data, errorMessage, isLoading } = useAsync<DiscoverPost[]>(
    () => getDiscoverPosts(apiType),
    [apiType],
    discoverContent.errorMessage,
  );

  if (errorMessage) {
    return (
      <Screen backgroundColor="#f7f7f7">
        <ErrorMessage text={errorMessage} />
      </Screen>
    );
  }

  return (
    <DiscoverFeed
      activeFilter={activeFilter}
      isLoading={isLoading}
      onFilterChange={setActiveFilter}
      posts={data ?? []}
    />
  );
}
