import AuthenticatedHome from "@/components/home/AuthenticatedHome";
import { getSports, getVenues } from "@/lib/api/endpoints";

export default async function AuthenticatedHomePage() {
  const [sports, venues] = await Promise.all([getSports(), getVenues()]);

  return <AuthenticatedHome sports={sports} venues={venues} />;
}
