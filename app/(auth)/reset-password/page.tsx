"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { resetPasswordWithToken } from "@/lib/api";
import { toast } from "sonner";

export default function ResetPasswordPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!token) {
			toast.error("Reset token is missing.");
			return;
		}

		if (newPassword.length < 6) {
			toast.error("Password must be at least 6 characters.");
			return;
		}

		if (newPassword !== confirmPassword) {
			toast.error("Passwords do not match.");
			return;
		}

		setLoading(true);
		try {
			await resetPasswordWithToken({ token, newPassword, confirmPassword });
			toast.success("Password reset successful. Please login.");
			router.replace("/login/");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Failed to reset password");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='mx-auto flex min-h-screen w-full max-w-md items-center px-4'>
			<Card className='w-full'>
				<CardHeader>
					<CardTitle>Reset Password</CardTitle>
					<CardDescription>Enter and confirm your new password.</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						className='space-y-4'
						onSubmit={handleSubmit}>
						<div className='space-y-2'>
							<Label htmlFor='newPassword'>New Password</Label>
							<Input
								id='newPassword'
								type='password'
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								required
							/>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='confirmPassword'>Confirm Password</Label>
							<Input
								id='confirmPassword'
								type='password'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</div>

						<Button
							type='submit'
							className='w-full'
							disabled={loading}>
							{loading ? "Updating..." : "Update Password"}
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
