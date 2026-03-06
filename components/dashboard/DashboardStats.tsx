import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats } from "@/types/dashboard";

interface DashboardStatsProps {
	stats: DashboardStats;
}

const statConfig: Array<{ key: keyof DashboardStats; label: string }> = [
	{ key: "totalRequests", label: "Total Requests" },
	{ key: "proposalSent", label: "Proposal Sent" },
	{ key: "proposalAccepted", label: "Proposal Accepted" },
	{ key: "underReview", label: "Under Review" },
	{ key: "ongoing", label: "Ongoing" },
	{ key: "completed", label: "Completed" },
	{ key: "liveSupport", label: "Live Support" },
];

export default function DashboardStatsCards({ stats }: DashboardStatsProps) {
	return (
		<section className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
			{statConfig.map((item) => (
				<Card key={item.key}>
					<CardHeader className='pb-2'>
						<CardTitle className='text-sm font-medium text-muted-foreground'>{item.label}</CardTitle>
					</CardHeader>
					<CardContent>
						<p className='text-2xl font-bold'>{stats[item.key]}</p>
					</CardContent>
				</Card>
			))}
		</section>
	);
}
