"use client";

import { useState } from "react";
import { submitContactForm, trackEvent } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Calendar, Globe } from "lucide-react";
import { siteContent } from "@/lib/content";
import ContactForm from "./contact/ContactForm";
import ContactInfo from "./contact/ContactInfo";
import { useErrorModal } from "@/components/ui/error-modal";

const SERVICE_OPTIONS = [
	// Short Core Services
	// { key: "web_dev", value: "Website Development" },
	// { key: "ecommerce", value: "E-Commerce Development" },
	// { key: "redesign", value: "Website Redesign" },
	// { key: "maintenance", value: "Website Maintenance" },
	// { key: "speed_opt", value: "Speed & Performance Optimization" },
	// { key: "cloud_deploy", value: "Cloud Deployment Support" },

	// Client-Friendly Full Services
	{ key: "custom_website", value: "Custom Website Development" },
	{ key: "responsive_design", value: "Mobile-Friendly (Responsive) Websites" },
	{ key: "landing_page", value: "Landing Page & Marketing Website Creation" },
	{ key: "backend_api", value: "Backend Functionality & API Setup" },
	{ key: "admin_dashboard", value: "Admin Panel & Dashboard Development" },
	{ key: "bug_fixing", value: "Bug Fixing & Issue Resolution" },
	{ key: "payment_integration", value: "Payment Gateway Integration" },
	{ key: "third_party_integration", value: "Third-Party Integrations" },
	{ key: "auth_setup", value: "User Login & Secure Authentication Setup" },
	{ key: "realtime_features", value: "Real-Time Features (Chat, Notifications, etc.)" },
	{ key: "seo_friendly", value: "SEO-Friendly Web Development" },
	{ key: "consultation", value: "Web Strategy & Consultation" },
	{ key: "maintenance", value: "Website Maintenance" },

	// Premium / Enterprise Services
	// { key: "custom_solutions", value: "Custom Web Application Development" },
	// { key: "scalable_architecture", value: "Scalable System & Architecture Design" },
	// { key: "saas_dev", value: "SaaS Application Development" },
	// { key: "microservices", value: "Microservices & API Ecosystem Development" },
	// { key: "enterprise_dashboard", value: "Enterprise Dashboard & Admin Panel Solutions" },
	// { key: "security_audit", value: "Security Audits & Application Hardening" },
	// { key: "devops_setup", value: "DevOps, CI/CD & Cloud Infrastructure Setup" },
	// { key: "performance_engineering", value: "Advanced Performance Engineering" },
	// { key: "automation", value: "Workflow Automation & Integrations" },
	// { key: "premium_consulting", value: "Technical Consulting & System Planning" },
];

export default function Contact() {
	const [formData, setFormData] = useState({
		// 1. THE LEAD (Client Info)
		client: { name: "", email: "", phone: "", companyName: "", websiteUrl: "", socialHandle: "" },
		// 2. THE PROJECT (Scope & Details)
		projectDetails: { servicesInterested: [] as string[], budgetRange: "", timelinePreference: "", attachments: [] as { fileName: string; fileUrl: string }[] },
		// 3. THE MESSAGE
		message: { subject: "", body: "" },
		// 4. COMPLIANCE & PREFERENCES
		preferences: { preferredContactMethod: "Email", newsletterOptIn: false, privacyConsent: false },
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const { showError } = useErrorModal();

	const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, client: { ...prev.client, [name]: value } }));
	};

	const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, message: { ...prev.message, [name]: value } }));
	};

	const handleProjectDetailsSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, projectDetails: { ...prev.projectDetails, [name]: value } }));
	};

	const handlePreferredContactChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		setFormData((prev) => ({ ...prev, preferences: { ...prev.preferences, preferredContactMethod: value } }));
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setFormData((prev) => ({ ...prev, preferences: { ...prev.preferences, [name]: checked } }));
	};

	const handleServiceToggle = (service: string) => {
		setFormData((prev) => {
			const current = prev.projectDetails.servicesInterested;
			const exists = current.includes(service);
			return { ...prev, projectDetails: { ...prev.projectDetails, servicesInterested: exists ? current.filter((s) => s !== service) : [...current, service] } };
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.preferences.privacyConsent) {
			showError("Privacy consent required", "Please agree to the Privacy Policy before submitting.");
			return;
		}

		setIsSubmitting(true);

		try {
			await trackEvent({
				event: "contact_form_submit",
				category: "Contact",
				label: formData.message.subject || "New Inquiry",
			});

			const payload = {
				client: formData.client,
				projectDetails: {
					...formData.projectDetails,
					budgetRange: formData.projectDetails.budgetRange || "Not sure",
					timelinePreference: formData.projectDetails.timelinePreference || "Flexible",
				},
				message: { subject: formData.message.subject || "New Inquiry", body: formData.message.body },
				preferences: formData.preferences,
			};

			await submitContactForm(payload);

			setFormData({
				client: { name: "", email: "", phone: "", companyName: "", websiteUrl: "", socialHandle: "" },
				projectDetails: { servicesInterested: [], budgetRange: "", timelinePreference: "", attachments: [] },
				message: { subject: "", body: "" },
				preferences: { preferredContactMethod: "Email", newsletterOptIn: false, privacyConsent: false },
			});

			// simple success feedback — keep using alert for success (non-error)
			alert("Thank you for your message! I'll get back to you within 24 hours.");

			await trackEvent({ event: "contact_form_success", category: "Contact", label: payload.message.subject });
		} catch (error) {
			console.error("Form submission error:", error);
			showError("Failed to send message", (error as Error)?.message || "Please try again or contact me directly.");

			await trackEvent({ event: "contact_form_error", category: "Contact", label: "submission_failed" });
		} finally {
			setIsSubmitting(false);
		}
	};

	const iconMap: any = { Email: Mail, Phone: Phone, Location: MapPin, "Response Time": Clock };

	const contactInfo = siteContent.contact.info.map((info: any) => ({ ...info, icon: iconMap[info.title] || Mail }));

	const services = siteContent.contact.services;
	const budgetRanges = siteContent.contact.budgetRanges;

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
						<ContactForm></ContactForm>
					</div>
				</div>

				{/* FAQ Section */}
				<div className='mt-16'>
					<h3 className='text-2xl font-bold text-gray-900 text-center mb-8'>Frequently Asked Questions</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
						{siteContent.contact.faqs.map((faq: any, index: number) => (
							<Card
								key={index}
								className='border-none shadow-md'>
								<CardContent className='p-6'>
									<h4 className='font-semibold text-gray-900 mb-2'>{faq.q}</h4>
									<p className='text-gray-600 text-sm'>{faq.a}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
