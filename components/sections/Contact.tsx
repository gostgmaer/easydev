"use client";

import { Suspense } from "react";
import { siteContent } from "@/lib/content";
import ContactForm from "./contact/ContactForm";
import ContactInfo from "./contact/ContactInfo";


export default function Contact() {
	return (
		<section
			id='contact'
			className='py-20 bg-gray-50'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='text-center mb-16'>
					<h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>{siteContent.contact.title}</h2>
					<p className='text-xl text-gray-600 max-w-3xl mx-auto'>{siteContent.contact.subtitle}</p>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					{/* Contact Information */}
					<div className='lg:col-span-1'>
						<ContactInfo />
					</div>

					{/* Contact Form */}
					<div className='lg:col-span-2'>
						<Suspense fallback={<div className='bg-white rounded-xl shadow-lg p-8 border border-gray-100 h-96 animate-pulse' />}>
							<ContactForm />
						</Suspense>
					</div>
				</div>

				{/* Calendly Booking Section */}
				<div className='mt-16 max-w-4xl mx-auto'>
					<div className='text-center mb-12'>
						<h3 className='text-2xl font-bold text-gray-900 mb-4'>Schedule a Free Consultation</h3>
						<p className='text-gray-600'>Have specific questions? Book a 30-minute call with our team.</p>
					</div>
					<div className='bg-white rounded-2xl shadow-lg p-8 border border-gray-200'>
						<iframe
							title='Book a consultation with EasyDev'
							src='https://calendly.com/kishor81160/new-meeting'
							width='100%'
							height='600'
							frameBorder='0'
							loading='lazy'
							className='rounded-lg'></iframe>
					</div>
				</div>
			</div>
		</section>
	);
}
