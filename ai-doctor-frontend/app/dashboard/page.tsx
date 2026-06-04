"use client";

import { useEffect, useState } from "react";
import HealthChart from "../components/HealthChart";
import HealthCard from "../components/HealthCard";

export default function Dashboard() {
  const [healthData, setHealthData] = useState<any>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("healthReport");

    if (storedData) {
      setHealthData(JSON.parse(storedData));
    }
  }, []);

  if (!healthData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-slate-500">
          Upload a medical report first
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-8">

      <h1 className="text-5xl font-bold text-sky-700 mb-10">
        Health Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <HealthCard
          title="BMI"
          value={healthData.bmi || "N/A"}
        />

        <HealthCard
          title="Glucose"
          value={healthData.glucose || "N/A"}
        />

        <HealthCard
          title="Cholesterol"
          value={healthData.cholesterol || "N/A"}
        />

      </div>

      <div className="mt-10">
        <HealthChart />
      </div>

      <div className="mt-10 bg-white p-8 rounded-3xl shadow-lg">

        <h2 className="text-3xl font-bold mb-6 text-sky-700">
          Digital Health Twin
        </h2>

        <div className="grid md:grid-cols-2 gap-6 text-slate-700">

          <div>
            <p><strong>Age:</strong> {healthData.age}</p>
            <p><strong>BMI:</strong> {healthData.bmi}</p>
            <p><strong>Glucose:</strong> {healthData.glucose}</p>
          </div>

          <div>
            <p>
              <strong>Blood Pressure:</strong>{" "}
              {healthData.blood_pressure_systolic}/
              {healthData.blood_pressure_diastolic}
            </p>

            <p>
              <strong>HbA1c:</strong> {healthData.hba1c}
            </p>

            <p>
              <strong>Cholesterol:</strong> {healthData.cholesterol}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}