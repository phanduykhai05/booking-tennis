import { Navigate } from "react-router";

import { adminHomeHref } from "@/components/layouts/AdminShell/mockData";

export default function AdminIndexScreen() {
  return <Navigate replace to={adminHomeHref} />;
}
