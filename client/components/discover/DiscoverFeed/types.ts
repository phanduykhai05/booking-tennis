export type DiscoverFilterId = "all" | "course" | "events" | "member" | "offers" | "notifications";
export type DiscoverFilter = { id: DiscoverFilterId; label: string };
export type DiscoverPost = { date: string; id: string; labels: string[]; type: "course" | "empty-court" | "event" | "member" | "offer"; venue: string };
