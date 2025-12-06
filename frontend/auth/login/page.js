'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAuth } from '@/lib/auth';
import { Loader2 } from 'lucide-react'; // Using Loader2 from lucide-react for consistency
import BackgroundImage from '@/components/BackgroundImage';
export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();
 

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      toast.success('Welcome back!');
      router.push('/protected/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
 

  return (
   <div className="min-h-screen relative  flex items-center justify-center py-12 px-4">
  <BackgroundImage/>
  <div className="max-w-md w-full">
    {/* Logo + Heading */}
    <div className="text-center mb-8">
      <Link href="/" className="flex items-center justify-center gap-2 mb-6">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-xl">G</span>
        </div>
        <span  className="text-2xl font-bold text-foreground">GptResume</span>
      </Link>
      <h1   className="text-3xl font-bold text-foreground">Welcome back</h1>
       
    </div>

    {/* Login Card */}
    <div className="card p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
            placeholder="you@company.com"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            placeholder="••••••••"
            required
          />
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center text-sm text-muted-foreground cursor-pointer">
            <input type="checkbox" className="checkbox" />
            <span className="ml-2">Remember me</span>
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-primary hover:text-primary/80 hover:underline  text-sm font-medium"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="animate-spin w-4 h-4" />}
          Sign In
        </button>
      </form>
    </div>

    {/* Signup Link */}
    <p className="text-center mt-6 text-muted-foreground">
      Don&apos;t have an account?{" "}
      <Link href="/auth/signup" className="text-primary hover:text-primary/80 hover:underline font-medium">
        Sign up for free
      </Link>
    </p>
  </div>
</div>

  );
}