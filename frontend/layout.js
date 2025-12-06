import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from "@/lib/auth";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata = {
  title: 'Gpt Resume - AI-Powered Resume Tailoring',
  description: 'Create job-specific resumes tailored to any job description using AI',
  verification: {
    google: "l447jfQ4xxcrmN2Q_Cq8q3aeuLvLAJo6cVNv35IA96Y",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google AdSense meta verification */}
        <meta
          name="google-adsense-account"
          content="ca-pub-2404358914933411"
        />

        {/* ✅ Google Analytics script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QNG4W1PKRF"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QNG4W1PKRF');
          `}
        </Script>
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          {children}
          <Toaster
            className="no-print"
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff'
              }
            }}
          />
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
