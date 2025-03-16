"use client";

import SidebarCustom from "../components/SidebarCustom";
import Topbar from "../components/Topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SidebarCustom />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
