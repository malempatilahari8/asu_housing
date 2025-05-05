'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ ASU-Themed Top Nav */}
      <header className="w-full bg-white shadow-md h-16 flex items-center justify-between px-8 border-b-4" style={{ borderColor: '#8C1D40' }}>
        {/* Left: HOUSING APP in all caps */}
        <div className="text-lg font-bold text-black uppercase">UNINEST</div>

        {/* Right: Login / Sign Up with hover effect */}
        <div className="flex space-x-6">
          <Link
            href="/login"
            className="text-sm text-black font-bold px-3 py-1 rounded hover:bg-white hover:shadow-md transition-all duration-200"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-sm text-black font-bold px-3 py-1 rounded hover:bg-white hover:shadow-md transition-all duration-200"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* ✅ Power BI Dashboard Section */}
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">
          Your Power BI Dashboard
        </h1>

        <div className="w-full h-[600px] rounded border overflow-hidden shadow-lg">
          <iframe
            title="Power BI Report"
            width="100%"
            height="100%"
            src="https://app.powerbi.com/reportEmbed?reportId=eafcd495-ae6d-4147-9c50-c1b763b8ead2&autoAuth=true&ctid=41f88ecb-ca63-404d-97dd-ab0a169fd138"
            frameBorder="0"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
