'use client';
import Link from 'next/link';
import { motion } from 'framer-motion'; 

export default function IntroPage() {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('loginimg.jpg')" }}>
      {/* Overlay for darker effect */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center p-8 min-h-screen">

        {/* Navbar */}
        <header className="absolute top-0 left-0 w-full flex items-center justify-between p-6 bg-[#8c1d40] bg-opacity-90 text-white shadow-md">
          <div className="flex flex-col">
            <div className="text-2xl font-extrabold uppercase tracking-widest">UNINEST</div>
            <span className="text-xs italic tracking-wide">Your perfect housing match</span>
          </div>
          <div className="flex space-x-6">
            <Link href="/home" className="text-sm font-bold hover:underline">Home</Link>
            <Link href="/login" className="text-sm font-bold hover:underline">Login</Link>
            <Link href="/signup" className="text-sm font-bold hover:underline">Sign Up</Link>
          </div>
        </header>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-32"
        >
          <h1 className="text-5xl font-extrabold text-white mb-4 uppercase tracking-wide drop-shadow-lg">
            Your Campus Home Awaits
          </h1>
          <p className="text-lg text-gray-200 max-w-xl mx-auto mb-8 drop-shadow-md">
            Welcome to UniNest — helping ASU students find their perfect housing match. Easy, fast, and stress-free!
          </p>
          <div className="flex space-x-6 justify-center">
            {/* ✅ Redirects to project overview page */}
            <Link href="/projectoverview">
              <button className="bg-[#8c1d40] text-white px-6 py-2 rounded-full font-bold hover:bg-[#701634] hover:scale-105 transition-all duration-300">
                Get Started
              </button>
            </Link>
            <Link href="/login">
              <button className="border-2 border-white text-white px-6 py-2 rounded-full font-bold hover:bg-[#8c1d40] hover:border-[#8c1d40] hover:scale-105 transition-all duration-300">
                Login
              </button>
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
