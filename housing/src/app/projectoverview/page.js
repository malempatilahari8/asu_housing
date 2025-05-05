'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProjectOverview() {
  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('loginimg.jpg')" }}>
      {/* Overlay effect same as intro page */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content on top of overlay */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center p-8 min-h-screen">

        {/* Project Description Box */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-white bg-opacity-90 shadow-2xl rounded-2xl p-10 max-w-2xl"
        >
          <h1 className="text-3xl font-extrabold mb-6 text-gray-900 uppercase tracking-wide">🏠 Welcome to UNINEST</h1>
          
          <p className="text-gray-800 text-lg mb-6">
            Finding the perfect student housing can be overwhelming. UNINEST simplifies the process by matching you based on budget, location preferences, and facilities you care about.
            <br /><br />
            Through smart surveys, real-time matching, and Power BI dashboards, we make your housing search easier and more personalized!
          </p>

          <Link href="/signup">
            <button className="mt-6 px-6 py-3 bg-[#8C1D40] text-white text-lg font-semibold rounded-full hover:bg-[#701634] hover:scale-105 transition-all duration-300">
              Continue to Sign Up
            </button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
