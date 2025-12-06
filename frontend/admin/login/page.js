'use client'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const res = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (res.ok) {
      toast.success('Login successful');
      window.location.href = '/admin/dashboard';

    }
    else setError('Invalid login');
  };

  return (
    <div className="min-h-screen flex  justify-center w-full">
      <form
        onSubmit={handleLogin}
        className="bg-white h-fit shadow-md rounded-lg p-8 w-full max-w-sm"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Admin Login
        </h1>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <input
          name="username"
          placeholder="Username"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}
