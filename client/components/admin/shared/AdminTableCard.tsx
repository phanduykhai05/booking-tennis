import type { ReactNode } from "react";

import Card from "@/components/ui/Card";

type AdminTableCardProps = {
  children: ReactNode;
  description?: string;
  title: string;
  toolbar?: ReactNode;
};

export default function AdminTableCard({ children, description, title, toolbar }: AdminTableCardProps) {
  return (
    <Card description={description} extra={toolbar} noBodyPadding title={title}>
      {children}
    </Card>
  );
}
