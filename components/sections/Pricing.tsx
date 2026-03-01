"use client";

import React from "react";
import { siteContent } from "@/lib/content";
import { Check, ArrowRight } from "lucide-react";

export default function Pricing() {
	const { pricing } = siteContent;

	return (
		<section className='py-20 bg-gradient-to-b from-white to-gray-50'>
			<div className='container mx-auto px-6'>
				{/* Header */}
				<div className='text-center mb-16'>
					<h2 className='text-4xl font-bold text-gray-900 mb-4'>{pricing.title}</h2>
					<p className='text-xl text-gray-600 max-w-2xl mx-auto'>{pricing.subtitle}</p>
				</div>

				{/* Pricing Cards */}
				<div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12'>
					{pricing.tiers.map((tier, index) => (
						<div
							key={index}
							className={`rounded-2xl overflow-hidden transition-all duration-300 ${
								tier.popular ?
									"ring-2 ring-blue-500 shadow-2xl lg:scale-105"
								:	"border-2 border-gray-200 shadow-lg hover:shadow-xl hover:border-gray-300"
							} ${tier.popular ? "bg-gradient-to-br from-blue-50 to-blue-100" : "bg-white"}`}>
							{/* Header */}
							<div className={`px-6 pt-8 pb-6`}>
								{tier.popular && (
									<span className='inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4'>
										MOST POPULAR
									</span>
								)}
								<h3 className='text-2xl font-bold text-gray-900 mb-2'>{tier.name}</h3>
								<p className='text-gray-600 text-sm mb-4'>{tier.description}</p>
								<div className='mb-6'>
									<span className='text-5xl font-bold text-gray-900'>{tier.price}</span>
								</div>
								<p className='text-sm text-gray-700 mb-6'>{tier.duration}</p>
								<a
									href='#contact'
									className={`flex w-full text-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 items-center justify-center gap-2 ${
										tier.popular ?
											"bg-blue-600 text-white hover:bg-blue-700 shadow-md"
										:	"bg-gray-100 text-gray-900 hover:bg-blue-50 border-2 border-transparent hover:border-blue-300"
									}`}>
									{tier.cta}
									<ArrowRight className='w-4 h-4' />
								</a>
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
				<div className='bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center max-w-2xl mx-auto'>
					<h3 className='text-xl font-bold text-gray-900 mb-3'>Need a custom solution?</h3>
					<p className='text-gray-700 mb-6'>
						Every business is unique. Our team can create a tailored package based on your specific requirements,
						timeline, and budget.
					</p>
					<a
						href='#contact'
						className='inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors'>
						Contact us for a custom quote
						<ArrowRight className='w-4 h-4' />
					</a>
				</div>
			</div>
		</section>
	);
}
