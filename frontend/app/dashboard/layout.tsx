import type React from "react";
import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AppHeader />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <AppFooter />
    </div>
  );
}
