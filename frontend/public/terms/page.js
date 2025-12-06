// app/terms/page.js
import React from "react";

export default function TermsPage() {
  return (
    <main className="container mx-auto px-6 py-12">
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Welcome to <span className="font-semibold">TailorMe</span>. By using
          our platform, you agree to the terms and conditions outlined below.
          Please read them carefully.
        </p>
      </section>

      {/* Agreement */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="text-muted-foreground leading-relaxed">
          By accessing or using our services, you confirm that you agree to be
          bound by these Terms of Service and our Privacy Policy. If you do not
          agree, you may not use our services.
        </p>
      </section>

      {/* Use of Services */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">2. Use of Services</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Our services are intended for personal and professional use.</li>
          <li>
            You are responsible for maintaining the confidentiality of your
            account credentials.
          </li>
          <li>
            Misuse of the platform, including spamming, unauthorized access, or
            reverse engineering, is prohibited.
          </li>
        </ul>
      </section>

      {/* Intellectual Property */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          3. Intellectual Property
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          All content, branding, designs, and technologies on TailorMe are the
          intellectual property of TailorMe and its licensors. You may not copy,
          modify, distribute, or use them without prior written consent.
        </p>
      </section>

      {/* Limitation of Liability */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          4. Limitation of Liability
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          TailorMe provides services on an “as is” basis without warranties of
          any kind. We are not liable for indirect, incidental, or consequential
          damages arising from the use of our platform.
        </p>
      </section>

      {/* Termination */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">5. Termination</h2>
        <p className="text-muted-foreground leading-relaxed">
          We reserve the right to suspend or terminate your account at any time
          for violation of these terms or misuse of our services.
        </p>
      </section>

      {/* Updates */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          6. Changes to These Terms
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          We may update these Terms of Service from time to time. Continued use
          of the platform constitutes acceptance of any changes.
        </p>
      </section>

      {/* Closing Note */}
      <section className="text-center">
        <p className="text-muted-foreground max-w-2xl mx-auto">
          If you have questions about these terms, please{" "}
          <span className="font-semibold">contact us</span>. Thank you for
          trusting <span className="font-semibold">TailorMe</span>.
        </p>
      </section>
    </main>
  );
}
