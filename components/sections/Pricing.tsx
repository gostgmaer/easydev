"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { siteContent } from "@/lib/content";
import { Check, ArrowRight } from "lucide-react";

export default function Pricing() {
	const { pricing } = siteContent;
	const router = useRouter();

	const handlePlanSelect = (tierName: string) => {
		// Write the selected plan to the URL so ContactForm can pick it up
		const url = new URL(window.location.href);
		url.searchParams.set("plan", tierName);
		url.hash = "contact";
		router.replace(url.pathname + url.search + "#contact", { scroll: false });

		// Smooth-scroll to the contact section
		setTimeout(() => {
			const el = document.getElementById("contact");
			if (el) {
				el.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		}, 50);
	};

	return (
		<section className='py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='text-center mb-16'>
					<h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>{pricing.title}</h2>
					<p className='text-xl text-gray-600 max-w-2xl mx-auto'>{pricing.subtitle}</p>
				</div>

				{/* Pricing Cards */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-12'>
					{pricing.tiers.map((tier, index) => (
						<div
							key={index}
							className={`rounded-2xl overflow-hidden transition-all duration-300 ${tier.popular ?
								"ring-2 ring-primary shadow-2xl lg:scale-105"
								: "border-2 border-gray-200 shadow-lg hover:shadow-xl hover:border-gray-300"
								} ${tier.popular ? "bg-gradient-to-br from-primary/5 to-primary/10" : "bg-white"}`}>
							{/* Header */}
							<div className={`px-6 pt-8 pb-6`}>
								{tier.popular && (
									<span className='inline-block bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full mb-4'>
										MOST POPULAR
									</span>
								)}
								<h3 className='text-2xl font-bold text-gray-900 mb-2'>{tier.name}</h3>
								<p className='text-gray-600 text-sm mb-4'>{tier.description}</p>
								<div className='mb-6'>
									<span className='text-5xl font-bold text-gray-900'>{tier.price}</span>
								</div>
								<p className='text-sm text-gray-700 mb-6'>{tier.duration}</p>
								<button
									onClick={() => handlePlanSelect(tier.name)}
									className={`flex w-full text-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 items-center justify-center gap-2 ${tier.popular ?
										"bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
										: "bg-gray-100 text-gray-900 hover:bg-primary/5 border-2 border-transparent hover:border-primary/30"
										}`}>
									{tier.cta}
									<ArrowRight className='w-4 h-4' />
								</button>
							</div>

							{/* Divider */}
							<div className='border-t border-gray-200'></div>

							{/* Features */}
							<div className='px-6 py-8'>
								<p className='text-sm font-semibold text-gray-900 mb-6 uppercase tracking-wide'>What&apos;s Included</p>
								<ul className='space-y-4'>
									{tier.features.map((feature, i) => (
										<li
											key={i}
											className='flex items-start gap-3'>
											<Check className='w-5 h-5 text-green-500 flex-shrink-0 mt-0.5' />
											<span className='text-gray-700'>{feature.replace("✅ ", "")}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>

				{/* Extra Info */}
				<div className='bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center max-w-2xl mx-auto'>
					<h3 className='text-xl font-bold text-gray-900 mb-3'>Need a custom solution?</h3>
					<p className='text-gray-700 mb-6'>
						Every business is unique. Our team can create a tailored package based on your specific requirements,
						timeline, and budget.
					</p>
					<button
						onClick={() => handlePlanSelect("Custom")}
						className='inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors'>
						Contact us for a custom quote
						<ArrowRight className='w-4 h-4' />
					</button>
				</div>
			</div>
		</section>
	);
}
