// app/about/page.js
import React from "react";
import BackgroundImage from "@/components/BackgroundImage";

export default function AboutPage() {
  return (
    <main className="container relative mx-auto px-6 py-12">
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About GPT Resume</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          At <span className="font-semibold">GPT Resume</span>, we believe that
          technology should empower people — not intimidate them. Our mission is
          to make resume building simple, intelligent, and accessible for
          everyone through the power of AI.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed">
          We aim to help every job seeker — from students to experienced
          professionals — craft resumes that reflect their true potential. GPT
          Resume uses advanced AI to analyze job descriptions, highlight
          strengths, and generate personalized resumes and cover letters that
          stand out in today’s competitive job market.
        </p>
      </section>

      {/* What We Do */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>AI-powered resume builder tailored to specific job roles.</li>
          <li>Instant cover letter generation aligned with your resume.</li>
          <li>Smart suggestions to improve formatting, keywords, and tone.</li>
          <li>Professionally designed templates built for every industry.</li>
          <li>Resume downloads in both PDF and DOCX formats.</li>
        </ul>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8 text-muted-foreground">
          <div className="p-6 border rounded-lg bg-card shadow-sm">
            <h3 className="font-semibold mb-2">Innovation</h3>
            <p>
              We harness the latest AI advancements to simplify the resume
              creation process and give users a competitive edge.
            </p>
          </div>
          <div className="p-6 border rounded-lg bg-card shadow-sm">
            <h3 className="font-semibold mb-2">Empowerment</h3>
            <p>
              Our tools are built to help every individual — regardless of
              experience — present their story with confidence and clarity.
            </p>
          </div>
          <div className="p-6 border rounded-lg bg-card shadow-sm">
            <h3 className="font-semibold mb-2">Trust</h3>
            <p>
              GPT Resume prioritizes privacy and transparency. All data is
              processed locally in your browser — never stored or shared.
            </p>
          </div>
        </div>
      </section>

      {/* Closing Note */}
      <section className="text-center">
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Whether you’re a student preparing for internships, a professional
          advancing your career, or someone exploring new opportunities,{" "}
          <span className="font-semibold">GPT Resume</span> is your AI partner
          in building a resume that truly represents you.
        </p>
      </section>
    </main>
  );
}
