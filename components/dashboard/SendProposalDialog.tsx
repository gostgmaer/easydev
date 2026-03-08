"use client";

import { useEffect, useMemo, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { InquiryItem } from "@/types/dashboard";

interface SendProposalDialogProps {
	open: boolean;
	inquiry: InquiryItem | null;
	submitting: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (payload: { proposalHtml: string; quotedAmount?: number; currency?: string }) => Promise<void>;
}

function generateProposalReference() {
	const now = new Date();
	const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
	const rand = Math.floor(Math.random() * 900 + 100);
	return `ED-${stamp}-${rand}`;
}

function templateFor(inquiry: InquiryItem) {
	const today = new Date().toLocaleDateString();
	const reference = generateProposalReference();
	const projectName = inquiry.company || `${inquiry.name} Project`;

	return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Proposal ${reference}</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
    <h1 style="margin-bottom: 4px;">EasyDev Project Proposal</h1>
    <p style="margin-top: 0; color: #4b5563;">Reference: ${reference} | Date: ${today}</p>

    <h2>Client</h2>
    <p>Name: ${inquiry.name}<br/>Email: ${inquiry.email}</p>

    <h2>Project</h2>
    <p>Project Name: ${projectName}<br/>Project Type: ${inquiry.projectType}<br/>Budget: ${inquiry.budget}<br/>Timeline: ${inquiry.timeline}</p>

    <h2>Scope Summary</h2>
    <p>${inquiry.description}</p>

    <h2>Company Information</h2>
    <p>EasyDev<br/>https://www.easydev.in<br/>hello@easydev.in</p>
  </body>
</html>`;
}

export default function SendProposalDialog({
	open,
	inquiry,
	submitting,
	onOpenChange,
	onSubmit,
}: SendProposalDialogProps) {
	const [amount, setAmount] = useState<string>("");
	const [currency, setCurrency] = useState<string>("USD");
	const [proposalHtml, setProposalHtml] = useState<string>("");
	const title = useMemo(() => (inquiry ? `Send Proposal: ${inquiry.name}` : "Send Proposal"), [inquiry]);

	useEffect(() => {
		if (!inquiry) return;
		setProposalHtml(templateFor(inquiry));
		setAmount(inquiry.quotedAmount ? String(inquiry.quotedAmount) : "");
		setCurrency(inquiry.quotedCurrency || "USD");
	}, [inquiry]);

	const handleSubmit = async () => {
		const parsedAmount = amount.trim() ? Number(amount) : undefined;

		await onSubmit({ proposalHtml, quotedAmount: parsedAmount, currency });
	};

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}>
			<DialogContent className='max-h-[92vh] max-w-4xl overflow-y-auto'>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>Edit proposal HTML and submit to upload + send workflow.</DialogDescription>
				</DialogHeader>

				<div className='grid gap-4 md:grid-cols-2'>
					<div className='space-y-2'>
						<Label htmlFor='quotedAmount'>Quoted Amount</Label>
						<Input
							id='quotedAmount'
							type='number'
							placeholder='Optional'
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='currency'>Currency</Label>
						<Input
							id='currency'
							value={currency}
							onChange={(e) => setCurrency(e.target.value.toUpperCase())}
						/>
					</div>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='proposalHtml'>Proposal HTML</Label>
					<Textarea
						id='proposalHtml'
						className='min-h-[340px] font-mono text-xs'
						value={proposalHtml}
						onChange={(e) => setProposalHtml(e.target.value)}
					/>
				</div>

				<DialogFooter>
					<Button
						type='button'
						variant='outline'
						onClick={() => onOpenChange(false)}
						disabled={submitting}>
						Cancel
					</Button>
					<Button
						type='button'
						onClick={handleSubmit}
						disabled={submitting || !proposalHtml.trim()}>
						{submitting ? "Sending..." : "Send Proposal"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
