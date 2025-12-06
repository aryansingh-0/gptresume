import React from "react";
import Link from "next/link";
import { HelpCircle, FileText, Edit3, ShieldCheck, Mail, UserCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import BackgroundImage from "@/components/BackgroundImage";

function HelpPage() {
  return (
    <div>
      {/* Navbar & Background */}
      <Navbar />
      <BackgroundImage />

      <main className="max-w-4xl mx-auto py-12 px-6">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 text-center">Help & Support</h1>
        <p className="text-lg text-center text-[var(--color-muted-foreground)] mb-12">
          Need guidance? Here’s everything you need to know about using{" "}
          <span className="font-semibold">GPT Resume Builder</span> to land your dream job.
        </p>

        {/* How it Works */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">How It Works</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: <UserCheck className="h-8 w-8 mb-3 text-[var(--color-primary)]" />,
                title: "1. Complete Your Profile Once",
                text: "Fill in your details, experience, and skills just once — GPT Resume remembers it for you.",
              },
              {
                icon: <FileText className="h-8 w-8 mb-3 text-[var(--color-primary)]" />,
                title: "2. Paste Job Description",
                text: "Simply paste the job description of the role you’re applying for.",
              },
              {
                icon: <Edit3 className="h-8 w-8 mb-3 text-[var(--color-primary)]" />,
                title: "3. Get Tailored Resume",
                text: "Our AI instantly creates a personalized resume and cover letter based on your profile and job description.",
              },
              {
                icon: <ShieldCheck className="h-8 w-8 mb-3 text-[var(--color-primary)]" />,
                title: "4. Edit & Download",
                text: "Customize your resume and cover letter as you like, then download or export them in one click.",
              },
              {
                icon: <HelpCircle className="h-8 w-8 mb-3 text-[var(--color-primary)]" />,
                title: "5. Apply With Confidence",
                text: "Submit applications that are tailored, professional, and ready to impress recruiters and ATS systems.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="p-6 border rounded-xl shadow-sm bg-[var(--color-card)]"
              >
                {step.icon}
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-[var(--color-muted-foreground)]">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Still Need Help?</h2>
          <p className="text-[var(--color-muted-foreground)] mb-4">
            Our support team is here to assist you anytime.
          </p>
          <a
            href="mailto:scientificfactaishwary@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:opacity-90 transition"
          >
            <Mail className="h-5 w-5" />
            Contact Support
          </a>
        </section>
      </main>
    </div>
  );
}

export default HelpPage;
