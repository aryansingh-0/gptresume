'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useAuth } from '@/lib/auth'
import { Loader2 } from 'lucide-react'
import BackgroundImage from '@/components/BackgroundImage'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { forgot } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email')
      return
    }

    setLoading(true)
    try {
      await forgot(email)
      toast.success('Password reset email sent! Check your inbox.')
      router.push('/auth/login') // redirect to login page after sending reset link
    } catch (error) {
      console.error('Forgot password error:', error)
      toast.error(error?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4">
      <BackgroundImage />
      <div className="max-w-md w-full">
        {/* Logo + Heading */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">G</span>
            </div>
            <span className="text-2xl font-bold text-foreground">GptResume</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Forgot Password</h1>
          <p className="mt-2 text-muted-foreground text-sm">
            Enter your email address and we’ll send you a reset link.
          </p>
        </div>

        {/* Forgot Password Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-card rounded-xl shadow p-6 space-y-4"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full input"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary flex items-center justify-center"
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Send Reset Link
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center mt-6 text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link
            href="/auth/signup"
            className="text-primary hover:text-primary/80 hover:underline font-medium"
          >
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  )
}
