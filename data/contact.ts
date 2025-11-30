import {
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import type { ContactInfo, ServiceOption, FAQ } from "../types/contact";

export const SERVICE_OPTIONS: ServiceOption[] = [
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
];

export const BUDGET_RANGES: string[] = [
  "Under $5,000",
  "$5,000 - $15,000",
  "$15,000 - $35,000",
  "$35,000 - $75,000",
  "$75,000+",
  "Let's Discuss",
];

export const TIMELINE_OPTIONS: string[] = [
  "ASAP",
  "1 Month",
  "3 Months",
  "6 Months",
  "Flexible",
];

export const CONTACT_INFO: ContactInfo[] = [
  {
    title: "Email",
    value: "hello@developer.com",
    href: "mailto:hello@developer.com",
    description: "Get in touch for project inquiries",
    icon: Mail,
  },
  {
    title: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
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