'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function FacilitiesPage() {
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();
  const email = typeof window !== 'undefined' ? localStorage.getItem('currentUserEmail') : '';

  const facilities = [
    'High speed internet',
    'Short-term lease availability',
    'Furnished rooms',
    'Parking space',
    'Utilities included in rent',
    'In-house laundry',
    'Valet trash',
    'Gym',
    'Study area',
    'Elevator',
  ];

  const handleCheckboxChange = (facility) => {
    if (selectedFacilities.includes(facility)) {
      setSelectedFacilities(selectedFacilities.filter((f) => f !== facility));
    } else {
      setSelectedFacilities([...selectedFacilities, facility]);
    }
  };

  const handleSubmit = async () => {
    setError('');
    if (selectedFacilities.length === 0) {
      setError('Please select at least one facility.');
      return;
    }

    try {
      const res = await fetch('http://localhost:4004/login/facilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, facilities: selectedFacilities }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to submit preferences.');
        return;
      }

      router.push('/matches');
    } catch (err) {
      console.error('Error submitting facilities:', err);
      setError('Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="w-full bg-[#8c1d40] text-white shadow-md h-16 flex items-center justify-between px-8">
        <div className="text-lg font-bold uppercase">UNINEST</div>
        <div className="flex space-x-6">
          <Link href="/home" className="text-sm font-bold hover:underline">Home</Link>
          <Link href="/login" className="text-sm font-bold hover:underline">Logout</Link>
        </div>
      </header>

      {/* Facilities Form */}
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-6 text-center text-black">Select Facilities</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-2 mb-4">
            {facilities.map((facility, idx) => (
              <label key={idx} className="flex items-center space-x-2 text-black">
                <input
                  type="checkbox"
                  checked={selectedFacilities.includes(facility)}
                  onChange={() => handleCheckboxChange(facility)}
                  className="accent-[#8c1d40]"
                />
                <span>{facility}</span>
              </label>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#8c1d40] text-white text-sm py-2 rounded hover:bg-[#701634] hover:scale-105 transition-all duration-200"
          >
            Submit Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
