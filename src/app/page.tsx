"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchSnowplowMetrics } from "../store/slices/snowplowSlice"
import SidebarCustom from "./components/SidebarCustom";
import Topbar from "./components/Topbar";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { metrics, loading, error } = useSelector((state: RootState) => state.snowplow);

  useEffect(() => {
    dispatch(fetchSnowplowMetrics());
  }, [dispatch]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SidebarCustom />

      {/* Main Content */}
      <div className="flex flex-col flex-1 bg-gray-100">
        {/* Topbar */}
        <Topbar />

        {/* Dashboard Content */}
        <main className="p-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {loading && <p>Loading metrics...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-white p-4 shadow rounded-lg">
                  <h2 className="text-lg font-semibold">{metric.schemaKey}</h2>
                  <p>{metric.metrics.reduce((sum, m) => sum + m.count, 0)}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
