"use client";

import React, { createContext, useContext, useState } from "react";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogCancel,
} from "@/components/ui/alert-dialog";

type ShowErrorFn = (title: string, message?: string) => void;

const ErrorModalContext = createContext<{ showError: ShowErrorFn } | null>(null);

export const useErrorModal = () => {
	const ctx = useContext(ErrorModalContext);
	if (!ctx) throw new Error("useErrorModal must be used within ErrorModalProvider");
	return ctx;
};

export function ErrorModalProvider({ children }: { children: React.ReactNode }) {
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState("Error");
	const [message, setMessage] = useState<string | undefined>(undefined);

	const showError: ShowErrorFn = (t, m) => {
		setTitle(t || "Error");
		setMessage(m);
		setOpen(true);
	};

	return (
		<ErrorModalContext.Provider value={{ showError }}>
			{children}

			<AlertDialog
				open={open}
				onOpenChange={setOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{title}</AlertDialogTitle>
						<AlertDialogDescription>{message ?? "Something went wrong."}</AlertDialogDescription>
					</AlertDialogHeader>

					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setOpen(false)}>Close</AlertDialogCancel>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</ErrorModalContext.Provider>
	);
}

export default ErrorModalProvider;
