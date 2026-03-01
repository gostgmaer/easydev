// Google Analytics 4 configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Log page views
export const pageview = (url: string) => {
	if (typeof window !== "undefined" && window.gtag) {
		window.gtag("config", GA_TRACKING_ID, { page_path: url });
	}
};

// Log specific events
export const event = ({ action, category, label, value }: { action: string; category: string; label?: string; value?: number }) => {
	if (typeof window !== "undefined" && window.gtag) {
		window.gtag("event", action, { event_category: category, event_label: label, value: value });
	}
};

// Track contact form submissions
export const trackContactForm = (formType: string) => {
	event({ action: "submit_form", category: "Contact", label: formType });
};

// Track project views
export const trackProjectView = (projectName: string) => {
	event({ action: "view_project", category: "Portfolio", label: projectName });
};

// Track service inquiries
export const trackServiceInquiry = (serviceName: string) => {
	event({ action: "service_inquiry", category: "Services", label: serviceName });
};
