"use client";

import { useEffect, useRef } from "react";
import { X, Shield, FileText } from "lucide-react";

interface LegalModalProps {
	type: "privacy" | "terms" | null;
	onClose: () => void;
}

// ── Privacy Policy ────────────────────────────────────────────────────────────
const PRIVACY_CONTENT = (
	<>
		<p className='text-sm text-gray-500 mb-6'>
			EasyDev (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is a web development agency headquartered at B-12,
			Andheri West, Mumbai, Maharashtra 400058, India. This Privacy Policy explains how we collect, use, store, and
			protect information you provide when you visit <strong>easydev.in</strong> or engage our services.
		</p>

		<h2>1. Information We Collect</h2>
		<p>When you contact us, request a quote, or submit our contact form, we collect:</p>
		<ul>
			<li>Your name, email address, and phone number</li>
			<li>Company name and project details you share</li>
			<li>Preferred contact method and project budget / timeline</li>
			<li>Newsletter opt-in preference</li>
		</ul>
		<p>
			We also automatically collect standard server-side analytics data (pages visited, browser type, IP address) to
			improve site performance.
		</p>

		<h2>2. How We Use Your Information</h2>
		<ul>
			<li>To respond to your project inquiry within our typical 6-hour window</li>
			<li>To prepare and send you a tailored project proposal</li>
			<li>To send our newsletter if you opted in (you can unsubscribe at any time)</li>
			<li>To track analytics and continuously improve our website</li>
			<li>To comply with legal obligations</li>
		</ul>

		<h2>3. Data Storage &amp; Security</h2>
		<p>
			Your data is processed on secure servers hosted on AWS infrastructure. We apply industry-standard technical
			controls — encryption in transit (TLS), access control, and regular security reviews — to protect your information
			from unauthorized access, disclosure, or loss.
		</p>

		<h2>4. Cookies</h2>
		<p>
			We use essential cookies to keep the site functional and optional analytics cookies to understand how visitors
			interact with our pages. You can control cookie settings through your browser at any time. We do not use
			advertising or tracking cookies.
		</p>

		<h2>5. Sharing Your Data</h2>
		<p>
			We do <strong>not</strong> sell, rent, or trade your personal data. We may share minimal information with trusted
			third-party tools (e.g., email delivery, analytics) solely to operate our service. These partners are
			contractually bound to keep your data confidential.
		</p>

		<h2>6. Data Retention</h2>
		<p>
			We retain your contact information for as long as is necessary to fulfil your inquiry, deliver the agreed service,
			and meet legal / accounting obligations. You may request deletion at any time (see §8).
		</p>

		<h2>7. Third-Party Links</h2>
		<p>
			Our website may link to external resources (GitHub, LinkedIn). EasyDev is not responsible for the privacy
			practices of those sites. We encourage you to review their policies independently.
		</p>

		<h2>8. Your Rights</h2>
		<p>You have the right to:</p>
		<ul>
			<li>Access the personal data we hold about you</li>
			<li>Request correction of inaccurate data</li>
			<li>Request deletion (&quot;right to be forgotten&quot;)</li>
			<li>Withdraw newsletter consent at any time</li>
		</ul>
		<p>
			To exercise any of these rights, email us at <strong>contact@easydev.in</strong>.
		</p>

		<h2>9. Policy Updates</h2>
		<p>
			We may update this Privacy Policy to reflect changes in our services or applicable law. The &quot;Last
			updated&quot; date at the top of this modal will always reflect the most recent revision.
		</p>

		<h2>10. Contact Us</h2>
		<p>
			EasyDev — B-12, Andheri West, Mumbai, Maharashtra 400058, India
			<br />
			📧 <strong>contact@easydev.in</strong> &nbsp;|&nbsp; 📞 <strong>+91 8637317273</strong>
		</p>
	</>
);

// ── Terms & Conditions ────────────────────────────────────────────────────────
const TERMS_CONTENT = (
	<>
		<p className='text-sm text-gray-500 mb-6'>
			These Terms &amp; Conditions (&quot;Terms&quot;) govern your use of <strong>easydev.in</strong> and any services
			provided by <strong>EasyDev</strong> (B-12, Andheri West, Mumbai, Maharashtra 400058, India). By engaging our
			services or using this website, you agree to these Terms in full. If you do not agree, please do not use our
			services.
		</p>

		<h2>1. Our Services</h2>
		<p>EasyDev provides professional web development and digital solutions, including:</p>
		<ul>
			<li>
				<strong>Frontend Development</strong> — React, Next.js, responsive design, SEO optimization
			</li>
			<li>
				<strong>Backend &amp; API Development</strong> — REST &amp; GraphQL APIs, authentication, third-party
				integrations
			</li>
			<li>
				<strong>Database Design &amp; Optimization</strong> — MySQL, MongoDB, PostgreSQL, query optimization
			</li>
			<li>
				<strong>DevOps &amp; Cloud Deployment</strong> — CI/CD pipelines, Docker, AWS, monitoring
			</li>
			<li>
				<strong>Bug Fixing &amp; Maintenance</strong> — Critical fixes, performance improvements, ongoing support
			</li>
			<li>
				<strong>End-to-End Product Development</strong> — Full-stack web applications from ideation to production
			</li>
		</ul>
		<p>
			Scope, timeline, and deliverables for each engagement are defined in a written project agreement or proposal
			signed by both parties.
		</p>

		<h2>2. Project Engagement</h2>
		<ul>
			<li>Work begins only after a written agreement (email or contract) is confirmed by both parties.</li>
			<li>
				Our standard packages start from <strong>₹50,000</strong> (Starter) up to <strong>₹1,50,000+</strong>{" "}
				(Professional / E-commerce / Custom).
			</li>
			<li>
				Timelines range from <strong>2 weeks</strong> (small projects) to <strong>8–12 weeks</strong> (full-stack /
				e-commerce). Custom timelines are agreed upon per project.
			</li>
			<li>
				Scope changes after project commencement may result in revised pricing and timeline, communicated transparently
				before additional work begins.
			</li>
		</ul>

		<h2>3. Client Responsibilities</h2>
		<ul>
			<li>Provide accurate, complete project requirements and content on time</li>
			<li>Designate a point of contact for timely approval and feedback</li>
			<li>Respect agreed payment milestones</li>
			<li>Ensure any third-party materials (images, copy, branding) you supply are properly licensed</li>
		</ul>

		<h2>4. Payments &amp; Refunds</h2>
		<ul>
			<li>
				A percentage deposit is required before work begins (typically 30–50%, as stated in your project agreement).
			</li>
			<li>Remaining payments are tied to agreed milestones or project completion.</li>
			<li>
				All payments are non-refundable once the corresponding milestone work has commenced, unless EasyDev fails to
				deliver as agreed.
			</li>
			<li>Late payments may result in a pause of active development until the outstanding balance is cleared.</li>
		</ul>

		<h2>5. Intellectual Property</h2>
		<ul>
			<li>
				Upon receipt of full payment, the client receives full ownership of all custom code, designs, and deliverables
				produced for their project.
			</li>
			<li>
				EasyDev retains the right to display completed work in our portfolio and case studies, unless the client
				requests confidentiality in writing.
			</li>
			<li>Any third-party libraries or open-source components used remain subject to their respective licences.</li>
		</ul>

		<h2>6. Confidentiality</h2>
		<p>
			Both parties agree to treat each other&apos;s confidential business information — including project details, trade
			secrets, and source code — as strictly private. Neither party will disclose such information to third parties
			without prior written consent, except as required by law.
		</p>

		<h2>7. Limitation of Liability</h2>
		<p>
			EasyDev&apos;s aggregate liability for any claim arising from our services is limited to the total fees paid by
			the client for the relevant project. We are not liable for indirect, incidental, consequential, or punitive
			damages — including loss of revenue, data, or business opportunity — arising from your use of deliverables or the
			easydev.in website.
		</p>

		<h2>8. Termination</h2>
		<ul>
			<li>
				Either party may terminate a project with <strong>7 days&apos; written notice</strong>.
			</li>
			<li>The client is responsible for paying for all work completed up to the termination date.</li>
			<li>
				EasyDev reserves the right to terminate an engagement immediately if the client acts in bad faith, engages in
				illegal activity, or fails to pay after a grace period.
			</li>
		</ul>

		<h2>9. Warranty &amp; Support</h2>
		<p>
			EasyDev provides a <strong>30-day bug-fix warranty</strong> after final delivery, covering defects in the
			delivered code that were not caused by client-side changes. Ongoing maintenance, new features, and post-warranty
			support are available as a separate engagement.
		</p>

		<h2>10. Governing Law</h2>
		<p>
			These Terms are governed by the laws of India. Any disputes arising from this agreement shall be subject to the
			exclusive jurisdiction of the courts of Mumbai, Maharashtra.
		</p>

		<h2>11. Contact Us</h2>
		<p>
			EasyDev — B-12, Andheri West, Mumbai, Maharashtra 400058, India
			<br />
			📧 <strong>contact@easydev.in</strong> &nbsp;|&nbsp; 📞 <strong>+91 8637317273</strong>
		</p>
	</>
);

// ── Modal Component ───────────────────────────────────────────────────────────
export default function LegalModal({ type, onClose }: LegalModalProps) {
	const overlayRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!type) return;
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handler);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", handler);
			document.body.style.overflow = "";
		};
	}, [type, onClose]);

	if (!type) return null;

	const isPrivacy = type === "privacy";
	const title = isPrivacy ? "Privacy Policy" : "Terms & Conditions";
	const Icon = isPrivacy ? Shield : FileText;
	const lastUpdated = "March 2025";

	return (
		<div
			ref={overlayRef}
			className='fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8'
			role='dialog'
			aria-modal='true'
			aria-labelledby='legal-modal-title'>
			{/* Backdrop */}
			<div
				className='absolute inset-0 bg-black/60 backdrop-blur-sm'
				onClick={onClose}
				aria-hidden='true'
			/>

			{/* Panel */}
			<div className='relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden'>
				{/* Header */}
				<div className='flex items-center justify-between px-6 py-5 border-b border-gray-200 shrink-0'>
					<div className='flex items-center gap-3'>
						<div className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center'>
							<Icon className='w-5 h-5 text-primary' />
						</div>
						<div>
							<h2
								id='legal-modal-title'
								className='text-lg font-bold text-gray-900'>
								{title}
							</h2>
							<p className='text-xs text-gray-500'>Last updated: {lastUpdated}</p>
						</div>
					</div>
					<button
						onClick={onClose}
						className='w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors'
						aria-label='Close'>
						<X className='w-5 h-5' />
					</button>
				</div>

				{/* Scrollable content */}
				<div
					className='overflow-y-auto flex-1 px-6 py-6 sm:px-8 space-y-1
          [&_h2]:text-sm [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-6 [&_h2]:mb-2 [&_h2]:uppercase [&_h2]:tracking-wide [&_h2]:text-primary
          [&_p]:text-sm [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-2
          [&_ul]:pl-5 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:mb-3
          [&_li]:text-sm [&_li]:text-gray-700 [&_li]:leading-relaxed'>
					{isPrivacy ? PRIVACY_CONTENT : TERMS_CONTENT}
				</div>

				{/* Footer */}
				<div className='px-6 py-4 border-t border-gray-200 flex items-center justify-between shrink-0 bg-gray-50'>
					<p className='text-xs text-gray-500'>© {new Date().getFullYear()} EasyDev. All rights reserved.</p>
					<button
						onClick={onClose}
						className='text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-lg transition-colors'>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
