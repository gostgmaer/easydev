"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { clearAuthSession, getAuthSession } from "@/lib/auth-client";
import { verifyAdminToken } from "@/lib/api";
import { toast } from "sonner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();
	const [isReady, setIsReady] = useState(false);
	const [adminName, setAdminName] = useState<string>("Admin");

	useEffect(() => {
		let mounted = true;

		async function protect() {
			const session = getAuthSession();

			if (!session?.token) {
				router.replace(`/login/?redirect=${encodeURIComponent(pathname || "/dashboard/")}`);
				return;
			}

			setAdminName(session.admin?.name || "Admin");

			const isValid = await verifyAdminToken();
			if (!isValid) {
				clearAuthSession();
				toast.error("Session expired. Please login again.");
				router.replace("/login/");
				return;
			}

			if (mounted) setIsReady(true);
		}

		void protect();

		return () => {
			mounted = false;
		};
	}, [pathname, router]);

	const handleLogout = () => {
		clearAuthSession();
		router.replace("/login/");
	};

	if (!isReady) {
		return (
			<main className='mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-6'>
				<p className='text-sm text-muted-foreground'>Checking access...</p>
			</main>
		);
	}

	return (
		<div className='min-h-screen bg-muted/20'>
			<header className='border-b bg-background'>
				<div className='mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6'>
					<div>
						<Link
							href='/dashboard/'
							className='text-lg font-semibold'>
							EasyDev Admin
						</Link>
						<p className='text-xs text-muted-foreground'>Signed in as {adminName}</p>
					</div>
					<Button
						variant='outline'
						onClick={handleLogout}>
						Logout
					</Button>
				</div>
			</header>

			<main className='mx-auto w-full max-w-7xl px-4 py-6 sm:px-6'>{children}</main>
		</div>
	);
}
