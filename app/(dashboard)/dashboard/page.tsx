"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getLeads } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Loader2,
  RefreshCcw,
  Search,
  Users,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import ProposalModal from "@/components/dashboard/ProposalModal";

// ─── Status colours ────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100   text-blue-700   border-blue-200",
  contacted: "bg-yellow-100 text-yellow-700 border-yellow-200",
  qualified: "bg-purple-100 text-purple-700 border-purple-200",
  proposal: "bg-indigo-100 text-indigo-700 border-indigo-200",
  negotiation: "bg-orange-100 text-orange-700 border-orange-200",
  won: "bg-emerald-100 text-emerald-700 border-emerald-200",
  lost: "bg-red-100    text-red-700    border-red-200",
  hold: "bg-gray-100   text-gray-600   border-gray-200",
};

const STATUSES = [
  { value: "all", label: "All Statuses" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "proposal", label: "Proposal" },
  { value: "negotiation", label: "Negotiation" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
  { value: "hold", label: "Hold" },
];

const BUDGET_LABELS: Record<string, string> = {
  "under-5k": "< ₹5k",
  "5k-10k": "₹5k–10k",
  "10k-25k": "₹10k–25k",
  "25k-50k": "₹25k–50k",
  "50k-100k": "₹50k–100k",
  "over-100k": "> ₹100k",
  "not-sure": "TBD",
};

// ─── Stat card ─────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number | string;
  icon: any;
  color: string;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 flex items-center gap-4">
      <div className={`p-2.5 rounded-lg ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { accessToken } = useAuth();

  // Data state
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Filter state
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Proposal modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);

  // ── Derived quick stats ──────────────────────────────────────────────────
  const stats = React.useMemo(
    () => ({
      total: total,
      new: leads.filter((l) => l.status === "new").length,
      won: leads.filter((l) => l.status === "won").length,
      proposal: leads.filter((l) => l.status === "proposal").length,
    }),
    [leads, total],
  );

  // ── Fetch leads ──────────────────────────────────────────────────────────
  const fetchLeads = useCallback(
    async (p = 1, q = search, s = status) => {
      if (!accessToken) return;
      setLoading(true);
      try {
        const params: Record<string, any> = { page: p, limit: 20 };
        if (q) params.search = q;
        if (s !== "all") params.status = s;

        const res = await getLeads(params, accessToken);
        setLeads(res.data?.leads ?? res.data ?? []);
        setTotal(res.pagination?.total ?? res.data?.total ?? 0);
        setTotalPages(res.pagination?.totalPages ?? res.data?.totalPages ?? 1);
      } catch (err: any) {
        toast.error(err?.message ?? "Failed to load leads.");
      } finally {
        setLoading(false);
      }
    },
    [accessToken, search, status],
  );

  // Initial load — intentionally omits fetchLeads to avoid cascading re-fetches
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchLeads(1, "", "all");
  }, [accessToken]);

  // Debounced search
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setSearch(val);
    setPage(1);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => fetchLeads(1, val, status), 500);
  }

  function handleStatusChange(val: string) {
    setStatus(val);
    setPage(1);
    fetchLeads(1, search, val);
  }

  function handlePageChange(newPage: number) {
    setPage(newPage);
    fetchLeads(newPage, search, status);
  }

  function openProposalModal(lead: any) {
    setSelectedLead(lead);
    setModalOpen(true);
  }

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 text-gray-900">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Manage and process all incoming leads.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-gray-200 text-gray-600 hover:bg-gray-100 gap-1.5"
          onClick={() => fetchLeads(page, search, status)}
          disabled={loading}
        >
          <RefreshCcw
            className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Leads"
          value={total}
          icon={Users}
          color="bg-gray-100 text-gray-600"
        />
        <StatCard
          label="New"
          value={stats.new}
          icon={FileText}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          label="Proposal Sent"
          value={stats.proposal}
          icon={TrendingUp}
          color="bg-indigo-100 text-indigo-600"
        />
        <StatCard
          label="Won"
          value={stats.won}
          icon={CheckCircle2}
          color="bg-emerald-100 text-emerald-600"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
          <Input
            className="pl-9 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus-visible:ring-blue-500"
            placeholder="Search by name, email, subject…"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-full sm:w-48 bg-white border-gray-300 text-gray-900 focus:ring-blue-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200 text-gray-900">
            {STATUSES.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full bg-gray-100 rounded" />
            ))}
          </div>
        ) : leads.length === 0 ? (
          <div className="py-20 text-center text-gray-400">
            <Users className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium text-gray-500">No leads found</p>
            <p className="text-sm mt-1">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-100 hover:bg-transparent">
                  <TableHead className="text-gray-500 font-medium">
                    Name
                  </TableHead>
                  <TableHead className="text-gray-500 font-medium hidden md:table-cell">
                    Email
                  </TableHead>
                  <TableHead className="text-gray-500 font-medium hidden lg:table-cell">
                    Project
                  </TableHead>
                  <TableHead className="text-gray-500 font-medium hidden lg:table-cell">
                    Budget
                  </TableHead>
                  <TableHead className="text-gray-500 font-medium">
                    Status
                  </TableHead>
                  <TableHead className="text-gray-500 font-medium hidden sm:table-cell">
                    Date
                  </TableHead>
                  <TableHead className="text-gray-500 font-medium text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead: any) => {
                  const statusClass =
                    STATUS_COLORS[lead.status] ?? STATUS_COLORS.new;
                  const createdAt = lead.createdAt
                    ? new Date(lead.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "2-digit",
                      })
                    : "—";

                  return (
                    <TableRow
                      key={lead._id ?? lead.id}
                      className="border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="font-medium text-gray-900">
                        {lead.firstName} {lead.lastName}
                        {lead.company && (
                          <span className="block text-xs text-gray-400 mt-0.5">
                            {lead.company}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-gray-600 text-sm">
                        {lead.email}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-gray-600 text-sm capitalize">
                        {lead.projectType
                          ? lead.projectType.replace(/-/g, " ")
                          : "—"}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-gray-600 text-sm">
                        {BUDGET_LABELS[lead.budget] ?? lead.budget ?? "—"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`text-xs capitalize ${statusClass}`}
                        >
                          {lead.status ?? "new"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-gray-400 text-xs">
                        {createdAt}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-7 px-3"
                          onClick={() => openProposalModal(lead)}
                        >
                          Send Proposal
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-slate-400">
          <span className="text-gray-500">
            Page {page} of {totalPages} &mdash; {total} total leads
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 text-gray-600 hover:bg-gray-100 gap-1"
              disabled={page <= 1}
              onClick={() => handlePageChange(page - 1)}
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 text-gray-600 hover:bg-gray-100 gap-1"
              disabled={page >= totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Proposal modal */}
      {accessToken && (
        <ProposalModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          lead={selectedLead}
          accessToken={accessToken}
        />
      )}
    </div>
  );
}
