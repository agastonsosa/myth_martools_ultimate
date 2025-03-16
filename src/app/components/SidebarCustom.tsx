"use client";

import Link from "next/link";

const menuItems = [
  { text: "Dashboard", href: "/dashboard" },
  { text: "Analytics", href: "/analytics" },
  { text: "Campaigns", href: "/campaigns" },
];

export default function SidebarCustom() {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2">
      <h2 className="text-2xl font-bold text-center">MYT Tools</h2>
      <nav>
        {menuItems.map((item, index) => (
          <Link key={index} href={item.href} className="block py-2.5 px-4 rounded hover:bg-gray-700">
            {item.text}
          </Link>
        ))}
      </nav>
    </div>
  );
}
