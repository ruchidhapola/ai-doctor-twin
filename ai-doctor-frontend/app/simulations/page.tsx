"use client";

import { useEffect, useState } from "react";

export default function Simulations() {
  const [healthData, setHealthData] = useState<any>(null);

  const [steps, setSteps] = useState(5000);
  const [weightLoss, setWeightLoss] = useState(0);

  const [result, setResult] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("healthReport");

    if (storedData) {
      setHealthData(JSON.parse(storedData));
    }
  }, []);

  const simulate = () => {
    if (!healthData) return;

    const currentBMI = Number(healthData.bmi || 25);

    const simulatedBMI = Math.max(
      18,
      currentBMI - weightLoss * 0.4
    );

    let risk = "🟢 Low Risk";

    if (
      simulatedBMI > 30 ||
      healthData.glucose > 125
    ) {
      risk = "🔴 High Risk";
    } else if (
      simulatedBMI > 25 ||
      healthData.glucose > 100
    ) {
      risk = "🟡 Moderate Risk";
    }

    let improvement = 10;

    if (steps >= 10000) {
      improvement = 25;
    }

    setResult(`
Current BMI: ${currentBMI}

Predicted BMI: ${simulatedBMI.toFixed(1)}

Daily Steps: ${steps}

Estimated Risk Reduction: ${improvement}%

Risk Level: ${risk}
`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-10">

      <h1 className="text-5xl font-bold text-sky-700 mb-8">
        Digital Health Twin Simulation
      </h1>

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <div className="mb-6">

          <label className="block font-semibold mb-2">
            Daily Steps
          </label>

          <input
            type="number"
            value={steps}
            onChange={(e) =>
              setSteps(Number(e.target.value))
            }
            className="border rounded-xl p-3 w-full"
          />

        </div>

        <div className="mb-6">

          <label className="block font-semibold mb-2">
            Weight Loss (kg)
          </label>

          <input
            type="number"
            value={weightLoss}
            onChange={(e) =>
              setWeightLoss(Number(e.target.value))
            }
            className="border rounded-xl p-3 w-full"
          />

        </div>

        <button
          onClick={simulate}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Run Simulation
        </button>

        {result && (
          <div className="mt-8 bg-sky-50 rounded-2xl p-6 whitespace-pre-line">

            <h2 className="text-2xl font-bold mb-4">
              Simulation Result
            </h2>

            <p>{result}</p>

          </div>
        )}

      </div>

    </div>
  );
}