"use client";

import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center gap-6 animate-slide-left">
      <h1 className="text-[6rem] font-extrabold text-[var(--color-destructive)]">404</h1>
      <p className="text-xl text-[var(--color-foreground)]">
        Oops! Page not found.
      </p>
      <Link href="/" className="btn btn-primary flex items-center gap-2">
        <Home className="w-5 h-5" />
        Go to Home
      </Link>
    </div>
  );
}
