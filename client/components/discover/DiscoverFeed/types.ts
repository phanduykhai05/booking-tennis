export type DiscoverFilter = { id: "all" | "course" | "events" | "member" | "offers" | "notifications"; label: string };
export type DiscoverPost = { date: string; id: string; labels: string[]; type: "course" | "empty-court" | "event" | "member" | "offer"; venue: string };
