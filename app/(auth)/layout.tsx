import React from "react";
import { Code } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center p-4">
      {/* Ambient blobs — same as Hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-gray-900 font-bold text-2xl"
          >
            <Code className="h-7 w-7 text-blue-600" />
            <span>Easydev</span>
          </a>
          <p className="text-gray-500 text-sm mt-1">Agency Management Portal</p>
        </div>
        {children}
      </div>
    </div>
  );
}
