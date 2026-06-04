import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-sky-700 to-cyan-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <h1 className="text-2xl font-bold">
          🩺 AI Digital Doctor
        </h1>

        <div className="flex gap-8 font-medium">

          <Link href="/dashboard" className="hover:text-cyan-200">
            Dashboard
          </Link>

          <Link href="/upload" className="hover:text-cyan-200">
            Upload Report
          </Link>

          <Link href="/health-twin" className="hover:text-cyan-200">
            Health Twin
          </Link>

          <Link href="/ai-chat" className="hover:text-cyan-200">
            AI Chat
          </Link>

          <Link href="/simulations" className="hover:text-cyan-200">
            Simulations
          </Link>

        </div>
      </div>
    </nav>
  );
}