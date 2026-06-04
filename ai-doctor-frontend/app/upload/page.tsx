
"use client";

import { useState } from "react";
import {
  HeartIcon,
  BeakerIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export default function UploadPage() {
  const [success, setSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const uploadReport = async () => {
  if (!selectedFile) return;

  setLoading(true);

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/upload-report",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    setReportData(data);
    setSuccess(true);

    localStorage.setItem(
      "healthReport",
      JSON.stringify(data.health_data)
    );
  } catch (error) {
    console.error("Upload failed:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="text-center">

          <h1 className="text-6xl font-bold text-sky-700">
            AI Digital Doctor
          </h1>

          <p className="text-slate-500 mt-4 text-lg">
            Upload medical reports and receive AI-powered health insights.
          </p>

        </div>

        {/* Upload Card */}
        <div className="mt-12 bg-white rounded-3xl shadow-xl p-8 border border-slate-100">

          <h2 className="text-2xl font-semibold mb-4">
            Upload Medical Report
          </h2>

          <input
            type="file"
            className="w-full border rounded-xl p-3"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setSelectedFile(e.target.files[0]);
              }
            }}
          />

          <button
          onClick={uploadReport}
          disabled={loading}
          className="mt-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:opacity-70 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
          >
          {loading ? "Analyzing..." : "Analyze Report"}
          </button>
        </div>

        {reportData && (
          <>
            {/* Metric Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-10">

              <div className="bg-white rounded-3xl shadow-lg p-6">
                <HeartIcon className="w-10 h-10 text-red-500 mb-3" />
                <h3 className="text-slate-500">BMI</h3>
                <p className="text-4xl font-bold">
                  {reportData.health_data.bmi}
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-lg p-6">
                <BeakerIcon className="w-10 h-10 text-blue-500 mb-3" />
                <h3 className="text-slate-500">Glucose</h3>
                <p className="text-4xl font-bold">
                  {reportData.health_data.glucose}
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-lg p-6">
                <ChartBarIcon className="w-10 h-10 text-green-500 mb-3" />
                <h3 className="text-slate-500">Risk Score</h3>
                <p className="mt-2 text-lg font-semibold">
                  {reportData.risk_prediction.status}
                </p>
              </div>

            </div>

            {/* Report Details */}
            <div className="mt-10 bg-white rounded-3xl shadow-lg p-8">

              <h2 className="text-2xl font-bold mb-6">
                Health Report Overview
              </h2>

              <div className="grid md:grid-cols-2 gap-4 text-slate-700">

                <p><strong>Age:</strong> {reportData.health_data.age}</p>

                <p><strong>BMI:</strong> {reportData.health_data.bmi}</p>

                <p>
                  <strong>Blood Pressure:</strong>{" "}
                  {reportData.health_data.blood_pressure_systolic}/
                  {reportData.health_data.blood_pressure_diastolic}
                </p>

                <p>
                  <strong>Glucose:</strong>{" "}
                  {reportData.health_data.glucose}
                </p>

                <p>
                  <strong>HbA1c:</strong>{" "}
                  {reportData.health_data.hba1c}
                </p>

                <p>
                  <strong>Cholesterol:</strong>{" "}
                  {reportData.health_data.cholesterol}
                </p>

              </div>
            </div>

            {/* AI Summary */}
            <div className="mt-10 bg-gradient-to-r from-sky-600 to-cyan-500 text-white rounded-3xl shadow-xl p-8">

              <h2 className="text-3xl font-bold mb-4">
                <p className="text-lg leading-relaxed">
                    {reportData.summary}
                  </p>
              </h2>

            </div>
            <div className="mt-8 text-center">
                <a
                   href="http://127.0.0.1:8000/download-report"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
                      >
                        📄 Download Health Report
                  </a>
                </div>
          </>
        )}
      </div>
    </div>
  );
}