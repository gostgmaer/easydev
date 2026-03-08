"use client";

import { useMemo } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InquiryItem, RequestLifecycleStatus } from "@/types/dashboard";
import { StatusBadge } from "@/components/dashboard/status-utils";

interface RequestsTableProps {
	loading: boolean;
	rows: InquiryItem[];
	search: string;
	onSearchChange: (value: string) => void;
	statusFilter: string;
	onStatusFilterChange: (value: string) => void;
	sort: "createdAt" | "updatedAt" | "name" | "email" | "status";
	order: "asc" | "desc";
	onSortChange: (sort: "createdAt" | "updatedAt" | "name" | "email" | "status") => void;
	onOrderChange: (order: "asc" | "desc") => void;
	page: number;
	totalPages: number;
	onPrevPage: () => void;
	onNextPage: () => void;
	onViewRequest: (row: InquiryItem) => void;
	onSendProposal: (row: InquiryItem) => void;
}

const statuses: Array<{ label: string; value: string }> = [
	{ label: "All Statuses", value: "all" },
	{ label: "New Request", value: "new" },
	{ label: "Under Review", value: "reviewing" },
	{ label: "Live Support", value: "contacted" },
	{ label: "Proposal Sent", value: "quoted" },
	{ label: "Ongoing", value: "negotiating" },
	{ label: "Proposal Accepted", value: "accepted" },
	{ label: "Completed", value: "completed" },
];

export default function RequestsTable({
	loading,
	rows,
	search,
	onSearchChange,
	statusFilter,
	onStatusFilterChange,
	sort,
	order,
	onSortChange,
	onOrderChange,
	page,
	totalPages,
	onPrevPage,
	onNextPage,
	onViewRequest,
	onSendProposal,
}: RequestsTableProps) {
	const noData = useMemo(() => !loading && rows.length === 0, [loading, rows.length]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Project Requests</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div className='grid gap-3 md:grid-cols-4'>
					<Input
						placeholder='Search name, email, company...'
						value={search}
						onChange={(e) => onSearchChange(e.target.value)}
						className='md:col-span-2'
					/>

					<Select
						value={statusFilter}
						onValueChange={onStatusFilterChange}>
						<SelectTrigger>
							<SelectValue placeholder='Filter by status' />
						</SelectTrigger>
						<SelectContent>
							{statuses.map((item) => (
								<SelectItem
									key={item.value}
									value={item.value}>
									{item.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<div className='grid grid-cols-2 gap-2'>
						<Select
							value={sort}
							onValueChange={(val) => onSortChange(val as RequestsTableProps["sort"])}>
							<SelectTrigger>
								<SelectValue placeholder='Sort' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='createdAt'>Request Date</SelectItem>
								<SelectItem value='updatedAt'>Last Update</SelectItem>
								<SelectItem value='name'>Name</SelectItem>
								<SelectItem value='email'>Email</SelectItem>
								<SelectItem value='status'>Status</SelectItem>
							</SelectContent>
						</Select>

						<Select
							value={order}
							onValueChange={(val) => onOrderChange(val as "asc" | "desc")}>
							<SelectTrigger>
								<SelectValue placeholder='Order' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='desc'>Desc</SelectItem>
								<SelectItem value='asc'>Asc</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Budget</TableHead>
							<TableHead>Project Type</TableHead>
							<TableHead>Request Date</TableHead>
							<TableHead>Last Update</TableHead>
							<TableHead className='text-right'>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading && (
							<TableRow>
								<TableCell
									colSpan={8}
									className='text-center text-muted-foreground'>
									Loading requests...
								</TableCell>
							</TableRow>
						)}

						{noData && (
							<TableRow>
								<TableCell
									colSpan={8}
									className='text-center text-muted-foreground'>
									No project requests found.
								</TableCell>
							</TableRow>
						)}

						{!loading &&
							rows.map((row) => (
								<TableRow key={row._id}>
									<TableCell>{row.name}</TableCell>
									<TableCell>{row.email}</TableCell>
									<TableCell>
										<StatusBadge status={row.status as RequestLifecycleStatus} />
									</TableCell>
									<TableCell>{row.budget}</TableCell>
									<TableCell>{row.projectType}</TableCell>
									<TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
									<TableCell>{new Date(row.updatedAt).toLocaleDateString()}</TableCell>
									<TableCell className='text-right'>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant='ghost'
													size='icon'
													aria-label='Actions'>
													<MoreHorizontal className='h-4 w-4' />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align='end'>
												<DropdownMenuItem onClick={() => onViewRequest(row)}>View Request</DropdownMenuItem>
												<DropdownMenuItem onClick={() => onSendProposal(row)}>Send Proposal</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>

				<div className='flex items-center justify-between'>
					<p className='text-sm text-muted-foreground'>
						Page {page} of {Math.max(totalPages, 1)}
					</p>
					<div className='flex items-center gap-2'>
						<Button
							variant='outline'
							onClick={onPrevPage}
							disabled={page <= 1 || loading}>
							Previous
						</Button>
						<Button
							variant='outline'
							onClick={onNextPage}
							disabled={page >= totalPages || loading}>
							Next
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
