'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [optIn, setOptIn] = useState(true); // ✅ NEW state for opt-in
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    setError('');
    setSuccess(false);

    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      console.log('🚀 Sending signup request:', { name, email, password, is_matched: optIn });

      const res = await fetch('http://localhost:4004/login/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, is_matched: optIn }),
      });

      const data = await res.json();
      console.log(' Signup response:', data);

      if (!res.ok) {
        setError(data.message || 'Signup failed.');
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        localStorage.setItem('currentUserEmail', email);
        router.push('/facilities');
      }, 2000);

    } catch (err) {
      console.error('Error in signup request:', err);
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
            <Link href="/login" className="text-sm font-bold hover:underline">Login</Link>
          </div>
        </header>

        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
          <div className="bg-white bg-opacity-95 p-8 rounded shadow-lg w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6 text-center text-black">Sign Up</h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-sm text-center">
                Signup successful! Redirecting...
              </div>
            )}

            <label className="block text-sm font-medium text-black mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border-2 border-black mb-4 rounded text-black"
              placeholder="Enter your name"
            />

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

            {/* ✅ Opt-In checkbox */}
            <label className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                checked={optIn}
                onChange={(e) => setOptIn(e.target.checked)}
                className="form-checkbox h-4 w-4 text-[#8C1D40]"
              />
              <span className="text-sm text-gray-800">
                I want to be matched with other students based on my preferences.
              </span>
            </label>

            <button
              onClick={handleSignup}
              className="w-full bg-black text-white text-sm py-2 rounded hover:bg-gray-800 transition-all duration-200">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
