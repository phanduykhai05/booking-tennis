import { lazy } from "react";
import { createBrowserRouter } from "react-router";

import RootLayout from "@/app/_layout";

// Mỗi trang là một chunk riêng: khách không phải tải code khu quản trị.
const page = (load: () => Promise<{ default: React.ComponentType }>) => {
  const Page = lazy(load);
  return <Page />;
};

export const router = createBrowserRouter([
  {
    children: [
      { element: page(() => import("@/app/index")), index: true },
      { element: page(() => import("@/app/home")), path: "home" },
      { element: page(() => import("@/app/login")), path: "login" },
      { element: page(() => import("@/app/register")), path: "register" },
      { element: page(() => import("@/app/forgot-password")), path: "forgot-password" },
      { element: page(() => import("@/app/onboarding")), path: "onboarding" },
      { element: page(() => import("@/app/map")), path: "map" },
      { element: page(() => import("@/app/discover")), path: "discover" },
      { element: page(() => import("@/app/popular")), path: "popular" },
      { element: page(() => import("@/app/notifications")), path: "notifications" },
      { element: page(() => import("@/app/bookings")), path: "bookings" },
      { element: page(() => import("@/app/account/index")), path: "account" },
      { element: page(() => import("@/app/account/payments")), path: "account/payments" },
      { element: page(() => import("@/app/account/profile")), path: "account/profile" },
      { element: page(() => import("@/app/account/tickets")), path: "account/tickets" },
      { element: page(() => import("@/app/product/[slug]/index")), path: "product/:slug" },
      { element: page(() => import("@/app/product/[slug]/schedule")), path: "product/:slug/schedule" },
      {
        children: [
          { element: page(() => import("@/app/admin/index")), index: true },
          { element: page(() => import("@/app/admin/dashboard")), path: "dashboard" },
          { element: page(() => import("@/app/admin/bookings")), path: "bookings" },
          { element: page(() => import("@/app/admin/courts")), path: "courts" },
          { element: page(() => import("@/app/admin/customers")), path: "customers" },
          { element: page(() => import("@/app/admin/events")), path: "events" },
          { element: page(() => import("@/app/admin/payments")), path: "payments" },
        ],
        element: page(() => import("@/app/admin/_layout")),
        path: "admin",
      },
      { element: page(() => import("@/app/not-found")), path: "*" },
    ],
    element: <RootLayout />,
  },
]);
