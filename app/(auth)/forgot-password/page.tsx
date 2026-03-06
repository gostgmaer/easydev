"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { requestPasswordReset } from "@/lib/api";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setLoading(true);
		try {
			await requestPasswordReset(email.trim());
			toast.success("If the email exists, a reset link has been sent.");
			setEmail("");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Failed to submit request");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='mx-auto flex min-h-screen w-full max-w-md items-center px-4'>
			<Card className='w-full'>
				<CardHeader>
					<CardTitle>Forgot Password</CardTitle>
					<CardDescription>Request a secure password reset link.</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						className='space-y-4'
						onSubmit={handleSubmit}>
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								placeholder='admin@example.com'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<Button
							type='submit'
							className='w-full'
							disabled={loading}>
							{loading ? "Submitting..." : "Send Reset Link"}
						</Button>
					</form>

					<p className='mt-4 text-center text-sm text-muted-foreground'>
						Back to{" "}
						<Link
							href='/login/'
							className='text-primary underline-offset-4 hover:underline'>
							login
						</Link>
						.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
