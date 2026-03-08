import { Badge } from "@/components/ui/badge";
import { RequestLifecycleStatus } from "@/types/dashboard";

const STATUS_LABELS: Record<RequestLifecycleStatus, string> = {
  new: "New Request",
  reviewing: "Under Review",
  contacted: "Live Support",
  quoted: "Proposal Sent",
  negotiating: "Ongoing",
  accepted: "Proposal Accepted",
  rejected: "Rejected",
  completed: "Completed",
  cancelled: "Cancelled",
};

const STATUS_STYLES: Record<RequestLifecycleStatus, string> = {
  new: "bg-sky-100 text-sky-800",
  reviewing: "bg-indigo-100 text-indigo-800",
  contacted: "bg-cyan-100 text-cyan-800",
  quoted: "bg-amber-100 text-amber-800",
  negotiating: "bg-violet-100 text-violet-800",
  accepted: "bg-emerald-100 text-emerald-800",
  rejected: "bg-rose-100 text-rose-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-zinc-100 text-zinc-700",
};

export function getStatusLabel(status: RequestLifecycleStatus): string {
  return STATUS_LABELS[status] ?? status;
}

export function StatusBadge({ status }: { status: RequestLifecycleStatus }) {
  return (
    <Badge className={STATUS_STYLES[status] ?? "bg-muted text-muted-foreground"}>
      {getStatusLabel(status)}
    </Badge>
  );
}
