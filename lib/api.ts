import { ContactSubmissionResponse } from "@/types/contact";
import { veriable } from "./config";
import { ContactFormDataPre } from "@/components/sections/contact/Form";
import { safeGet, safePost } from "./safe-fetch";

const { baseURL, tenantId } = veriable;

// ─── Endpoint Map ─────────────────────────────────────────────────────────────
export const API_ENDPOINTS = {
  // Health
  HEALTH: `${baseURL}/health`,
  READY: `${baseURL}/ready`,

  // Lead / Inquiry (proxied → lead-microservice)
  LEAD_SUBMIT: `${baseURL}/leads/submit`,
  LEAD_LIST: `${baseURL}/leads`,
  LEAD_STATS: `${baseURL}/leads/stats`,
  LEAD_SEARCH: `${baseURL}/leads/search`,
  LEAD_EXPORT: `${baseURL}/leads/export`,
  LEAD_BULK_UPDATE: `${baseURL}/leads/bulk-update`,
  LEAD_DETAIL: (id: string) => `${baseURL}/leads/${id}`,
  LEAD_STATUS: (id: string) => `${baseURL}/leads/${id}/status`,
  LEAD_WON: (id: string) => `${baseURL}/leads/${id}/won`,
  LEAD_LOST: (id: string) => `${baseURL}/leads/${id}/lost`,
  LEAD_PROPOSAL_SEND: (id: string) => `${baseURL}/leads/${id}/proposal`,
  LEAD_PROPOSAL_ACCEPT: (id: string) =>
    `${baseURL}/leads/${id}/proposal/accept`,
  LEAD_PROPOSAL_DECLINE: (id: string) =>
    `${baseURL}/leads/${id}/proposal/decline`,
  LEAD_CONTRACT_SEND: (id: string) => `${baseURL}/leads/${id}/contract`,
  LEAD_CONTRACT_SIGNED: (id: string) =>
    `${baseURL}/leads/${id}/contract/signed`,

  // Newsletter (owned by web-agency-backend-api)
  NEWSLETTER_SUBSCRIBE: `${baseURL}/newsletter/subscribe`,
  NEWSLETTER_CONFIRM: (token: string) =>
    `${baseURL}/newsletter/confirm/${token}`,
  NEWSLETTER_UNSUBSCRIBE: `${baseURL}/newsletter/unsubscribe`,
  NEWSLETTER_TRACK_OPEN: `${baseURL}/newsletter/track/open`,
  NEWSLETTER_TRACK_CLICK: `${baseURL}/newsletter/track/click`,

  // File uploads (proxied → file-upload-service)
  FILES_UPLOAD: `${baseURL}/files/upload`,
  FILES_LIST: `${baseURL}/files`,
  FILE_DETAIL: (id: string) => `${baseURL}/files/${id}`,
  FILE_DOWNLOAD: (id: string) => `${baseURL}/files/${id}/download`,

  // Proposal upload (owned by web-agency-backend-api, auth required)
  UPLOAD_PROPOSAL: `${baseURL}/upload/proposal`,

  // Budget / cost calculator (public, no auth required)
  CALCULATOR_ESTIMATE: `${baseURL}/calculator/estimate`,
  CALCULATOR_PROFILES: `${baseURL}/calculator/profiles`,

  // Auth (proxied → user-auth-service)
  AUTH_LOGIN: `${baseURL}/auth/login`,
  AUTH_LOGOUT: `${baseURL}/auth/logout`,
  AUTH_REGISTER: `${baseURL}/auth/register`,
  AUTH_REFRESH: `${baseURL}/auth/token/refresh`,
  AUTH_VERIFY: `${baseURL}/auth/token/verify`,
  AUTH_ME: `${baseURL}/auth/me`,
  AUTH_PASSWORD_FORGOT: `${baseURL}/auth/password/forgot`,
  AUTH_PASSWORD_RESET: `${baseURL}/auth/password/reset`,
  AUTH_EMAIL_VERIFY: `${baseURL}/auth/email/verify`,

  // Backward-compat aliases
  CONTACT_FORM: `${baseURL}/leads/submit`,
  NEWSLETTER: `${baseURL}/newsletter/subscribe`,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Default headers for every request (adds tenant context) */
function apiHeaders(extra?: Record<string, string>): Record<string, string> {
  // Only inject x-tenant-id when a value is configured.
  // If omitted, the backend falls back to its own DEFAULT_TENANT_ID env var.
  const headers: Record<string, string> = { ...extra };
  if (tenantId) headers["x-tenant-id"] = tenantId;
  return headers;
}

/** Map frontend budget value to backend enum */
function mapBudget(budget?: string): string {
  const map: Record<string, string> = {
    // USD-denominated keys (legacy)
    "under-5k": "under-5k",
    "5k-10k": "5k-10k",
    "10k-25k": "10k-25k",
    "25k-50k": "25k-50k",
    "50k-100k": "50k-100k",
    "over-100k": "over-100k",
    // INR-denominated keys from BUDGET_RANGES in data/contact.ts
    under_50k: "under-5k", // ₹50k ≈ <$600
    "50k_150k": "5k-10k", // ₹50k–₹1.5L
    "150k_500k": "10k-25k", // ₹1.5L–₹5L
    "500k_1500k": "25k-50k", // ₹5L–₹15L
    "1500k_plus": "over-100k", // ₹15L+
    // Catch-alls
    discuss: "not-sure",
    flexible: "not-sure",
  };
  return (budget && map[budget]) ?? "not-sure";
}

/** Map frontend timeline key to backend enum */
function mapTimeline(timeline?: string): string {
  const map: Record<string, string> = {
    // Keys from TIMELINE_OPTIONS in data/contact.ts
    "2_weeks": "asap",
    "4_6_weeks": "1-month",
    "6_8_weeks": "2-3months",
    "8_12_weeks": "2-3months",
    "12_14_weeks": "3-6months",
    "6_months_plus": "6months+",
    flexible: "flexible",
    // Backend native values passthrough
    asap: "asap",
    "1-month": "1-month",
    "2-3months": "2-3months",
    "3-6months": "3-6months",
    "6months+": "6months+",
  };
  return (timeline && map[timeline]) ?? "flexible";
}

/** Map frontend service/project-type key to backend enum */
function mapProjectType(type?: string): string {
  const map: Record<string, string> = {
    // Keys from SERVICE_OPTIONS in data/contact.ts
    custom_website: "website",
    backend_api: "webapp",
    admin_dashboard: "webapp",
    bug_fixing: "maintenance",
    payment_integration: "ecommerce",
    third_party_integration: "webapp",
    auth_setup: "webapp",
    realtime_features: "webapp",
    seo_friendly: "website",
    consultation: "consulting",
    maintenance: "maintenance",
    // Backend native values
    website: "website",
    webapp: "webapp",
    mobile: "mobile",
    ecommerce: "ecommerce",
    redesign: "redesign",
    consulting: "consulting",
  };
  return (type && map[type.toLowerCase()]) ?? "other";
}

/** Map frontend preferred-contact label to backend lowercase enum */
function mapContactMethod(method?: string): string {
  const map: Record<string, string> = {
    Email: "email",
    Phone: "phone",
    WhatsApp: "whatsapp",
    email: "email",
    phone: "phone",
    whatsapp: "whatsapp",
  };
  return (method && map[method]) ?? "any";
}

// ─── Lead / Inquiry Submission (public) ──────────────────────────────────────
/**
 * Submit a project inquiry / contact form.
 * POSTs to /api/leads/submit via the backend proxy to the lead-microservice.
 * Requires x-tenant-id header (set from NEXT_PUBLIC_TENANT_ID env var).
 */
export const submitContactForm = async (
  formData: any,
): Promise<ContactSubmissionResponse> => {
  if (!formData) throw new Error("Form data is required");

  // Split full name → firstName / lastName
  // If only one word is given, use it as both so lastName never fails notEmpty()
  const fullName: string = (formData?.client?.name ?? "").trim();
  const spaceIdx = fullName.indexOf(" ");
  const firstName = spaceIdx > -1 ? fullName.slice(0, spaceIdx) : fullName;
  const lastName = spaceIdx > -1 ? fullName.slice(spaceIdx + 1) : fullName;

  const phone = formData?.client?.phone?.trim();
  const company = formData?.client?.companyName?.trim();
  const subject = formData?.message?.subject?.trim();
  const services: string[] = formData?.projectDetails?.servicesInterested ?? [];

  const payload = {
    firstName,
    lastName,
    email: formData?.client?.email,
    subject: subject || "Project Inquiry",
    message: formData?.message?.body,
    ...(phone ? { phone } : {}),
    gdprConsent: formData?.preferences?.privacyConsent ?? false,
    budget: mapBudget(formData?.projectDetails?.budgetRange),
    timeline: mapTimeline(formData?.projectDetails?.timelinePreference),
    projectType: mapProjectType(services[0]),
    preferredContactMethod: mapContactMethod(
      formData?.preferences?.preferredContactMethod,
    ),
    customFields: {
      ...(company ? { company } : {}),
      newsletterOptIn: formData?.preferences?.newsletterOptIn ?? false,
      services,
    },
  };

  const result = await safePost<any>(API_ENDPOINTS.LEAD_SUBMIT, payload, {
    headers: apiHeaders(),
    timeout: 30000,
  });

  if (!result.success)
    throw new Error(result.error || "Failed to submit inquiry.");

  return {
    success: true,
    message:
      result.data?.message ??
      "Thank you for your inquiry. We will review your project and get back to you soon.",
    id: result.data?.data?.id ?? result.data?.id,
  };
};

// ─── Newsletter ───────────────────────────────────────────────────────────────

/** Subscribe to the newsletter. Backend sends a double opt-in confirmation email. */
export const subscribeToNewsletter = async (email: string) => {
  if (!email || typeof email !== "string")
    throw new Error("Valid email address is required");

  const normalizedEmail = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail))
    throw new Error("Invalid email format");

  const result = await safePost<any>(
    API_ENDPOINTS.NEWSLETTER_SUBSCRIBE,
    { email: normalizedEmail },
    { headers: apiHeaders(), timeout: 30000 },
  );

  if (!result.success)
    throw new Error(result.error || "Failed to subscribe to newsletter.");
  return result.data;
};

/** Confirm a newsletter subscription using the token from the confirmation email link. */
export const confirmNewsletterSubscription = async (token: string) => {
  if (!token) throw new Error("Confirmation token is required");
  const result = await safeGet<any>(API_ENDPOINTS.NEWSLETTER_CONFIRM(token), {
    timeout: 15000,
  });
  if (!result.success)
    throw new Error(result.error || "Failed to confirm subscription.");
  return result.data;
};

/** Unsubscribe an email address from the newsletter. */
export const unsubscribeFromNewsletter = async (
  email: string,
  reason?: string,
  feedback?: string,
) => {
  if (!email) throw new Error("Email is required");
  const result = await safePost<any>(
    API_ENDPOINTS.NEWSLETTER_UNSUBSCRIBE,
    {
      email: email.trim().toLowerCase(),
      ...(reason ? { reason } : {}),
      ...(feedback ? { feedback } : {}),
    },
    { headers: apiHeaders(), timeout: 15000 },
  );
  if (!result.success)
    throw new Error(result.error || "Failed to unsubscribe.");
  return result.data;
};

/** Fire-and-forget: notify the backend that a newsletter email was opened. */
export const trackNewsletterOpen = (email: string): void => {
  safePost(
    API_ENDPOINTS.NEWSLETTER_TRACK_OPEN,
    { email },
    { timeout: 5000 },
  ).catch(() => {});
};

/** Fire-and-forget: notify the backend that a newsletter email link was clicked. */
export const trackNewsletterClick = (email: string): void => {
  safePost(
    API_ENDPOINTS.NEWSLETTER_TRACK_CLICK,
    { email },
    { timeout: 5000 },
  ).catch(() => {});
};

// ─── Proposal Upload (auth required) ─────────────────────────────────────────
/**
 * Upload a proposal HTML file to the backend.
 * Requires a valid access token (obtained from user-auth-service login).
 */
export const uploadProposal = async (
  contentBase64: string,
  options?: { fileName?: string; mimeType?: string; accessToken?: string },
) => {
  const result = await safePost<any>(
    API_ENDPOINTS.UPLOAD_PROPOSAL,
    {
      contentBase64,
      ...(options?.fileName ? { fileName: options.fileName } : {}),
      ...(options?.mimeType ? { mimeType: options.mimeType } : {}),
    },
    {
      headers: apiHeaders(
        options?.accessToken
          ? { Authorization: `Bearer ${options.accessToken}` }
          : {},
      ),
      timeout: 60000,
    },
  );
  if (!result.success)
    throw new Error(result.error || "Proposal upload failed.");
  return result.data;
};

// ─── Authentication (proxied → user-auth-service) ─────────────────────────────

export type AuthTokens = { accessToken: string; refreshToken: string };
export type AuthUser = {
  id: string;
  email: string;
  role: string;
  tenantId: string;
  sessionId?: string;
};

/** Login with email + password. Returns accessToken + refreshToken. */
export const loginUser = async (
  email: string,
  password: string,
): Promise<AuthTokens & { user?: AuthUser }> => {
  const result = await safePost<any>(
    API_ENDPOINTS.AUTH_LOGIN,
    { email, password },
    { headers: apiHeaders(), timeout: 15000 },
  );
  if (!result.success)
    throw new Error(result.error || "Login failed. Check your credentials.");
  const data = result.data?.data ?? result.data;
  return {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    user: data.user,
  };
};

/** Send a password-reset link to the given email address. */
export const forgotPassword = async (email: string): Promise<void> => {
  const result = await safePost<any>(
    API_ENDPOINTS.AUTH_PASSWORD_FORGOT,
    { email },
    { headers: apiHeaders(), timeout: 15000 },
  );
  if (!result.success)
    throw new Error(result.error || "Failed to send reset email.");
};

/**
 * Exchange a refresh token for a fresh access token.
 * Returns the new accessToken, or throws on failure (e.g. expired refresh token).
 */
export const refreshAccessToken = async (token: string): Promise<string> => {
  const result = await safePost<any>(
    API_ENDPOINTS.AUTH_REFRESH,
    { refreshToken: token },
    { headers: apiHeaders(), timeout: 15000 },
  );
  if (!result.success)
    throw new Error(result.error || "Session expired. Please log in again.");
  const data = result.data?.data ?? result.data;
  return data.accessToken as string;
};

/** Fetch the profile of the currently authenticated user. */
export const getCurrentUser = async (
  accessToken: string,
): Promise<AuthUser> => {
  const result = await safeGet<any>(API_ENDPOINTS.AUTH_ME, {
    headers: { Authorization: `Bearer ${accessToken}`, ...apiHeaders() },
    timeout: 10000,
  });
  if (!result.success)
    throw new Error(result.error || "Failed to fetch user profile.");
  return (result.data?.data ?? result.data) as AuthUser;
};

// ─── Lead Management (protected — requires accessToken) ───────────────────────

export type LeadListParams = {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
};

/** Fetch paginated leads list. Requires a valid access token. */
export const getLeads = async (
  params: LeadListParams = {},
  accessToken: string,
) => {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.status) query.set("status", params.status);
  if (params.search) query.set("q", params.search);
  const url = `${API_ENDPOINTS.LEAD_LIST}${query.toString() ? `?${query}` : ""}`;
  const result = await safeGet<any>(url, {
    headers: { Authorization: `Bearer ${accessToken}`, ...apiHeaders() },
    timeout: 20000,
  });
  if (!result.success)
    throw new Error(result.error || "Failed to fetch leads.");
  return result.data;
};

/** Fetch a single lead by ID. Requires a valid access token. */
export const getLead = async (id: string, accessToken: string) => {
  const result = await safeGet<any>(API_ENDPOINTS.LEAD_DETAIL(id), {
    headers: { Authorization: `Bearer ${accessToken}`, ...apiHeaders() },
    timeout: 10000,
  });
  if (!result.success) throw new Error(result.error || "Failed to fetch lead.");
  return result.data?.data ?? result.data;
};

/** Send a proposal to a lead (requires proposalUrl, quotedAmount). */
export const sendLeadProposal = async (
  leadId: string,
  data: { proposalUrl: string; quotedAmount: number; quotedCurrency?: string },
  accessToken: string,
) => {
  const result = await safePost<any>(
    API_ENDPOINTS.LEAD_PROPOSAL_SEND(leadId),
    data,
    {
      headers: { Authorization: `Bearer ${accessToken}`, ...apiHeaders() },
      timeout: 20000,
    },
  );
  if (!result.success)
    throw new Error(result.error || "Failed to send proposal.");
  return result.data;
};

// ─── Analytics (client-side only) ────────────────────────────────────────────
/**
 * Track a GA4 event. No backend endpoint — fires directly via gtag.
 */
export const trackEvent = async (eventData: any) => {
  try {
    if (!eventData || typeof eventData !== "object") return;
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

// ─── Not available in this service ───────────────────────────────────────────
// Blogs and pricing plans are owned by separate services not connected to this backend.

export const fetchProjects = async (): Promise<any[]> => [];
export const fetchTestimonials = async (): Promise<any[]> => [];
export const fetchBlogPosts = async (): Promise<any[]> => [];
export const fetchPlans = async (_?: {
  category?: string;
  billingCycle?: string;
  targetAudience?: string;
}): Promise<any[]> => [];
export const fetchFeaturedPlans = async (): Promise<any[]> => [];

// ─── Budget / cost calculator ─────────────────────────────────────────────────

export type CalculatorInput = {
  /** Total project amount (required unless customBreakdown is supplied) */
  amount?: number;
  /** ISO currency code — default "INR" */
  currency?: "INR" | "USD" | "EUR" | "GBP";
  /** Project category */
  projectType?: "website" | "webapp" | "ecommerce" | "mobile" | "other";
  /** Complexity tier */
  complexityLevel?: "basic" | "standard" | "advanced" | "enterprise";
  /** Human-readable label shown in the proposal */
  projectName?: string;
  /**
   * Override the automatic cost split.
   * Keys: design | frontend | backend | testing | projectManagement | deployment
   * Values: absolute amounts (will be normalised to percentages internally).
   */
  customBreakdown?: {
    design?: number;
    frontend?: number;
    backend?: number;
    testing?: number;
    projectManagement?: number;
    deployment?: number;
  };
};

/**
 * POST /api/calculator/estimate
 * Returns a full cost breakdown, maintenance plans (1/3/5-year),
 * server-tier scenarios, TCO and ready-to-use proposal scenarios.
 */
export const getProjectEstimate = async (params: CalculatorInput) => {
  if (!params.amount && !params.customBreakdown) {
    throw new Error('Provide either "amount" or "customBreakdown".');
  }
  const result = await safePost<any>(
    API_ENDPOINTS.CALCULATOR_ESTIMATE,
    params,
    {
      headers: apiHeaders(),
    },
  );
  if (!result.success)
    throw new Error(result.error || "Estimate request failed.");
  return result.data as {
    summary: Record<string, any>;
    projectBreakdown: Record<string, any>;
    maintenancePlans: Record<string, any>;
    serverCosts: Record<string, any>;
    totalCostOfOwnership: Record<string, any>;
    comparisonTable: any[];
    proposalScenarios: any[];
  };
};

/**
 * GET /api/calculator/profiles
 * Returns all available project-type / complexity combinations so dropdowns
 * can be built dynamically.
 */
export const getCalculatorProfiles = async () => {
  const result = await safeGet<any>(API_ENDPOINTS.CALCULATOR_PROFILES, {
    headers: apiHeaders(),
  });
  if (!result.success)
    throw new Error(result.error || "Failed to load profiles.");
  return result.data as {
    projectTypes: string[];
    complexityLevels: string[];
    profiles: Record<string, Record<string, any>>;
    serverTiers: any[];
  };
};

// ─── Legacy / no-op stubs ────────────────────────────────────────────────────

/** @deprecated Use uploadProposal() or the /api/files/upload endpoint instead. */
export const uploadFile = async (
  _file: File,
  _type: "resume" | "portfolio" | "image",
) => {
  throw new Error(
    "Use uploadProposal() for proposals, or POST /api/files/upload for general file storage.",
  );
};

/** Email is sent server-side via the email-microservice. Not callable from the client. */
export const sendEmail = async (_emailData: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) => {
  throw new Error(
    "Email is dispatched server-side through the email-microservice.",
  );
};

export const searchContent = async (
  query: string,
  _filters?: { type?: "projects" | "blog" | "all"; category?: string },
) => {
  if (!query?.trim()) throw new Error("Search query is required");
  return { results: [] as any[] };
};

/**
 * Kept for components importing this name. Simulates success without a real API call.
 * Replace call sites with submitContactForm() to use the real backend.
 */
export const submitContactFormPre = async (
  data: ContactFormDataPre,
): Promise<ContactSubmissionResponse> => {
  if (!data) throw new Error("Form data is required");
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    success: true,
    message: "Thank you for your interest! We'll be in touch soon.",
    id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };
};

export const reportWebVitals = async (_metric: {
  name: string;
  value: number;
  id: string;
}) => {};
