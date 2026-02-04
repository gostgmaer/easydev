"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Code, Database, Globe } from "lucide-react";
import { siteContent } from "@/lib/content";

export default function Hero() {
	const [currentRole, setCurrentRole] = useState(0);
	const roles = siteContent.hero.roles;

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentRole((prev) => (prev + 1) % roles.length);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	const scrollToContact = () => {
		document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
	};

	const scrollToPortfolio = () => {
		document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<section className='relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 overflow-hidden'>
			{/* Animated Background Elements */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute -top-1/2 -right-1/2 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse'></div>
				<div className='absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
			</div>

			<div className='relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
					{/* Content */}
					<div className='text-center lg:text-left'>
						<div className='inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6'>
							<span className='w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse'></span>
							{siteContent.personal.availability}
						</div>

						<h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight'>
							{siteContent.hero.greeting} <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600'>{siteContent.personal.name}</span>
						</h1>

						<div className='text-xl sm:text-2xl text-gray-600 mb-8 min-h-[2rem]'>
							<strong className='font-semibold transition-all duration-500 ease-in-out'>{roles[currentRole]}</strong>
						</div>

						<p className='text-lg text-gray-700 mb-8 max-w-2xl'>{siteContent.hero.description}</p>

						<div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12'>
							<Button
								onClick={scrollToContact}
								className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg group'>
								Get In Touch
								<ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
							</Button>
							<Button
								onClick={scrollToPortfolio}
								variant='outline'
								className='border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg'>
								View Portfolio
							</Button>
						</div>

						{/* Stats */}
						<div className='grid grid-cols-3 gap-6 lg:gap-8'>
							<div className='text-center lg:text-left'>
								<div className='text-2xl sm:text-3xl font-bold text-gray-900'>{siteContent.hero.stats.experience}</div>
								<div className='text-sm text-gray-600'>Years Experience</div>
							</div>
							<div className='text-center lg:text-left'>
								<div className='text-2xl sm:text-3xl font-bold text-gray-900'>{siteContent.hero.stats.projects}</div>
								<div className='text-sm text-gray-600'>Projects Completed</div>
							</div>
							<div className='text-center lg:text-left'>
								<div className='text-2xl sm:text-3xl font-bold text-gray-900'>{siteContent.hero.stats.clients}</div>
								<div className='text-sm text-gray-600'>Happy Clients</div>
							</div>
						</div>
					</div>

					{/* Visual Element */}
					<div className='relative'>
						<div className='relative w-full max-w-md mx-auto'>
							{/* Main Circle */}
							<div className='w-80 h-80 mx-auto relative'>
								<div className='absolute inset-0 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full animate-spin-slow'></div>
								<div className='absolute inset-2 bg-white rounded-full'></div>

								{/* Floating Tech Icons */}
								<div className='absolute inset-0'>
									<div className='absolute top-4 left-1/2 transform -translate-x-1/2 animate-float'>
										<div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg'>
											<Code className='w-6 h-6 text-white' />
										</div>
									</div>
									<div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-float delay-1000'>
										<div className='w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg'>
											<Database className='w-6 h-6 text-white' />
										</div>
									</div>
									<div className='absolute left-4 top-1/2 transform -translate-y-1/2 animate-float delay-500'>
										<div className='w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-lg'>
											<Globe className='w-6 h-6 text-white' />
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
