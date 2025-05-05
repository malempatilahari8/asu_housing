'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem('currentUserEmail');
    if (!email) {
      router.push('/login');  // 🔒 Redirect if not logged in
      return;
    }

    const fetchMatches = async () => {
      try {
        const res = await fetch('http://localhost:4004/login/matches', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || 'Failed to fetch matches.');
          return;
        }
        setMatches(data.matches || []);
      } catch (err) {
        console.error('Error fetching matches:', err);
        setError('Something went wrong.');
      }
    };

    fetchMatches();
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="w-full bg-[#8c1d40] text-white shadow-md h-16 flex items-center justify-between px-8">
        <div className="text-lg font-bold uppercase">UNINEST</div>
        <div className="flex space-x-6">
          <Link href="/home" className="text-sm font-bold hover:underline">Home</Link>
          <button onClick={handleLogout} className="text-sm font-bold hover:underline">
            Logout
          </button>
        </div>
      </header>

      {/* Matches Table */}
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
          <h2 className="text-xl font-bold mb-6 text-center text-black">Matched Users</h2>

          {error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
              {error}
            </div>
          ) : matches.length === 0 ? (
            <p className="text-center text-black">No matches found.</p>
          ) : (
            <table className="w-full border border-gray-300 text-black">
              <thead>
                <tr className="bg-[#8c1d40] text-white">
                  <th className="border px-4 py-2 text-left">Name</th>
                  <th className="border px-4 py-2 text-left">Email</th>
                  <th className="border px-4 py-2 text-center">Shared Facilities</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((match, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{match.name}</td>
                    <td className="border px-4 py-2">{match.email}</td>
                    <td className="border px-4 py-2 text-center">{match.shared_facilities}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
