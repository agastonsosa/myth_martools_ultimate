"use client";

import { Bell, User } from "lucide-react";

export default function Topbar() {
  return (
    <div className="bg-gray-800 text-white flex justify-between p-4">
      <h2 className="text-lg">Dashboard</h2>
      <div className="flex gap-4">
        <Bell className="w-6 h-6 cursor-pointer hover:text-gray-400" />
        <User className="w-6 h-6 cursor-pointer hover:text-gray-400" />
      </div>
    </div>
  );
}
