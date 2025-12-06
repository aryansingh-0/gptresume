// 

'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useAuth } from '@/lib/auth'
import { Loader2 } from 'lucide-react'
import BackgroundImage from '@/components/BackgroundImage'

export default function ResetPasswordPage({params}) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { reset_password } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Extract token from URL (example: /auth/reset-password/[token])
  const {token} = params;

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!password || !confirmPassword) {
      toast.error('Please fill in all fields')
      return
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      await reset_password(token, password)
      toast.success('Password reset successful! Please login.')
      router.push('/auth/login')
    } catch (error) {
      console.error('Reset password error:', error)
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
              <span className="text-primary-foreground font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-bold text-foreground">TailorMe</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Reset Password</h1>
          <p className="mt-2 text-muted-foreground text-sm">
            Enter your new password below.
          </p>
        </div>

        {/* Reset Password Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-card rounded-xl shadow p-6 space-y-4"
        >
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full input"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
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
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}
