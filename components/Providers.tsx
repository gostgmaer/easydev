"use client";

import React from "react";
import ErrorModalProvider from "@/components/ui/error-modal";

export default function Providers({ children }: { children: React.ReactNode }) {
	return <ErrorModalProvider>{children}</ErrorModalProvider>;
}
