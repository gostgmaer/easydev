import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export const siteContent = {
	// =============================
	// Agency Information
	// =============================
	personal: {
		name: "EasyDev",
		title: "Full-Service Web Development & Digital Solutions Agency",
		email: "contact@easydev.in",
		phone: "+91 8637317273",
		location: "Mumbai, India",
		website: "https://www.easydev.in",
		logo: "/logo.png",
		tagline: "Custom Web Development, SaaS Solutions & Scalable Digital Products",
		bio: "EasyDev is a results-driven web development agency specializing in custom web development, full-stack engineering, SaaS platforms, and scalable digital solutions. We partner with startups, growing businesses, and enterprises to design, build, deploy, and maintain high-performance web applications. Our team combines clean code, modern UI/UX design, secure backend architecture, and reliable DevOps practices to deliver digital products that scale with your business.",
		availability: "Currently accepting new projects",
		responseTime: "Usually responds within 6 hours",
		address: { streetAddress: "B-12, Andheri West", addressLocality: "Mumbai", addressRegion: "Maharashtra", postalCode: "400058", addressCountry: "IN" },
	},

	// =============================
	// Hero Section
	// =============================
	hero: {
		greeting: "Hello, we are",
		name: "EasyDev",
		roles: ["Full-Stack Development Agency", "Frontend & Backend Experts", "Database & API Specialists", "DevOps & Deployment Partners", "Long-Term Product Support Team"],
		description:
			"We design, build, deploy, and maintain high-quality web applications. EasyDev partners with businesses to deliver scalable frontend experiences, robust backend systems, optimized databases, and reliable DevOps pipelines — all under one roof.",
		stats: { experience: "4+ years", projects: "75+ delivered", clients: "30+ happy clients" },
	},

	// =============================
	// About Section
	// =============================
	about: {
		title: "About EasyDev",
		subtitle: "Your long-term technology partner, not just a vendor",

		journey: [
			"EasyDev was founded with a simple belief: great software is built when strong engineering, honest communication, and real accountability come together. Since 2020, we’ve helped startups, founders, and growing businesses turn ideas into reliable digital products — and scale them with confidence.",
			"We don’t just write code. We take time to understand your business goals, users, and constraints before making technical decisions. This approach helps us build systems that are practical, scalable, and easy to maintain over time.",
			"Our team works across the full stack — frontend, backend, databases, DevOps, and cloud infrastructure — ensuring that every part of your product works seamlessly together instead of feeling stitched together.",
			"Whether you’re launching an MVP, modernizing an existing system, fixing long-standing bugs, or looking for a dependable engineering partner, we treat every project like it’s our own product.",
		],

		philosophy: [
			"Clarity over complexity — simple, readable systems scale better",
			"Ownership mindset — we take responsibility, not shortcuts",
			"Security and performance are built-in, not afterthoughts",
			"Long-term maintainability matters more than quick hacks",
		],

		skills: [
			"React",
			"Next.js",
			"HTML5",
			"CSS3",
			"JavaScript",
			"TypeScript",
			"Node.js",
			"Express.js",
			"MySQL",
			"MongoDB",
			"PostgreSQL",
			"REST APIs",
			"GraphQL",
			"Authentication & Authorization",
			"Security Best Practices",
			"Redis",
			"Docker",
			"AWS",
			"Cloud Infrastructure",
			"CI/CD Pipelines",
			"DevOps",
			"Performance Optimization",
			"Bug Fixing & Maintenance",
			"System Refactoring",
			"Technical Consulting",
		],

		achievements: [
			{ title: "Trusted Technology Partner", desc: "Building long-term relationships with founders, startups, and growing teams" },
			{ title: "Performance-Focused Systems", desc: "Fast, optimized, and scalable applications built for real users" },
			{ title: "On-Time & Transparent Delivery", desc: "Clear timelines, realistic estimates, and predictable outcomes" },
			{ title: "End-to-End Ownership", desc: "From idea validation to production deployment and ongoing support" },
		],

		values: ["Honest communication and realistic commitments", "Clean, maintainable, and well-documented code", "Proactive problem solving instead of reactive fixes", "Respect for deadlines, budgets, and product vision"],

		experience: [
			{
				period: "2022 – Present",
				role: "Full-Stack & DevOps Lead",
				company: "EasyDev",
				description:
					"Leading end-to-end web and cloud projects — from frontend architecture and backend APIs to database optimization, cloud infrastructure, and CI/CD automation. Acting as a hands-on technical partner rather than just a delivery team.",
				achievements: [
					"Improved application performance by up to 60%",
					"Designed reusable backend and service architectures",
					"Automated deployments, monitoring, and rollback strategies",
					"Helped startups scale from MVP to production-ready systems",
				],
			},
			{
				period: "2021 – 2022",
				role: "Full-Stack Developer",
				company: "Startup & SMB Clients",
				description: "Worked closely with founders and small teams to ship MVPs, iterate quickly based on feedback, and prepare systems for growth. Owned both frontend and backend delivery while balancing speed and quality.",
				achievements: ["Delivered 15+ production-ready applications", "Optimized complex database queries and APIs", "Introduced CI/CD and DevOps workflows for faster releases"],
			},
			{
				period: "2020 – 2021",
				role: "Backend & Web Developer",
				company: "Early-Stage Projects",
				description: "Focused on backend systems, API design, authentication, and debugging complex production issues while supporting frontend integrations and deployments.",
				achievements: ["Resolved critical production bugs under tight deadlines", "Built secure authentication and authorization systems", "Improved database reliability and performance"],
			},
		],

		closingNote:
			"At EasyDev, we believe technology should reduce stress — not create it. If you’re looking for a reliable team that communicates clearly, builds thoughtfully, and stands by their work, we’d love to be part of your journey.",
	},
	// =============================
	// Social & Community Links
	// =============================
	social: {
		title: "Connect With EasyDev",
		subtitle: "Follow our work, explore our code, and stay connected with our team",
		description: "We believe in transparency and collaboration. Follow us to see how we build products, share knowledge, and help businesses grow through technology.",
		links: [
			{ name: "GitHub", url: "https://github.com/gostgmaer", label: "Open-source projects & code samples", icon: Github },
			{ name: "LinkedIn", url: "https://www.linkedin.com/in/kishor-sarkar/", label: "Company updates & professional insights", icon: Linkedin },
			// {
			//   name: "Twitter / X",
			//   url: "https://twitter.com/easydev",
			//   label: "Tech thoughts, updates & announcements",
			//   icon: Twitter
			// },
			{ name: "Email", url: "mailto:contact@easydev.in", label: "Start a conversation with our team", icon: Mail },
		],
		cta: { text: "Let’s work together", description: "Have a project in mind or need help with an existing product? Reach out — we’d love to hear from you." },
	},

	// =============================
	// Services Section
	// =============================
	services: {
		title: "What We Do",
		subtitle: "Everything you need to build, scale, and maintain a web product",
		list: [
			{
				title: "Frontend Development",
				description: "We build fast, accessible, and user-friendly interfaces using modern frameworks. Our focus is on performance, usability, and long-term maintainability.",
				features: ["React & Next.js Applications", "Responsive & Mobile-First Design", "SEO & Performance Optimization", "Cross-Browser Compatibility"],
				priceRange: "₹50,000 – ₹2,00,000",
			},
			{
				title: "Backend & API Development",
				description: "Robust backend systems designed for scale, security, and reliability. We build APIs that are easy to extend and maintain.",
				features: ["REST & GraphQL APIs", "Authentication & Authorization", "Scalable Architecture", "Third-Party Integrations"],
				priceRange: "₹50,000 – ₹2,50,000",
			},
			{
				title: "Database Design & Optimization",
				description: "We design databases that grow with your product and optimize existing systems for speed, reliability, and data integrity.",
				features: ["MySQL & MongoDB Architecture", "Query Optimization", "Data Migration", "High-Traffic Support"],
				priceRange: "₹40,000 – ₹2,00,000",
			},
			{
				title: "DevOps & Cloud Deployment",
				description: "From development to production, we ensure smooth deployments, monitoring, and scalability.",
				features: ["CI/CD Pipelines", "Docker & Containerization", "AWS & Cloud Setup", "Monitoring & Logging"],
				priceRange: "₹30,000 – ₹1,50,000",
			},
			{
				title: "Bug Fixing & Maintenance",
				description: "Quick, reliable fixes for production issues and long-term maintenance to keep your product healthy.",
				features: ["Critical Bug Fixes", "Performance Improvements", "Security Updates", "Ongoing Support"],
				priceRange: "₹20,000 – ₹1,00,000",
			},
			{
				title: "End-to-End Product Development",
				description: "A single partner for your entire product — from idea to launch and beyond.",
				features: ["Complete Web Applications", "Architecture & Planning", "Deployment & DevOps", "Long-Term Collaboration"],
				priceRange: "₹1,00,000 – ₹5,00,000+",
			},
		],
	},

	// =============================
	// Testimonials
	// =============================
	testimonials: {
		title: "Clients Trust EasyDev",
		subtitle: "What people say after working with us",

		list: [
			{
				name: "Rajesh Kumar",
				role: "CTO",
				company: "TechStart India",
				content: "EasyDev felt like an extension of our internal team. From architecture to deployment, everything was handled professionally and with great attention to detail.",
				rating: 5,
				avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
			},
			{
				name: "Priya Sharma",
				role: "Product Manager",
				company: "InnovateHub",
				content: "Clear communication, strong technical decisions, and reliable delivery. EasyDev made complex problems feel manageable.",
				rating: 5,
				avatar: "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg",
			},
			{
				name: "Amit Patel",
				role: "Founder",
				company: "RestaurantTech",
				content: "From UI to backend and DevOps, EasyDev handled everything smoothly. We finally had a tech partner we could rely on.",
				rating: 5,
				avatar: "https://images.pexels.com/photos/2182969/pexels-photo-2182969.jpeg",
			},

			// --- Added Testimonials ---

			{
				name: "Neha Verma",
				role: "Startup Founder",
				company: "FinEdge",
				content: "What stood out most was ownership. EasyDev didn’t just complete tasks — they cared about the product’s success like it was their own.",
				rating: 5,
				avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
			},
			{
				name: "Sandeep Rao",
				role: "Engineering Manager",
				company: "SaaSFlow",
				content: "We came in with performance issues and messy code. EasyDev helped us refactor, stabilize, and improve speed significantly.",
				rating: 5,
				avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
			},
			{
				name: "Ankit Mehta",
				role: "Co-Founder",
				company: "LogiCore",
				content: "EasyDev helped us launch our MVP on time and guided us through scaling decisions. Their advice saved us months of rework.",
				rating: 5,
				avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
			},
			{
				name: "Ritika Joshi",
				role: "Operations Lead",
				company: "HealthBridge",
				content: "They were proactive, responsive, and very transparent about timelines. No surprises, just consistent delivery.",
				rating: 5,
				avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
			},
			{
				name: "Mohit Agarwal",
				role: "Founder",
				company: "EduStack",
				content: "Bug fixing, performance optimization, and new features — EasyDev handled everything without us worrying about tech.",
				rating: 5,
				avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
			},
		],
	},
	// =============================
	// Contact Section
	// =============================
	contact: {
		title: "Let’s Build Something Together",
		subtitle: "Tell us about your idea — we’ll help you plan, build, and scale it.",
		info: [
			{ title: "Email", value: "contact@easydev.in", description: "Best for detailed discussions", href: "mailto:contact@easydev.in" },
			{ title: "Phone", value: "+91 98765 43210", description: "Mon–Fri, 10am–7pm IST", href: "tel:+919876543210" },
			{ title: "Location", value: "Mumbai, India", description: "Working remotely with global clients", href: "#" },
			{ title: "Response Time", value: "< 12 hours", description: "We respect your time", href: "#" },
		],
		services: ["Frontend Development", "Backend & API Development", "Database Design", "DevOps & Deployment", "Bug Fixing & Maintenance", "Full-Stack Development"],
		budgetRanges: ["Under ₹50,000", "₹50,000 – ₹1,00,000", "₹1,00,000 – ₹2,50,000", "₹2,50,000 – ₹5,00,000", "₹5,00,000+", "Let’s discuss"],
		faqs: [
			{ q: "How do projects usually start?", a: "We begin with a short conversation to understand your goals, current challenges, and timelines. Based on that, we suggest a clear and practical plan." },
			{ q: "What kind of projects do you work on?", a: "We work on web applications, SaaS products, MVPs, backend systems, UI/UX improvements, and long-term product development." },
			{ q: "Do you work with international clients?", a: "Yes, we collaborate with teams worldwide and are comfortable working across different time zones." },
			{ q: "Can you take over or improve an existing project?", a: "Absolutely. We often audit existing codebases, fix issues, improve performance, and continue development without disrupting current users." },
			{ q: "How do you handle communication during a project?", a: "We keep communication simple and transparent using tools like Slack, email, and regular check-ins to ensure everything stays aligned." },
			{ q: "Do you offer long-term support and maintenance?", a: "Yes. Many clients work with us long-term for ongoing development, improvements, performance optimization, and technical support." },
			{ q: "How do you estimate project timelines and cost?", a: "After understanding the scope, we provide realistic estimates with clear milestones. We focus on predictable delivery rather than overpromising." },
			{ q: "Can you help scale a product as usage grows?", a: "Yes. We design systems with scalability in mind and help optimize infrastructure, performance, and architecture as growth increases." },
			{
				q: "What makes EasyDev different from other development agencies?",
				a: "We work as partners, not just service providers. We care about product quality, long-term growth, and making smart technical decisions that support real business goals.",
			},
		],
	},
	// =============================
	// Portfolio Section
	// =============================
	portfolio: {
		title: "Our Work",
		subtitle: "A selection of products and platforms we’ve designed, built, and scaled for our clients",
		description: "Every project we take on is different. From early-stage startups to growing businesses, we focus on building reliable, scalable, and maintainable solutions tailored to real-world needs.",
		projects: [
			{
				title: "E-commerce Full-Stack Platform",
				category: "E-commerce",
				description: "A complete e-commerce solution including a high-performance frontend, secure backend APIs, optimized database design, and production-ready DevOps setup.",
				image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
				technologies: ["React", "Next.js", "Node.js", "Express.js", "MySQL", "Stripe API", "Docker", "AWS"],
				featured: true,
				highlights: ["Fast and SEO-friendly storefront", "Secure payment processing", "Inventory & order management", "Automated CI/CD deployment"],
				outcome: "Helped the client launch a scalable online store with stable traffic handling and smooth checkout experience.",
			},
			{
				title: "Real-Time Social Media Platform",
				category: "Social & Community",
				description: "A real-time social platform with messaging, notifications, scalable APIs, and cloud-ready infrastructure.",
				image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800",
				technologies: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "Redis", "AWS"],
				featured: true,
				highlights: ["Real-time chat & notifications", "Highly scalable API architecture", "Caching with Redis", "Cloud deployment & monitoring"],
				outcome: "Enabled the client to support thousands of concurrent users with low latency and high reliability.",
			},
			{
				title: "Restaurant Management System",
				category: "Business & Operations",
				description: "A full-stack system for managing orders, inventory, staff, and analytics for restaurant owners.",
				image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800",
				technologies: ["React", "Node.js", "Express.js", "MySQL", "Sequelize", "Chart.js"],
				featured: false,
				highlights: ["POS & order tracking", "Inventory and staff management", "Business analytics dashboard", "Role-based access control"],
				outcome: "Improved daily operations and decision-making through real-time insights and automation.",
			},
			{
				title: "Learning Management System (LMS)",
				category: "Education & SaaS",
				description: "A scalable LMS platform with course management, progress tracking, and video streaming support.",
				image: "https://images.pexels.com/photos/5965592/pexels-photo-5965592.jpeg?auto=compress&cs=tinysrgb&w=800",
				technologies: ["React", "Node.js", "Express.js", "MongoDB", "AWS S3", "Video Processing"],
				featured: false,
				highlights: ["Course & content management", "User progress tracking", "Quiz & assessment system", "Secure video delivery"],
				outcome: "Allowed educators to launch and scale online courses with minimal operational overhead.",
			},
		],
	},

	// =============================
	// SEO
	// =============================
	seo: {
		title: "EasyDev | Trusted Web Development & DevOps Agency",
		description: "EasyDev is a full-service web development agency delivering scalable websites, SaaS products, APIs, DevOps, and long-term maintenance for growing businesses.",
		keywords: "web development agency, full-stack development, frontend, backend, DevOps, API development, React, Next.js, Node.js, MongoDB, MySQL",
		author: "EasyDev Team",
		url: "https://www.easydev.in/",
		image: "https://www.easydev.in/images/og-image.png",
		type: "website",
		locale: "en_IN",
	},
};
