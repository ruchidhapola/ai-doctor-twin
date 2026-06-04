"use client";

import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function HealthChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("healthReport");

    if (storedData) {
      const healthData = JSON.parse(storedData);

      setData([
        {
          metric: "BMI",
          value: healthData.bmi || 0,
        },
        {
          metric: "Glucose",
          value: healthData.glucose || 0,
        },
        {
          metric: "Cholesterol",
          value: healthData.cholesterol || 0,
        },
      ]);
    }
  }, []);

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6 text-sky-700">
        Health Metrics
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="metric" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}