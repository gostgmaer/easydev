"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { loginAdmin } from "@/lib/api";
import { setAuthSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function LoginPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const redirect = searchParams.get("redirect") || "/dashboard/";

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!email.trim() || !password.trim()) {
			toast.error("Email and password are required");
			return;
		}

		setLoading(true);
		try {
			const session = await loginAdmin({ email: email.trim(), password });
			setAuthSession(session);
			toast.success("Login successful");
			router.replace(redirect);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='mx-auto flex min-h-screen w-full max-w-md items-center px-4'>
			<Card className='w-full'>
				<CardHeader>
					<CardTitle>Admin Login</CardTitle>
					<CardDescription>Access the EasyDev dashboard.</CardDescription>
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

						<div className='space-y-2'>
							<Label htmlFor='password'>Password</Label>
							<Input
								id='password'
								type='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>

						<div className='flex items-center justify-between text-sm'>
							<Link
								href='/forgot-password/'
								className='text-primary underline-offset-4 hover:underline'>
								Forgot password?
							</Link>
						</div>

						<Button
							type='submit'
							className='w-full'
							disabled={loading}>
							{loading ? "Signing in..." : "Login"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
