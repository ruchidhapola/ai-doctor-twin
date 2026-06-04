import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50">

      <div className="max-w-6xl mx-auto px-6 py-24">

        <div className="text-center">

          <h1 className="text-6xl md:text-7xl font-bold text-sky-700">
            AI Digital Doctor Twin
          </h1>

          <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto">
            Upload medical reports, analyze health risks,
            visualize key metrics, and chat with an AI-powered
            health assistant.
          </p>

          <div className="mt-10 flex justify-center gap-4">

            <Link
              href="/upload"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg"
            >
              Upload Report
            </Link>

            <Link
              href="/dashboard"
              className="bg-white border border-slate-200 hover:border-sky-300 px-8 py-4 rounded-2xl font-semibold shadow-sm"
            >
              View Dashboard
            </Link>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-24">

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h3 className="text-2xl font-bold text-sky-700 mb-3">
              📄 Smart Report Analysis
            </h3>
            <p className="text-slate-600">
              Extract health indicators from uploaded medical reports automatically.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h3 className="text-2xl font-bold text-sky-700 mb-3">
              📊 Risk Prediction
            </h3>
            <p className="text-slate-600">
              Assess health risks using BMI, glucose, blood pressure, and more.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h3 className="text-2xl font-bold text-sky-700 mb-3">
              🤖 AI Doctor Chat
            </h3>
            <p className="text-slate-600">
              Ask questions about your uploaded report and receive AI-powered insights.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}