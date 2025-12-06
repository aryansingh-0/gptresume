"use client"

import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { useAuth } from '@/lib/auth'
import toast from 'react-hot-toast'

function VerifyEmailPage() {
  const { token } = useParams()
  const router = useRouter()
  const [status, setStatus] = useState("loading") // loading | success | error
  const [message, setMessage] = useState("Verifying your email...")
  const { verifyEmail } = useAuth()

  useEffect(() => {
    const doVerify = async () => {
      try {
        const res = await verifyEmail(token)
        setMessage(res.message || "Email verified successfully")
        setStatus("success")
        toast.success(res.message || "Email verified successfully")

        // Redirect after 2 seconds
        setTimeout(() => {
          router.push("/protected/dashboard")
        }, 2000)
      } catch (err) {
        setMessage(err.message || "Verification failed")
        setStatus("error")
        toast.error(err.message || "Verification failed")
      }
    }

    if (token) doVerify()
  }, [token, verifyEmail, router])

  const renderIcon = () => {
    if (status === "success") return <CheckCircle className="w-6 h-6 text-green-600 inline-block mr-2" />
    if (status === "error") return <XCircle className="w-6 h-6 text-red-600 inline-block mr-2" />
    return <Loader2 className="w-6 h-6 text-gray-600 animate-spin inline-block mr-2" />
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="p-6 rounded-xl shadow-md bg-white dark:bg-gray-800 text-center">
        <h2 className="text-xl font-bold mb-4">Email Verification</h2>
        <p className={`text-lg ${status === "success" ? "text-green-600" : status === "error" ? "text-red-600" : "text-gray-600"}`}>
          {renderIcon()}
          {message}
        </p>
      </div>
    </div>
  )
}

export default VerifyEmailPage
