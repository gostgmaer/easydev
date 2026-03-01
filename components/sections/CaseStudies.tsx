"use client";

import React from "react";
import Image from "next/image";
import { siteContent } from "@/lib/content";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function CaseStudies() {
	const { caseStudies } = siteContent;

	return (
		<section className='py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30'>
			<div className='container mx-auto px-6'>
				{/* Header */}
				<div className='text-center mb-16'>
					<h2 className='text-4xl font-bold text-gray-900 mb-4'>{caseStudies.title}</h2>
					<p className='text-xl text-gray-600 max-w-2xl mx-auto'>{caseStudies.subtitle}</p>
				</div>

				{/* Case Studies Grid */}
				<div className='grid gap-12'>
					{caseStudies.list.map((study, index) => (
						<div
							key={index}
							className='bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200'>
							<div className='grid md:grid-cols-2 gap-8 p-8'>
								{/* Image */}
								<div className='flex items-center'>
									<Image
										src={study.image}
										alt={study.title}
										width={600}
										height={384}
										className='w-full h-96 object-cover rounded-xl'
									/>
								</div>

								{/* Content */}
								<div className='flex flex-col justify-between'>
									<div>
										<div className='mb-4'>
											<p className='text-sm font-semibold text-blue-600 uppercase tracking-wide'>{study.role}</p>
											<h3 className='text-2xl font-bold text-gray-900 mb-2'>{study.title}</h3>
											<p className='text-sm text-gray-600 mb-4'>Client: {study.client}</p>
										</div>

										{/* Challenge */}
										<div className='mb-6'>
											<h4 className='text-sm font-semibold text-gray-900 uppercase mb-2'>Challenge</h4>
											<p className='text-gray-700 leading-relaxed'>{study.challenge}</p>
										</div>

										{/* Solution */}
										<div className='mb-6'>
											<h4 className='text-sm font-semibold text-gray-900 uppercase mb-2'>Solution</h4>
											<p className='text-gray-700 leading-relaxed'>{study.solution}</p>
										</div>

										{/* Results */}
										<div className='mb-6 bg-green-50 border border-green-200 rounded-lg p-4'>
											<h4 className='text-sm font-semibold text-gray-900 uppercase mb-3'>Results</h4>
											<div className='space-y-2'>
												{Object.entries(study.results).map(([key, value]) => (
													<div
														key={key}
														className='flex items-start gap-3'>
														<CheckCircle className='w-5 h-5 text-green-600 flex-shrink-0 mt-0.5' />
														<div>
															<p className='text-sm font-semibold text-gray-900 capitalize'>
																{key.replace(/([A-Z])/g, " $1").trim()}
															</p>
															<p className='text-sm text-gray-700'>{value}</p>
														</div>
													</div>
												))}
											</div>
										</div>

										{/* Technologies */}
										<div className='mb-6'>
											<h4 className='text-sm font-semibold text-gray-900 uppercase mb-3'>Technologies</h4>
											<div className='flex flex-wrap gap-2'>
												{study.technologies.map((tech) => (
													<span
														key={tech}
														className='px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full'>
														{tech}
													</span>
												))}
											</div>
										</div>

										{/* Timeline */}
										<div className='mb-6 text-sm'>
											<p className='text-gray-600'>
												<span className='font-semibold text-gray-900'>Timeline:</span> {study.timeline}
											</p>
										</div>

										{/* Testimonial */}
										<div className='bg-blue-50 border-l-4 border-blue-600 p-4 rounded'>
											<p className='text-sm italic text-gray-700 mb-2'>{study.testimonial}</p>
											<p className='text-xs text-gray-600 font-semibold'>— {study.client} Client</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* CTA */}
				<div className='mt-16 text-center'>
					<p className='text-gray-600 mb-6'>Want results like these? Let&apos;s discuss your project.</p>
					<button className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg'>
						Start Your Project
						<ArrowRight className='w-5 h-5' />
					</button>
				</div>
			</div>
		</section>
	);
}
