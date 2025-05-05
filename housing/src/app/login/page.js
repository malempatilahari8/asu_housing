'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setError('');

    console.log('🚀 Sending login request:', { email, password });  // 🔥 Added debug log

    try {
      const loginRes = await fetch('http://localhost:4004/login/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginRes.json();

      console.log('✅ Login response:', loginData);  // 🔥 Debug backend response

      if (!loginRes.ok) {
        setError(loginData.message || 'Login failed.');
        return;
      }

      localStorage.setItem('currentUserEmail', email);
      router.push('/matches');

    } catch (err) {
      console.error(' Error in login request:', err);  
      setError('Something went wrong.');
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/loginimg.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative z-10">
        <header className="w-full bg-transparent text-white shadow-md h-16 flex items-center justify-between px-8">
          <div className="text-lg font-bold uppercase">UNINEST</div>
          <div className="flex space-x-6">
            <Link href="/home" className="text-sm font-bold hover:underline">Home</Link>
            <Link href="/signup" className="text-sm font-bold hover:underline">Sign Up</Link>
          </div>
        </header>

        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
          <div className="bg-white bg-opacity-95 p-8 rounded shadow-lg w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6 text-center text-black">Login</h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
                {error}
              </div>
            )}

            <label className="block text-sm font-medium text-black mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border-2 border-black mb-4 rounded text-black"
              placeholder="Enter your email"
            />

            <label className="block text-sm font-medium text-black mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border-2 border-black mb-4 rounded text-black"
              placeholder="Enter your password"
            />

            <button
              onClick={handleLogin}
              className="w-full bg-black text-white text-sm py-2 rounded hover:bg-gray-800 transition-all duration-200"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
