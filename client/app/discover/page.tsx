import DiscoverFeed from "@/components/discover/DiscoverFeed";
import { getDiscoverPosts } from "@/lib/api/endpoints";

export default async function DiscoverPage() {
  const posts = await getDiscoverPosts();

  return <DiscoverFeed posts={posts} />;
}
