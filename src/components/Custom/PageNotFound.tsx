"use client";

import Link from "next/link";

export default function PageNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold text-danger-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-text-primary mb-2">Page Not Found</h2>
      <p className="text-text-secondary mb-6">Sorry, the page you're looking for doesn't exist or has been moved.</p>
      <Link href="/" className="login">
        Back to Home
      </Link>
    </div>
  );
}
