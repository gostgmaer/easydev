// Global type definitions
declare global {
	interface Window {
		gtag: (command: "config" | "event", targetId: string, config?: { page_path?: string; event_category?: string; event_label?: string; value?: number }) => void;
	}
}

export {};

// Content types
export interface PersonalInfo {
	name: string;
	title: string;
	email: string;
	phone: string;
	location: string;
	website: string;
	tagline: string;
	bio: string;
	availability: string;
	responseTime: string;
}

export interface Project {
	title: string;
	category: string;
	description: string;
	image: string;
	technologies: string[];
	featured: boolean;
	highlights: string[];
}

export interface Service {
	title: string;
	description: string;
	features: string[];
}

export interface Testimonial {
	name: string;
	role: string;
	company: string;
	content: string;
	rating: number;
	avatar: string;
}

export interface ContactInfo {
	title: string;
	value: string;
	description: string;
	href: string;
}

export interface FAQ {
	q: string;
	a: string;
}

export interface Experience {
	period: string;
	role: string;
	company: string;
	description: string;
	achievements: string[];
}
