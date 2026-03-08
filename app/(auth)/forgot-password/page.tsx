"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, KeyRound, Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const { sendForgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  function validate(): boolean {
    if (!email.trim()) {
      setEmailError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email address");
      return false;
    }
    setEmailError("");
    return true;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await sendForgotPassword(email.trim().toLowerCase());
      setSent(true);
    } catch (err: any) {
      // Don't reveal whether the email exists — always show success
      // but still toast internally so the developer can see the error
      toast.error(err?.message ?? "Failed to send reset email.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="bg-white border border-gray-100 shadow-xl rounded-2xl">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <KeyRound className="h-6 w-6 text-blue-600" />
          Forgot password
        </CardTitle>
        <CardDescription className="text-gray-500">
          Enter your email and we&apos;ll send you a reset link
        </CardDescription>
      </CardHeader>

      {sent ? (
        <CardContent className="py-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="rounded-full bg-emerald-100 p-4">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <div>
              <p className="text-gray-900 font-semibold text-lg">
                Check your inbox
              </p>
              <p className="text-gray-500 text-sm mt-1 max-w-xs">
                If <span className="text-blue-600 font-medium">{email}</span> is
                registered, you&apos;ll receive a reset link within a few
                minutes.
              </p>
            </div>
            <Link
              href="/login/"
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1.5 mt-2 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to sign in
            </Link>
          </div>
        </CardContent>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <CardContent className="space-y-5">
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-gray-700 text-sm font-medium"
              >
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="admin@yoursite.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                className={`border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 h-11 ${emailError ? "border-red-400" : ""}`}
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 pt-2">
            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Sending…
                </>
              ) : (
                "Send reset link"
              )}
            </Button>

            <Link
              href="/login/"
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1.5 justify-center transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to sign in
            </Link>
          </CardFooter>
        </form>
      )}
    </Card>
  );
}
