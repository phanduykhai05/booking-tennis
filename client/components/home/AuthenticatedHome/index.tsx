"use client";

import AuthenticatedHomeHeader from "@/components/home/AuthenticatedHome/components/AuthenticatedHomeHeader";
import { authenticatedHomeContent } from "@/components/home/AuthenticatedHome/mockData";
import VenueFilterContent from "@/components/home/VenueFilterContent";
import PublicFooter from "@/components/layouts/PublicFooter";

export default function AuthenticatedHome() {
  return <div className="min-h-[100dvh] bg-[#f5f6f5] pb-24"><AuthenticatedHomeHeader {...authenticatedHomeContent} /><main><VenueFilterContent showPromotion /></main><PublicFooter activeItemId="home" /></div>;
}
