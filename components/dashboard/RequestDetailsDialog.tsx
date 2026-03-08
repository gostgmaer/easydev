"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InquiryItem } from "@/types/dashboard";
import { getStatusLabel } from "@/components/dashboard/status-utils";

interface RequestDetailsDialogProps {
	open: boolean;
	inquiry: InquiryItem | null;
	onOpenChange: (open: boolean) => void;
}

function Row({ label, value }: { label: string; value?: string | number | null }) {
	return (
		<div className='grid grid-cols-3 gap-3 border-b py-2 text-sm'>
			<span className='font-medium text-muted-foreground'>{label}</span>
			<span className='col-span-2 break-words'>{value || "-"}</span>
		</div>
	);
}

export default function RequestDetailsDialog({ open, inquiry, onOpenChange }: RequestDetailsDialogProps) {
	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}>
			<DialogContent className='max-h-[90vh] max-w-2xl overflow-y-auto'>
				<DialogHeader>
					<DialogTitle>Request Details</DialogTitle>
					<DialogDescription>Read-only details for inquiry #{inquiry?.inquiryNumber || "-"}.</DialogDescription>
				</DialogHeader>

				{inquiry ?
					<div className='space-y-1'>
						<Row
							label='Name'
							value={inquiry.name}
						/>
						<Row
							label='Email'
							value={inquiry.email}
						/>
						<Row
							label='Phone'
							value={inquiry.phone}
						/>
						<Row
							label='Project Type'
							value={inquiry.projectType}
						/>
						<Row
							label='Budget'
							value={inquiry.budget}
						/>
						<Row
							label='Timeline'
							value={inquiry.timeline}
						/>
						<Row
							label='Description'
							value={inquiry.description}
						/>
						<Row
							label='Request Date'
							value={new Date(inquiry.createdAt).toLocaleString()}
						/>
						<Row
							label='Current Status'
							value={getStatusLabel(inquiry.status)}
						/>
					</div>
				:	<p className='text-sm text-muted-foreground'>No request selected.</p>}
			</DialogContent>
		</Dialog>
	);
}
