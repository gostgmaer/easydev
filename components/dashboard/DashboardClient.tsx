"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import DashboardStatsCards from "@/components/dashboard/DashboardStats";
import RequestDetailsDialog from "@/components/dashboard/RequestDetailsDialog";
import RequestsTable from "@/components/dashboard/RequestsTable";
import SendProposalDialog from "@/components/dashboard/SendProposalDialog";
import {
	fetchDashboardStats,
	fetchInquiryById,
	fetchInquiries,
	sendProposalForInquiry,
	uploadProposalFile,
} from "@/lib/api";
import { DashboardStats, InquiryItem } from "@/types/dashboard";

const initialStats: DashboardStats = {
	totalRequests: 0,
	proposalSent: 0,
	proposalAccepted: 0,
	underReview: 0,
	ongoing: 0,
	completed: 0,
	liveSupport: 0,
};

export default function DashboardClient() {
	const [stats, setStats] = useState<DashboardStats>(initialStats);
	const [rows, setRows] = useState<InquiryItem[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [sending, setSending] = useState<boolean>(false);

	const [page, setPage] = useState<number>(1);
	const [limit] = useState<number>(10);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [searchInput, setSearchInput] = useState<string>("");
	const [search, setSearch] = useState<string>("");
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const [sort, setSort] = useState<"createdAt" | "updatedAt" | "name" | "email" | "status">("createdAt");
	const [order, setOrder] = useState<"asc" | "desc">("desc");

	const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
	const [proposalOpen, setProposalOpen] = useState<boolean>(false);
	const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);

	useEffect(() => {
		const t = window.setTimeout(() => {
			setSearch(searchInput.trim());
			setPage(1);
		}, 350);

		return () => window.clearTimeout(t);
	}, [searchInput]);

	const loadDashboard = useCallback(async () => {
		setLoading(true);
		try {
			const [statsRes, inquiriesRes] = await Promise.all([
				fetchDashboardStats(),
				fetchInquiries({
					page,
					limit,
					search: search || undefined,
					status: statusFilter === "all" ? undefined : statusFilter,
					sort,
					order,
				}),
			]);

			setStats(statsRes);
			setRows(inquiriesRes.inquiries);
			setTotalPages(inquiriesRes.pagination.totalPages || 1);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Failed to load dashboard");
		} finally {
			setLoading(false);
		}
	}, [limit, order, page, search, sort, statusFilter]);

	useEffect(() => {
		void loadDashboard();
	}, [loadDashboard]);

	const handleViewRequest = async (inquiry: InquiryItem) => {
		try {
			const full = await fetchInquiryById(inquiry._id);
			setSelectedInquiry(full);
			setDetailsOpen(true);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Failed to load request details");
		}
	};

	const handleOpenProposal = async (inquiry: InquiryItem) => {
		try {
			const full = await fetchInquiryById(inquiry._id);
			setSelectedInquiry(full);
			setProposalOpen(true);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Failed to load request details");
		}
	};

	const handleSendProposal = async (payload: { proposalHtml: string; quotedAmount?: number; currency?: string }) => {
		if (!selectedInquiry) return;

		setSending(true);
		try {
			const fileName = `proposal-${selectedInquiry.inquiryNumber || selectedInquiry._id}.html`;
			const file = new File([payload.proposalHtml], fileName, { type: "text/html" });

			const uploadResult = await uploadProposalFile(file);

			await sendProposalForInquiry(selectedInquiry._id, {
				proposalHtml: payload.proposalHtml,
				proposalUrl: uploadResult.url,
				quotedAmount: payload.quotedAmount,
				currency: payload.currency,
			});

			toast.success("Proposal sent successfully");
			setProposalOpen(false);
			await loadDashboard();
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Failed to send proposal");
		} finally {
			setSending(false);
		}
	};

	const title = useMemo(() => {
		return `Dashboard Overview`;
	}, []);

	return (
		<div className='space-y-6'>
			<header>
				<h1 className='text-2xl font-semibold tracking-tight'>{title}</h1>
				<p className='text-sm text-muted-foreground'>Manage client requests and send proposals.</p>
			</header>

			<DashboardStatsCards stats={stats} />

			<RequestsTable
				loading={loading}
				rows={rows}
				search={searchInput}
				onSearchChange={setSearchInput}
				statusFilter={statusFilter}
				onStatusFilterChange={(value) => {
					setStatusFilter(value);
					setPage(1);
				}}
				sort={sort}
				order={order}
				onSortChange={(value) => {
					setSort(value);
					setPage(1);
				}}
				onOrderChange={(value) => {
					setOrder(value);
					setPage(1);
				}}
				page={page}
				totalPages={totalPages}
				onPrevPage={() => setPage((p) => Math.max(1, p - 1))}
				onNextPage={() => setPage((p) => Math.min(totalPages, p + 1))}
				onViewRequest={handleViewRequest}
				onSendProposal={handleOpenProposal}
			/>

			<RequestDetailsDialog
				open={detailsOpen}
				inquiry={selectedInquiry}
				onOpenChange={setDetailsOpen}
			/>

			<SendProposalDialog
				open={proposalOpen}
				inquiry={selectedInquiry}
				submitting={sending}
				onOpenChange={setProposalOpen}
				onSubmit={handleSendProposal}
			/>
		</div>
	);
}
