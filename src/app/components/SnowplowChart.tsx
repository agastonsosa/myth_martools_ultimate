"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchMetricsStart, fetchMetricsError, fetchMetricsSuccess } from "@/store/slices/dashboardSlice";
import { Line } from "react-chartjs-2";

export default function SnowplowChart() {
  const dispatch = useDispatch<AppDispatch>();
  const { metrics, loading, error } = useSelector((state: RootState) => state.snowplow);

  useEffect(() => {
    const fetchMetrics = async () => {
      dispatch(fetchMetricsStart());

      try {
        const response = await fetch("/api/snowplow-metrics");
        if (!response.ok) throw new Error("Failed to fetch Snowplow metrics");

        const data = await response.json();
        dispatch(fetchMetricsSuccess(data));
      } catch (err) {
        dispatch(fetchMetricsError(`Error loading Snowplow metrics: ${err}`));
      }
    };

    fetchMetrics();
  }, [dispatch]);

  const chartData = {
    labels: metrics.map((entry) => entry.errorId.split("T")[0] || "Unknown"),
    datasets: [
      {
        label: "Failed Events",
        data: metrics.map((entry) => entry.metrics),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full max-w-max mx-auto">
      <h2 className="text-xl font-semibold mb-4">Snowplow Bad Events</h2>
      {loading ? (
        <p>Loading Metrics...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Line data={chartData} options={{ responsive: true }} />
      )}
    </div>
  );
}
