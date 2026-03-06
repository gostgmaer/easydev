"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Database, Globe } from "lucide-react";
import { siteContent } from "@/lib/content";

export default function Hero() {
	const [currentRole, setCurrentRole] = useState(0);
	const [mounted, setMounted] = useState(false);
	const roles = siteContent?.hero?.roles || [];

	useEffect(() => {
		// Ensure component is mounted before side effects
		setMounted(true);

		// Only set up interval if we have roles
		if (roles.length === 0) {
			console.warn("⚠️ Hero roles are empty or not loaded");
			return;
		}

		try {
			const interval = setInterval(() => {
				setCurrentRole((prev) => (prev + 1) % roles.length);
			}, 3000);

			return () => clearInterval(interval);
		} catch (error) {
			console.error("❌ Error setting up role rotation:", error instanceof Error ? error.message : String(error));
			return undefined;
		}
	}, [roles.length]);

	const scrollToSection = (sectionId: string) => {
		try {
			const element = document.getElementById(sectionId);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			} else {
				console.warn(`⚠️ Section not found: ${sectionId}`);
			}
		} catch (error) {
			console.error("❌ Scroll error:", error instanceof Error ? error.message : String(error));
			// Fallback: navigate using hash
			window.location.hash = sectionId;
		}
	};

	// Don't render until mounted to avoid hydration mismatch
	if (!mounted) {
		return (
			<section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 overflow-hidden">
				<div className="text-center">
					<div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
				</div>
			</section>
		);
	}

	// Fallback if roles are not available
	const displayRole = roles && roles.length > 0 ? roles[currentRole] : "Full-Stack Development Agency";
	const agencyGreeting = siteContent?.hero?.greeting || "Hello, we are";
	const heroDescription = siteContent?.hero?.description || "We design, build, and scale web products for ambitious businesses.";
	const agencyName = siteContent?.hero?.name || siteContent?.personal?.name || "EasyDev";
	const herStats = siteContent?.hero?.stats || { experience: "5+", projects: "50+", clients: "30+" };

	return (
		<section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 overflow-hidden">
			{/* Animated Background Elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
			</div>

			<div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
					{/* Content */}
					<div className="text-center lg:text-left">
						<div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
							<span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
							{siteContent?.personal?.availability || "Available for projects"}
						</div>

						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
							{agencyGreeting}{" "}
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-emerald">
								{agencyName}
							</span>
						</h1>

						<div className="text-xl sm:text-2xl text-gray-600 mb-8 min-h-[2rem]">
							<strong className="font-semibold transition-all duration-500 ease-in-out">
								{displayRole}
							</strong>
						</div>

						<p className="text-base sm:text-lg text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0">{heroDescription}</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
							<Button
								onClick={() => scrollToSection("contact")}
								className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg group"
							>
								Get In Touch
								<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
							</Button>
							<Button
								onClick={() => scrollToSection("portfolio")}
								variant="outline"
								className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg"
							>
								View Portfolio
							</Button>
						</div>

						{/* Stats */}
						<div className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
							<div className="text-center lg:text-left">
								<div className="text-2xl sm:text-3xl font-bold text-gray-900">
									{herStats?.experience || "5+"}
								</div>
								<div className="text-sm text-gray-600">Years Experience</div>
							</div>
							<div className="text-center lg:text-left">
								<div className="text-2xl sm:text-3xl font-bold text-gray-900">
									{herStats?.projects || "50+"}
								</div>
								<div className="text-sm text-gray-600">Projects Completed</div>
							</div>
							<div className="text-center lg:text-left">
								<div className="text-2xl sm:text-3xl font-bold text-gray-900">
									{herStats?.clients || "30+"}
								</div>
								<div className="text-sm text-gray-600">Happy Clients</div>
							</div>
						</div>
					</div>

					{/* Visual Element — hidden on mobile, shown on lg+ */}
					<div className="relative hidden lg:block">
						<div className="relative w-full max-w-md mx-auto">
							{/* Main Circle */}
							<div className="w-80 h-80 mx-auto relative">
								<div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full animate-spin-slow"></div>
								<div className="absolute inset-2 bg-white rounded-full"></div>

								{/* Floating Tech Icons */}
								<div className="absolute inset-0">
									<div className="absolute top-4 left-1/2 transform -translate-x-1/2 animate-float">
										<div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
											<Code className="w-6 h-6 text-white" />
										</div>
									</div>
									<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-float delay-1000">
										<div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
											<Database className="w-6 h-6 text-white" />
										</div>
									</div>
									<div className="absolute left-4 top-1/2 transform -translate-y-1/2 animate-float delay-500">
										<div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
											<Globe className="w-6 h-6 text-white" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
