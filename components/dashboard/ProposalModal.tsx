"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Loader2, RotateCcw, SendHorizonal, Calculator } from "lucide-react";
import { toast } from "sonner";
import { getProjectEstimate, sendLeadProposal } from "@/lib/api";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Props {
  open: boolean;
  onClose: () => void;
  lead: Record<string, any> | null;
  accessToken: string;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

const fmt = (n: number) => (n == null ? "—" : "₹" + n.toLocaleString("en-IN"));

const fmtRange = (obj: { min: number; max: number }) =>
  obj ? `${fmt(obj.min)} – ${fmt(obj.max)}` : "—";

const PROJECT_TYPES = [
  { value: "website", label: "Website" },
  { value: "webapp", label: "Web Application" },
  { value: "ecommerce", label: "E-Commerce" },
  { value: "mobile", label: "Mobile App" },
  { value: "other", label: "Other" },
];

const COMPLEXITY_LEVELS = [
  { value: "basic", label: "Basic" },
  { value: "standard", label: "Standard" },
  { value: "advanced", label: "Advanced" },
  { value: "enterprise", label: "Enterprise" },
];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function ProposalModal({
  open,
  onClose,
  lead,
  accessToken,
}: Props) {
  // Config form state
  const [projectName, setProjectName] = useState(
    lead?.projectName ?? lead?.subject ?? "",
  );
  const [amount, setAmount] = useState(
    lead?.budget?.replace(/[^0-9]/g, "") ?? "",
  );
  const [projectType, setProjectType] = useState<string>(
    lead?.projectType ?? "webapp",
  );
  const [complexityLevel, setComplexityLevel] = useState("standard");

  // Estimate result state
  const [estimate, setEstimate] = useState<any>(null);
  const [step, setStep] = useState<"config" | "result">("config");
  const [calcLoading, setCalcLoading] = useState(false);

  // Send proposal state
  const [quotedAmount, setQuotedAmount] = useState("");
  const [sending, setSending] = useState(false);

  // ── Sync lead when changed ──
  React.useEffect(() => {
    if (lead) {
      setProjectName(lead.projectName ?? lead.subject ?? "");
      setProjectType(lead.projectType ?? "webapp");
      setAmount(lead.budget?.replace(/[^0-9]/g, "") ?? "");
    }
  }, [lead]);

  // ── Calculate ──────────────────────────────────────────────────────────────
  async function handleCalculate() {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Enter a valid project amount.");
      return;
    }
    setCalcLoading(true);
    try {
      const res = await getProjectEstimate({
        amount: Number(amount),
        projectType: projectType as
          | "website"
          | "webapp"
          | "ecommerce"
          | "mobile"
          | "other",
        complexityLevel: complexityLevel as
          | "basic"
          | "standard"
          | "advanced"
          | "enterprise",
        projectName: projectName || undefined,
        currency: "INR",
      });
      setEstimate(res);
      setQuotedAmount(String(res?.summary?.totalProjectCost ?? ""));
      setStep("result");
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to generate estimate.");
    } finally {
      setCalcLoading(false);
    }
  }

  // ── Send proposal ──────────────────────────────────────────────────────────
  async function handleSend() {
    if (!quotedAmount || isNaN(Number(quotedAmount))) {
      toast.error("Enter a valid quoted amount.");
      return;
    }
    if (!lead?._id && !lead?.id) {
      toast.error("Lead ID missing.");
      return;
    }
    setSending(true);
    try {
      const leadId = lead._id ?? lead.id;
      await sendLeadProposal(
        leadId,
        {
          proposalUrl: "",
          quotedAmount: Number(quotedAmount),
          quotedCurrency: "INR",
        },
        accessToken,
      );
      toast.success("Proposal sent successfully!");
      onClose();
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to send proposal.");
    } finally {
      setSending(false);
    }
  }

  // ── Reset ──────────────────────────────────────────────────────────────────
  function handleReset() {
    setEstimate(null);
    setStep("config");
    setQuotedAmount("");
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white border border-gray-200 text-gray-900">
        <DialogHeader>
          <DialogTitle className="text-gray-900 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-600" />
            {step === "config" ? "Calculate Proposal" : "Price Breakdown"}
          </DialogTitle>
          {lead && (
            <p className="text-sm text-gray-500 mt-0.5">
              {lead.firstName} {lead.lastName} &mdash; {lead.email}
            </p>
          )}
        </DialogHeader>

        <Separator className="bg-slate-800" />

        {/* ── Step 1: Config ── */}
        {step === "config" && (
          <div className="space-y-5 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700">Project Name</Label>
                <Input
                  className="border-gray-300 text-gray-900 placeholder:text-gray-400 focus-visible:ring-blue-500"
                  placeholder="Project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Project Budget (₹)</Label>
                <Input
                  type="number"
                  min={1000}
                  className="border-gray-300 text-gray-900 placeholder:text-gray-400 focus-visible:ring-blue-500"
                  placeholder="e.g. 150000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Project Type</Label>
                <Select value={projectType} onValueChange={setProjectType}>
                  <SelectTrigger className="border-gray-300 text-gray-900 focus:ring-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 text-gray-900">
                    {PROJECT_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Complexity Level</Label>
                <Select
                  value={complexityLevel}
                  onValueChange={setComplexityLevel}
                >
                  <SelectTrigger className="border-gray-300 text-gray-900 focus:ring-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 text-gray-900">
                    {COMPLEXITY_LEVELS.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleCalculate}
              disabled={calcLoading}
            >
              {calcLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Calculating…
                </>
              ) : (
                <>
                  <Calculator className="h-4 w-4 mr-2" /> Generate Estimate
                </>
              )}
            </Button>
          </div>
        )}

        {/* ── Step 2: Results ── */}
        {step === "result" && estimate && (
          <div className="space-y-5 py-2">
            {/* Summary bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  label: "Total Cost",
                  value: fmt(estimate.summary.totalProjectCost),
                },
                {
                  label: "Timeline",
                  value: `${estimate.summary.estimatedTimeline.min}–${estimate.summary.estimatedTimeline.max} mo`,
                },
                {
                  label: "Annual Maint.",
                  value: `${estimate.summary.annualMaintenanceRate * 100}%`,
                },
                {
                  label: "Monthly Maint.",
                  value: fmt(estimate.summary.baseMonthlyMaintenance),
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-blue-50 rounded-lg px-3 py-2.5 text-center"
                >
                  <p className="text-xs text-gray-500">{label}</p>
                  <p className="text-sm font-semibold text-gray-900 mt-0.5">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <Tabs defaultValue="breakdown" className="w-full">
              <TabsList className="bg-gray-100 border border-gray-200 w-full grid grid-cols-4 h-auto">
                {["breakdown", "maintenance", "hosting", "tco"].map((t) => (
                  <TabsTrigger
                    key={t}
                    value={t}
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-600 text-xs capitalize py-2"
                  >
                    {t === "tco" ? "TCO & Scenarios" : t}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* ── Breakdown tab ── */}
              <TabsContent value="breakdown" className="mt-3">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-100 hover:bg-transparent">
                      <TableHead className="text-gray-500">Category</TableHead>
                      <TableHead className="text-gray-500 text-right">
                        %
                      </TableHead>
                      <TableHead className="text-gray-500 text-right">
                        Amount
                      </TableHead>
                      <TableHead className="text-gray-500 hidden md:table-cell">
                        Includes
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {estimate.projectBreakdown.items.map((item: any) => (
                      <TableRow
                        key={item.key}
                        className="border-gray-100 hover:bg-gray-50"
                      >
                        <TableCell className="text-gray-900 font-medium">
                          {item.category}
                        </TableCell>
                        <TableCell className="text-right text-gray-600">
                          {item.percentage}%
                        </TableCell>
                        <TableCell className="text-right font-semibold text-blue-700">
                          {fmt(item.amount)}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-gray-400 text-xs max-w-xs truncate">
                          {item.includes?.join(", ")}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="border-gray-200 bg-blue-50">
                      <TableCell
                        colSpan={2}
                        className="text-gray-900 font-bold"
                      >
                        Total
                      </TableCell>
                      <TableCell className="text-right font-bold text-blue-700">
                        {fmt(estimate.projectBreakdown.total)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell" />
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>

              {/* ── Maintenance tab ── */}
              <TabsContent value="maintenance" className="mt-3 space-y-4">
                {Object.entries(estimate.maintenancePlans.plans).map(
                  ([key, plan]: [string, any]) => (
                    <div
                      key={key}
                      className="bg-gray-50 rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900 capitalize">
                          {key.replace("year", " Year")} Plan
                        </h4>
                        <Badge
                          variant="outline"
                          className="border-blue-200 text-blue-700 text-xs"
                        >
                          Total: {fmt(plan.totalCost)}
                        </Badge>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow className="border-gray-100 hover:bg-transparent">
                            <TableHead className="text-gray-500 text-xs">
                              Year
                            </TableHead>
                            <TableHead className="text-gray-500 text-xs text-right">
                              Annual Cost
                            </TableHead>
                            <TableHead className="text-gray-500 text-xs text-right">
                              Monthly Avg
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {plan.yearlySchedule.map((yr: any) => (
                            <TableRow
                              key={yr.year}
                              className="border-gray-100 hover:bg-gray-50"
                            >
                              <TableCell className="text-gray-600 text-xs">
                                Year {yr.year}
                              </TableCell>
                              <TableCell className="text-right text-sm text-gray-900">
                                {fmt(yr.annualCost)}
                              </TableCell>
                              <TableCell className="text-right text-sm text-gray-500">
                                {fmt(yr.monthlyCost)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ),
                )}
              </TabsContent>

              {/* ── Hosting tab ── */}
              <TabsContent value="hosting" className="mt-3">
                <div className="space-y-3">
                  <p className="text-xs text-gray-400">
                    {estimate.serverCosts.note}
                  </p>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-100 hover:bg-transparent">
                        <TableHead className="text-gray-500">Tier</TableHead>
                        <TableHead className="text-gray-500 text-right">
                          Monthly
                        </TableHead>
                        <TableHead className="text-gray-500 text-right">
                          Yearly
                        </TableHead>
                        <TableHead className="text-gray-500 text-right">
                          3 Year
                        </TableHead>
                        <TableHead className="text-gray-500 text-right">
                          5 Year
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {estimate.serverCosts.tiers.map((t: any) => (
                        <TableRow
                          key={t.tier}
                          className={`border-slate-800 hover:bg-slate-800/40 ${t.tier === estimate.summary.recommendedServerTier ? "bg-violet-600/10" : ""}`}
                        >
                          <TableCell className="font-medium text-white text-sm">
                            {t.tier}
                            {t.tier ===
                              estimate.summary.recommendedServerTier && (
                              <Badge className="ml-2 bg-violet-600/30 text-violet-300 border-violet-600/40 text-[10px]">
                                Recommended
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right text-slate-300 text-sm">
                            {fmtRange(t.monthly)}
                          </TableCell>
                          <TableCell className="text-right text-slate-300 text-sm">
                            {fmtRange(t.yearly)}
                          </TableCell>
                          <TableCell className="text-right text-slate-300 text-sm">
                            {fmtRange(t["3year"])}
                          </TableCell>
                          <TableCell className="text-right text-slate-300 text-sm">
                            {fmtRange(t["5year"])}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* ── TCO & Scenarios tab ── */}
              <TabsContent value="tco" className="mt-3 space-y-5">
                {/* Comparison table */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900">
                    Total Cost of Ownership
                  </h4>
                  <p className="text-xs text-gray-400">
                    {estimate.totalCostOfOwnership.note}
                  </p>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-100 hover:bg-transparent">
                        <TableHead className="text-gray-500">
                          Server Tier
                        </TableHead>
                        <TableHead className="text-gray-500 text-right">
                          1 Year TCO
                        </TableHead>
                        <TableHead className="text-gray-500 text-right">
                          3 Year TCO
                        </TableHead>
                        <TableHead className="text-gray-500 text-right">
                          5 Year TCO
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {estimate.comparisonTable.map((row: any) => (
                        <TableRow
                          key={row.serverTier}
                          className="border-gray-100 hover:bg-gray-50"
                        >
                          <TableCell className="text-gray-900 font-medium text-sm">
                            {row.serverTier}
                          </TableCell>
                          <TableCell className="text-right text-gray-600 text-xs">
                            {fmt(row["1year"].totalMin)} –{" "}
                            {fmt(row["1year"].totalMax)}
                          </TableCell>
                          <TableCell className="text-right text-gray-600 text-xs">
                            {fmt(row["3year"].totalMin)} –{" "}
                            {fmt(row["3year"].totalMax)}
                          </TableCell>
                          <TableCell className="text-right text-gray-600 text-xs">
                            {fmt(row["5year"].totalMin)} –{" "}
                            {fmt(row["5year"].totalMax)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Proposal scenarios */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900">
                    Proposal Scenarios
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {estimate.proposalScenarios.map((s: any) => (
                      <div
                        key={s.label}
                        className={`rounded-lg border p-4 space-y-2 ${
                          s.label === "Recommended"
                            ? "border-blue-200 bg-blue-50"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900 text-sm">
                            {s.label}
                          </span>
                          {s.label === "Recommended" && (
                            <Badge className="bg-blue-600 text-white text-[10px]">
                              Best fit
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {s.description}
                        </p>
                        <Separator className="bg-gray-200" />
                        <div className="text-xs space-y-1">
                          <div className="flex justify-between text-gray-700">
                            <span>Monthly total</span>
                            <span className="font-medium text-gray-900">
                              {fmt(s.monthlyCost.total)}
                            </span>
                          </div>
                          <div className="flex justify-between text-gray-500">
                            <span>3 Year TCO</span>
                            <span>
                              {fmt(s["3year"].min)} – {fmt(s["3year"].max)}
                            </span>
                          </div>
                          <div className="flex justify-between text-gray-500">
                            <span>5 Year TCO</span>
                            <span>
                              {fmt(s["5year"].min)} – {fmt(s["5year"].max)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* ── Footer actions ── */}
            <Separator className="bg-gray-100" />
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
              <div className="space-y-1 flex-1">
                <Label className="text-gray-700 text-sm">
                  Final Quoted Amount (₹)
                </Label>
                <Input
                  type="number"
                  className="border-gray-300 text-gray-900 focus-visible:ring-blue-500"
                  value={quotedAmount}
                  onChange={(e) => setQuotedAmount(e.target.value)}
                />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="border-gray-200 text-gray-600 hover:bg-gray-100 gap-2 flex-1 sm:flex-none"
                  onClick={handleReset}
                >
                  <RotateCcw className="h-4 w-4" /> Recalculate
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white gap-2 flex-1 sm:flex-none"
                  onClick={handleSend}
                  disabled={sending}
                >
                  {sending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <SendHorizonal className="h-4 w-4" /> Send Proposal
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
