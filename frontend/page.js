'use client'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import BackgroundImage from '@/components/BackgroundImage'
import Review from '@/components/review/Review'
import Faq from '@/components/Faq'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 relative pb-16 px-4">
        <BackgroundImage />
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            GPT Resume
            <span className="block -mt-3">AI Resume Tailoring Platform</span>
          </h1>
          <p className="text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Build a job-winning resume with GPT Resume — the AI-powered platform that customizes your resume, cover letter, and interview answers to perfectly match any job description.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/protected/resume/builder" className="btn btn-primary text-lg px-8 py-4">
              Create Your Resume
            </Link>
            <Link href="/auth/signup" className="btn btn-outline text-lg px-8 py-4">
              Signup For Free
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Professionals Choose GPT Resume
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Smart Resume Tailoring by GPT
              </h3>
              <p className="leading-relaxed">
                GPT Resume analyzes your job description and automatically rewrites your resume to fit the exact skills, tone, and keywords recruiters expect — making it 100% ATS-friendly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                AI Cover Letter Generator
              </h3>
              <p className="leading-relaxed">
                Instantly generate personalized cover letters through GPT Resume that reflect your experience and the company’s goals — saving hours of writing and editing.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                AI Interview Assistant
              </h3>
              <p className="leading-relaxed">
                Prepare confidently with GPT Resume’s interview Q&A generator. Get smart, personalized answers based on your resume and the job you’re applying for.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Review />

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Build Your GPT Resume?
          </h2>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            Join thousands of professionals using GPT Resume to create AI-powered, recruiter-ready resumes that help them stand out and land interviews faster.
          </p>
          <Link
            href="/auth/signup"
            className="btn btn-outline px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Start with GPT Resume
          </Link>
        </div>
      </section>

      <Faq />
    </div>
  )
}
