"use client";

import React, { useState } from "react";
import { siteContent } from "@/lib/content";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
	const { faq } = siteContent;
	const [openIndex, setOpenIndex] = useState<string | null>(null);

	const toggleFAQ = (key: string) => {
		setOpenIndex(openIndex === key ? null : key);
	};

	return (
		<section className='py-20 bg-white'>
			<div className='container mx-auto px-6'>
				{/* Header */}
				<div className='text-center mb-16'>
					<h2 className='text-4xl font-bold text-gray-900 mb-4'>{faq.title}</h2>
					<p className='text-xl text-gray-600 max-w-2xl mx-auto'>{faq.subtitle}</p>
				</div>

				{/* FAQ Categories */}
				<div className='max-w-3xl mx-auto space-y-12'>
					{faq.categories.map((categorySection) => (
						<div key={categorySection.category}>
							<h3 className='text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-200'>
								{categorySection.category}
							</h3>

							{/* FAQ Items */}
							<div className='space-y-4'>
								{categorySection.questions.map((item, index) => {
									const itemKey = `${categorySection.category}-${index}`;
									return (
										<div
											key={itemKey}
											className='bg-gray-50 border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors duration-200'>
											<button
												onClick={() => toggleFAQ(itemKey)}
												className='w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200'>
												<h4 className='text-left text-lg font-semibold text-gray-900'>{item.q}</h4>
												<ChevronDown
													className={`w-5 h-5 text-blue-600 flex-shrink-0 transition-transform duration-300 ${
														openIndex === itemKey ? "transform rotate-180" : ""
													}`}
												/>
											</button>

											{openIndex === itemKey && (
												<div className='px-6 py-4 bg-white border-t border-gray-200'>
													<p className='text-gray-700 leading-relaxed'>{item.a}</p>
												</div>
											)}
										</div>
									);
								})}
							</div>
						</div>
					))}
				</div>

				{/* Contact CTA */}
				<div className='mt-16 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200'>
					<h3 className='text-2xl font-bold text-gray-900 mb-4'>Didn&apos;t find your answer?</h3>
					<p className='text-gray-600 mb-6'>
						Have a specific question? Our team is ready to help. Get in touch with us today.
					</p>
					<a
						href='#contact'
						className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg'>
						Contact Us
					</a>
				</div>
			</div>
		</section>
	);
}
