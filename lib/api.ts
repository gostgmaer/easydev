import { ContactSubmissionResponse } from "@/types/contact";
import { AuthSession, DashboardStats, InquiryItem, InquiryListResult, SendProposalPayload } from "@/types/dashboard";
import { veriable } from "./config";
import { ContactFormDataPre } from "@/lib/validations";
import { safeGet, safePost } from "./safe-fetch";
import { getAuthHeader } from "@/lib/auth-client";

const { baseURL } = veriable;

export const API_ENDPOINTS = {
	// Existing backend routes
	CONTACT_FORM: `${baseURL}/inquiry`,
	NEWSLETTER: `${baseURL}/newsletter/subscribe`,
	BLOG: `${baseURL}/blogs`,
	PLANS: `${baseURL}/plans`,
	PLANS_FEATURED: `${baseURL}/plans/featured`,
	AUTH_LOGIN: `${baseURL}/auth/login`,
	AUTH_VERIFY: `${baseURL}/auth/verify`,
	AUTH_FORGOT_PASSWORD: `${baseURL}/auth/forgot-password`,
	AUTH_RESET_PASSWORD: `${baseURL}/auth/reset-password`,
	INQUIRIES: `${baseURL}/inquiry`,
	INQUIRY_STATS: `${baseURL}/inquiry/stats`,
	UPLOAD_PROPOSAL: `${baseURL}/upload/proposal`,
};

/**
 * Contact Form API Integration
 * Backend expects inquiry payload shape on /api/inquiry
 */
export const submitContactForm = async (
  formData: any,
): Promise<ContactSubmissionResponse> => {
  try {
    if (!formData) {
      throw new Error("Form data is required");
    }

    // Map frontend form data to backend inquiry format
    const phone = formData?.client?.phone?.trim();
    const subject = formData?.message?.subject?.trim();
    const company = formData?.client?.companyName?.trim();
    const requirements: string[] =
      formData?.projectDetails?.servicesInterested || [];
    const budgetRange = formData?.projectDetails?.budgetRange?.trim();
    const timelinePreference =
      formData?.projectDetails?.timelinePreference?.trim();
    const payload = {
      name: formData?.client?.name,
      email: formData?.client?.email,
      ...(phone ? { phone } : {}),
      ...(company ? { company } : {}),
      ...(subject ? { subject } : {}),
      projectType: requirements[0] || "custom_website",
      budget: budgetRange || "discuss",
      timeline: timelinePreference || "flexible",
      description: formData?.message?.body,
      requirements,
      preferredContactMethod: formData?.preferences?.preferredContactMethod,
      newsletterOptIn: formData?.preferences?.newsletterOptIn ?? false,
      privacyConsent: formData?.preferences?.privacyConsent ?? false,
    };

    const result = await safePost<any>(API_ENDPOINTS.CONTACT_FORM, payload, { timeout: 30000 });

    if (!result.success) {
      throw new Error(result.error || "Failed to submit contact form.");
    }

    return {
      success: true,
      message:
        result.data?.message ||
        "Thank you for your inquiry. We will review your project and get back to you soon",
      id: result.data?.data?.id || result.data?.id,
    };
  } catch (error) {
    console.error(
      "Contact form submission error:",
      error instanceof Error ? error.message : String(error),
    );
    throw error;
  }
};

/**
 * Newsletter Subscription API
 */
export const subscribeToNewsletter = async (email: string) => {
  try {
    if (!email || typeof email !== "string") {
      throw new Error("Valid email address is required");
    }

    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      throw new Error("Invalid email format");
    }

    const result = await safePost<any>(API_ENDPOINTS.NEWSLETTER, { email: normalizedEmail }, { timeout: 30000 });

    if (!result.success) {
      throw new Error(result.error || "Failed to subscribe to newsletter.");
    }

    return result.data;
  } catch (error) {
    console.error(
      "Newsletter subscription error:",
      error instanceof Error ? error.message : String(error),
    );
    throw error;
  }
};

/**
 * Analytics Event Tracking
 * No backend analytics endpoint in current backend. Keep client-side only.
 */
export const trackEvent = async (eventData: any) => {
  try {
    if (!eventData || typeof eventData !== "object") {
      return;
    }

    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", eventData.event, {
        event_category: eventData.category,
        event_label: eventData.label,
        value: eventData.value,
      });
    }
  } catch (error) {
    console.warn(
      "Analytics error (ignored):",
      error instanceof Error ? error.message : String(error),
    );
  }
};

/**
 * No public projects endpoint in current backend.
 */
export const fetchProjects = async () => {
  return [];
};

/**
 * No public testimonials endpoint in current backend.
 */
export const fetchTestimonials = async () => {
  return [];
};

/**
 * Fetch Blog Posts with Error Handling
 */
export const fetchBlogPosts = async () => {
  try {
    const result = await safeGet<any>(API_ENDPOINTS.BLOG, { timeout: 30000 });

    if (!result.success) {
      console.warn("Blog fetch error:", result.error);
      return [];
    }

    const blogs = result.data?.data?.blogs || result.data?.blogs || result.data;
    return Array.isArray(blogs) ? blogs : [];
  } catch (error) {
    console.error(
      "Blog fetch error:",
      error instanceof Error ? error.message : String(error),
    );
    return [];
  }
};

/**
 * Fetch Plans with Error Handling
 */
export const fetchPlans = async (filters?: {
  category?: string;
  billingCycle?: string;
  targetAudience?: string;
}) => {
  try {
    const queryParams = new URLSearchParams();
    if (filters?.category) queryParams.append("category", filters.category);
    if (filters?.billingCycle)
      queryParams.append("billingCycle", filters.billingCycle);
    if (filters?.targetAudience)
      queryParams.append("targetAudience", filters.targetAudience);

    const url = `${API_ENDPOINTS.PLANS}${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const result = await safeGet<any>(url, { timeout: 30000 });

    if (!result.success) {
      console.warn("Plans fetch error:", result.error);
      return [];
    }

    const plans = result.data?.data?.plans || result.data?.plans || result.data;
    return Array.isArray(plans) ? plans : [];
  } catch (error) {
    console.error(
      "Plans fetch error:",
      error instanceof Error ? error.message : String(error),
    );
    return [];
  }
};

/**
 * Fetch Featured Plans with Error Handling
 */
export const fetchFeaturedPlans = async () => {
  try {
    const result = await safeGet<any>(API_ENDPOINTS.PLANS_FEATURED, { timeout: 30000 });

    if (!result.success) {
      console.warn("Featured plans fetch error:", result.error);
      return [];
    }

    const plans = result.data?.data?.plans || result.data?.plans || result.data;
    return Array.isArray(plans) ? plans : [];
  } catch (error) {
    console.error(
      "Featured plans fetch error:",
      error instanceof Error ? error.message : String(error),
    );
    return [];
  }
};

/**
 * Backend has no public email endpoint for this client app.
 */
export const sendEmail = async (_emailData: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) => {
  throw new Error("Email endpoint is not available in backend.");
};

/**
 * Backend has no upload endpoint for this client app.
 */
export const uploadFile = async (
  _file: File,
  _type: "resume" | "portfolio" | "image",
) => {
  throw new Error("Upload endpoint is not available in backend.");
};

/**
 * Backend has no search endpoint for this client app.
 */
export const searchContent = async (
  query: string,
  _filters?: { type?: "projects" | "blog" | "all"; category?: string },
) => {
  if (!query || typeof query !== "string" || query.trim().length === 0) {
    throw new Error("Search query is required");
  }
  return { results: [] as any[] };
};

export const loginAdmin = async (payload: { email: string; password: string }): Promise<AuthSession> => {
	const result = await safePost<any>(API_ENDPOINTS.AUTH_LOGIN, payload, { timeout: 30000 });

	if (!result.success) {
		throw new Error(result.error || "Login failed");
	}

	const data = result.data?.data;
	if (!data?.token || !data?.admin) {
		throw new Error("Invalid login response");
	}

	return { token: data.token, refreshToken: data.refreshToken, expiresIn: data.expiresIn, admin: data.admin };
};

export const verifyAdminToken = async (): Promise<boolean> => {
	const result = await safeGet<any>(API_ENDPOINTS.AUTH_VERIFY, {
		headers: getAuthHeader(),
		timeout: 15000,
		logRequest: false,
	});

	return !!result.success;
};

export const requestPasswordReset = async (email: string) => {
	const result = await safePost<any>(API_ENDPOINTS.AUTH_FORGOT_PASSWORD, { email }, { timeout: 30000 });

	if (!result.success) {
		throw new Error(
			result.error || "Password reset endpoint is unavailable. Please configure /api/auth/forgot-password in backend.",
		);
	}

	return result.data;
};

export const resetPasswordWithToken = async (payload: {
	token: string;
	newPassword: string;
	confirmPassword: string;
}) => {
	const result = await safePost<any>(API_ENDPOINTS.AUTH_RESET_PASSWORD, payload, { timeout: 30000 });

	if (!result.success) {
		throw new Error(
			result.error || "Reset password endpoint is unavailable. Please configure /api/auth/reset-password in backend.",
		);
	}

	return result.data;
};

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
	const result = await safeGet<any>(API_ENDPOINTS.INQUIRY_STATS, { headers: getAuthHeader(), timeout: 30000 });

	if (!result.success) {
		throw new Error(result.error || "Failed to fetch dashboard stats");
	}

	const byStatus = result.data?.data?.byStatus || {};
	const total = Number(result.data?.data?.total || 0);

	return {
		totalRequests: total,
		proposalSent: Number(byStatus.quoted || 0),
		proposalAccepted: Number(byStatus.accepted || 0),
		underReview: Number(byStatus.reviewing || 0),
		ongoing: Number(byStatus.negotiating || 0),
		completed: Number(byStatus.completed || 0),
		liveSupport: Number(byStatus.contacted || 0),
	};
};

export const fetchInquiries = async (params: {
	page?: number;
	limit?: number;
	sort?: "createdAt" | "updatedAt" | "name" | "email" | "status";
	order?: "asc" | "desc";
	search?: string;
	status?: string;
}): Promise<InquiryListResult> => {
	const query = new URLSearchParams();
	query.set("page", String(params.page ?? 1));
	query.set("limit", String(params.limit ?? 10));
	if (params.sort) query.set("sort", params.sort);
	if (params.order) query.set("order", params.order);
	if (params.search) query.set("search", params.search);
	if (params.status) query.set("status", params.status);

	const result = await safeGet<any>(`${API_ENDPOINTS.INQUIRIES}?${query.toString()}`, {
		headers: getAuthHeader(),
		timeout: 30000,
	});

	if (!result.success) {
		throw new Error(result.error || "Failed to fetch requests");
	}

	return {
		inquiries: (result.data?.data?.inquiries || []) as InquiryItem[],
		pagination: result.data?.data?.pagination || {
			page: 1,
			limit: 10,
			total: 0,
			totalPages: 1,
			hasNext: false,
			hasPrev: false,
		},
	};
};

export const fetchInquiryById = async (id: string): Promise<InquiryItem> => {
	const result = await safeGet<any>(`${API_ENDPOINTS.INQUIRIES}/${id}`, { headers: getAuthHeader(), timeout: 30000 });

	if (!result.success) {
		throw new Error(result.error || "Failed to fetch request details");
	}

	return result.data?.data?.inquiry as InquiryItem;
};

export const uploadProposalFile = async (file: File): Promise<{ url: string }> => {
	const content = await file.text();
	const payload = {
		fileName: file.name,
		mimeType: file.type || "text/html",
		contentBase64: btoa(unescape(encodeURIComponent(content))),
	};

	const result = await safePost<any>(API_ENDPOINTS.UPLOAD_PROPOSAL, payload, {
		headers: getAuthHeader(),
		timeout: 30000,
	});

	if (!result.success) {
		throw new Error(result.error || "Failed to upload proposal file");
	}

	return { url: result.data?.data?.url };
};

export const sendProposalForInquiry = async (inquiryId: string, payload: SendProposalPayload) => {
	const result = await safePost<any>(`${API_ENDPOINTS.INQUIRIES}/${inquiryId}/proposal`, payload, {
		headers: getAuthHeader(),
		timeout: 30000,
	});

	if (!result.success) {
		throw new Error(result.error || "Failed to send proposal");
	}

	return result.data?.data;
};

/**
 * Pre-launch / maintenance enquiry form submission
 */
export const submitContactFormPre = async (
  data: ContactFormDataPre,
): Promise<ContactSubmissionResponse> => {
  try {
    if (!data) {
      throw new Error("Form data is required");
    }

    const payload = {
			name: data.client.name,
			email: data.client.email,
			...(data.client.companyName?.trim() ? { company: data.client.companyName.trim() } : {}),
			subject: data.message.subject,
			description: data.message.body,
			projectType: "maintenance",
			preferredContactMethod: data.preferences.preferredContactMethod,
			newsletterOptIn: data.preferences.newsletterOptIn,
			privacyConsent: data.preferences.privacyConsent,
		};

		const result = await safePost<any>(API_ENDPOINTS.CONTACT_FORM, payload, { timeout: 30000 });

		if (!result.success) {
			throw new Error(result.error || "Failed to submit enquiry.");
		}

    return {
			success: true,
			message: result.data?.message || "Thank you for your interest! We'll be in touch soon.",
			id: result.data?.data?.id || result.data?.id,
		};
  } catch (error) {
    console.error("Pre-launch form submission error:", error instanceof Error ? error.message : String(error));
    throw error;
  }
};

/**
 * No backend vitals endpoint in current backend.
 */
export const reportWebVitals = async (_metric: {
  name: string;
  value: number;
  id: string;
}) => {
  return;
};
