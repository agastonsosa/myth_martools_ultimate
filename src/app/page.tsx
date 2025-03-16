"use client";

import SidebarCustom from "./components/SidebarCustom";
import Topbar from "./components/Topbar";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SidebarCustom />

      {/* Main Content */}
      <div className="flex flex-col flex-1 bg-gray-100">
        <Topbar />

        {/* Dashboard Content */}
        <main className="p-6">
          <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
          <p className="text-gray-700 mt-2">This is a simple layout using Tailwind.</p>

          {/* Sample Grid for Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Widget 1</h2>
              <p>Example data</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Widget 2</h2>
              <p>Example data</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Widget 3</h2>
              <p>Example data</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
