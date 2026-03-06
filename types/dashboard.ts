export type RequestLifecycleStatus =
	| "new"
	| "reviewing"
	| "contacted"
	| "quoted"
	| "negotiating"
	| "accepted"
	| "rejected"
	| "completed"
	| "cancelled";

export interface AdminProfile {
	id?: string;
	_id?: string;
	email: string;
	name: string;
	role: string;
}

export interface AuthSession {
	token: string;
	refreshToken?: string;
	expiresIn?: string;
	admin: AdminProfile;
}

export interface DashboardStats {
	totalRequests: number;
	proposalSent: number;
	proposalAccepted: number;
	underReview: number;
	ongoing: number;
	completed: number;
	liveSupport: number;
}

export interface InquiryItem {
	_id: string;
	inquiryNumber?: number;
	name: string;
	email: string;
	phone?: string;
	company?: string;
	description: string;
	projectType: string;
	budget: string;
	timeline: string;
	status: RequestLifecycleStatus;
	proposalSent?: boolean;
	proposalUrl?: string;
	proposalSentAt?: string;
	quotedAmount?: number;
	quotedCurrency?: string;
	createdAt: string;
	updatedAt: string;
}

export interface InquiryListResult {
	inquiries: InquiryItem[];
	pagination: { page: number; limit: number; total: number; totalPages: number; hasNext: boolean; hasPrev: boolean };
}

export interface SendProposalPayload {
	proposalHtml: string;
	proposalUrl: string;
	quotedAmount?: number;
	currency?: string;
	note?: string;
}
