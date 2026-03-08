"use client";

import React from "react";
import ErrorModalProvider from "@/components/ui/error-modal";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ErrorModalProvider>
        {children}
        <Toaster position="top-right" richColors />
      </ErrorModalProvider>
    </AuthProvider>
  );
}
