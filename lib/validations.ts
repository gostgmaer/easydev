import { z } from "zod";

export const contactFormSchema = z
	.object({
		client: z.object({
			name: z
				.string()
				.min(2, "Name must be at least 2 characters")
				.max(50, "Name must be less than 50 characters")
				.regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
			email: z.string().email("Please enter a valid email address").max(100, "Email must be less than 100 characters"),
			phone: z
				.string()
				.optional()
				.refine(
					(val) => !val || /^[\+]?[1-9][\d]{0,15}$/.test(val.replace(/[\s\-\(\)]/g, "")),
					"Please enter a valid phone number",
				),
			companyName: z.string().max(100, "Company name must be less than 100 characters").optional(),
		}),
		projectDetails: z.object({
			servicesInterested: z.array(z.string()).min(1, "Please select at least one service"),
			budgetRange: z.string().optional(),
			timelinePreference: z.string().optional(),
		}),
		message: z.object({
			subject: z.string().max(100, "Subject must be less than 100 characters").optional(),
			body: z
				.string()
				.min(20, "Please provide more details about your project (minimum 20 characters)")
				.max(2000, "Message must be less than 2000 characters"),
		}),
		preferences: z.object({
			preferredContactMethod: z.enum(["Email", "Phone", "WhatsApp"]),
			newsletterOptIn: z.boolean(),
			privacyConsent: z.boolean().refine((val) => val === true, "You must agree to the Privacy Policy"),
		}),
	})
	.superRefine((data, ctx) => {
		// require phone when contact method is phone/whatsapp
		if (
			(data.preferences.preferredContactMethod === "Phone" || data.preferences.preferredContactMethod === "WhatsApp") &&
			!data.client.phone
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Phone number is required when using Phone or WhatsApp as contact method",
				path: ["client", "phone"],
			});
		}
	});

export type ContactFormData = z.infer<typeof contactFormSchema>;
