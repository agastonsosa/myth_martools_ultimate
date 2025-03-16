"use client";

export default function Topbar() {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between">
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Settings</button>
    </div>
  );
}

