// privacy-policy/page.js file 
// src/app/privacy-policy/page.js

import React from 'react';

export default function PrivacyPolicyPage() {
  return (
   
      <div className=" p-6 md:p-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 text-center">
          Privacy Policy
        </h1>
       

        {/* Introduction */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
          <p className="text-muted-foreground">
            Welcome to TailorMe. This Privacy Policy describes how we collect, use, and share your personal information when you use our services. By using our services, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="space-y-6 mt-8">
          <h2 className="text-2xl font-bold text-foreground">2. Information We Collect</h2>
          <p className="text-muted-foreground">
            We collect several types of information to provide and improve our services to you.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="font-semibold text-foreground">Personal Information:</span> We collect information that you voluntarily provide to us when you register an account, create a resume, or contact us. This may include your name, email address, phone number, and professional details.
            </li>
            <li>
              <span className="font-semibold text-foreground">Usage Data:</span> We automatically collect data on how you access and use our services. This may include your IP address, browser type, device information, and pages you visit.
            </li>
            <li>
              <span className="font-semibold text-foreground">Resume Content:</span> The content you upload or create on our platform, such as your work experience, education, and skills, is stored to enable our services.
            </li>
          </ul>
        </section>

        {/* How We Use Your Information */}
        <section className="space-y-6 mt-8">
          <h2 className="text-2xl font-bold text-foreground">3. How We Use Your Information</h2>
          <p className="text-muted-foreground">
            We use the information we collect for various purposes, including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>To provide and maintain our services.</li>
            <li>To personalize your experience and provide tailored resume suggestions.</li>
            <li>To communicate with you, including sending service updates and marketing materials.</li>
            <li>To analyze usage and improve the functionality of our website.</li>
            <li>To detect, prevent, and address technical issues.</li>
          </ul>
        </section>

        {/* Sharing Your Information */}
        <section className="space-y-6 mt-8">
          <h2 className="text-2xl font-bold text-foreground">4. Sharing Your Information</h2>
          <p className="text-muted-foreground">
            We do not sell your personal information to third parties. We may share your information with:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <span className="font-semibold text-foreground">Service Providers:</span> Third-party vendors who perform services on our behalf, such as hosting, analytics, and payment processing.
            </li>
            <li>
              <span className="font-semibold text-foreground">Legal Obligations:</span> When required by law or to protect our rights and safety.
            </li>
          </ul>
        </section>

        {/* Your Rights */}
        <section className="space-y-6 mt-8">
          <h2 className="text-2xl font-bold text-foreground">5. Your Rights</h2>
          <p className="text-muted-foreground">
            Depending on your location, you may have the right to access, update, or delete your personal information. Please contact us to exercise these rights.
          </p>
        </section>

        {/* Security of Data */}
        <section className="space-y-6 mt-8">
          <h2 className="text-2xl font-bold text-foreground">6. Security of Data</h2>
          <p className="text-muted-foreground">
            We use commercially acceptable means to protect your personal information, but no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        {/* Changes to this Policy */}
        <section className="space-y-6 mt-8">
          <h2 className="text-2xl font-bold text-foreground">7. Changes to this Policy</h2>
          <p className="text-muted-foreground">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
          </p>
        </section>

        {/* Contact Us */}
        <section className="space-y-6 mt-8">
          <h2 className="text-2xl font-bold text-foreground">8. Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@tailorme.com" className="text-primary hover:underline">support@tailorme.com</a>.
          </p>
        </section>
      </div>
    
  );
}