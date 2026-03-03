import { Mail, Phone, MapPin, Clock } from "lucide-react";
import type { ContactInfo, ServiceOption, FAQ } from "../types/contact";

export const SERVICE_OPTIONS: ServiceOption[] = [
	{ key: "custom_website", value: "Custom Website & Web App Development" },
	// { key: "landing_page", value: "High-Converting Landing Page Development" },
	{ key: "backend_api", value: "Scalable Backend Development & API Integration" },
	{ key: "admin_dashboard", value: "Admin Dashboard & Internal Tools" },
	{ key: "bug_fixing", value: "Bug Fixing, Optimization & Performance Enhancements" },
	{ key: "payment_integration", value: "Payment Gateway Setup & Integration" },
	{ key: "third_party_integration", value: "Third-Party API & Plugin Integrations" },
	{ key: "auth_setup", value: "Secure Authentication & User Management" },
	{ key: "realtime_features", value: "Real-Time Features (Chat, Notifications, Live Updates)" },
	{ key: "seo_friendly", value: "SEO-Optimized Web Development" },
	{ key: "consultation", value: "Product Strategy & Technical Consultation" },
	{ key: "maintenance", value: "Ongoing Maintenance & Support" },
];

export const BUDGET_RANGES: string[] = [
	"Under ₹50,000",
	"₹50,000 – ₹1,50,000",
	"₹1,50,000 – ₹5,00,000",
	"₹5,00,000 – ₹15,00,000",
	"₹15,00,000+",
	"Let's Discuss",
];

export const TIMELINE_OPTIONS: string[] = [
	"2 Weeks",
	"4-6 Weeks",
	"6-8 Weeks",
	"8-10 Weeks",
	"8-12 Weeks",
	"12-14 Weeks",
	"6+ Months",
	"Flexible",
];

export const CONTACT_INFO: ContactInfo[] = [
	{
		title: "Email",
		value: "hello@easydev.in",
		href: "mailto:hello@easydev.in",
		description: "Get in touch for project inquiries",
		icon: Mail,
	},
	{
		title: "Phone",
		value: "+91 863-731-7273",
		href: "tel:+918637317273",
		description: "Available Monday to Friday",
		icon: Phone,
	},
	{
		title: "Location",
		value: "San Francisco, CA",
		href: "#",
		description: "Remote work available worldwide",
		icon: MapPin,
	},
	{
		title: "Response Time",
		value: "Within 24 hours",
		href: "#",
		description: "Quick turnaround guaranteed",
		icon: Clock,
	},
];

export const FAQS: FAQ[] = [
	{
		q: "What's your typical project timeline?",
		a: "Most projects take 2-8 weeks depending on complexity. Simple websites can be completed in 1-2 weeks, while complex applications may take 2-3 months.",
	},
	{
		q: "Do you provide ongoing maintenance?",
		a: "Yes! I offer maintenance packages that include updates, security monitoring, backups, and performance optimization to keep your website running smoothly.",
	},
	{
		q: "What technologies do you specialize in?",
		a: "I specialize in React, Node.js, TypeScript, and modern web technologies. I also work with various databases, APIs, and cloud platforms.",
	},
	{
		q: "Can you work with existing websites?",
		a: "Absolutely! I can help improve, redesign, or add new features to existing websites. I work with various platforms and frameworks.",
	},
];
