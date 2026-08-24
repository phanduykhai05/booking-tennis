import { Redirect } from "expo-router";

import { adminHomeHref } from "@/components/layouts/AdminShell/mockData";

export default function AdminIndexScreen() {
  return <Redirect href={adminHomeHref} />;
}
