"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { Code, Eye, EyeOff, Loader2, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, loading: authLoading, accessToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fieldError, setFieldError] = useState<{
    email?: string;
    password?: string;
  }>({});

  // Already logged in → go to dashboard
  useEffect(() => {
    if (!authLoading && accessToken) {
      router.replace("/dashboard/");
    }
  }, [authLoading, accessToken, router]);

  function validate(): boolean {
    const errs: typeof fieldError = {};
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Invalid email address";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6)
      errs.password = "Password must be at least 6 characters";
    setFieldError(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await login(email.trim().toLowerCase(), password);
      toast.success("Welcome back!");
      router.replace("/dashboard/");
    } catch (err: any) {
      const msg = err?.message ?? "Login failed. Please try again.";
      toast.error(msg);
      if (msg.toLowerCase().includes("password"))
        setFieldError({ password: msg });
      else if (
        msg.toLowerCase().includes("email") ||
        msg.toLowerCase().includes("user")
      )
        setFieldError({ email: msg });
    } finally {
      setSubmitting(false);
    }
  }

  // Show nothing while checking stored session
  if (authLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <Card className="bg-white border border-gray-100 shadow-xl rounded-2xl">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <LogIn className="h-6 w-6 text-blue-600" />
          Sign in
        </CardTitle>
        <CardDescription className="text-gray-500">
          Access the lead management dashboard
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit} noValidate>
        <CardContent className="space-y-5">
          {/* Email */}
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
                setFieldError((f) => ({ ...f, email: undefined }));
              }}
              className={`border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 h-11 ${fieldError.email ? "border-red-400" : ""}`}
            />
            {fieldError.email && (
              <p className="text-red-500 text-xs mt-1">{fieldError.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-gray-700 text-sm font-medium"
              >
                Password
              </Label>
              <Link
                href="/forgot-password/"
                className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFieldError((f) => ({ ...f, password: undefined }));
                }}
                className={`border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 h-11 pr-11 ${fieldError.password ? "border-red-400" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {fieldError.password && (
              <p className="text-red-500 text-xs mt-1">{fieldError.password}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 pt-2">
          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </Button>

          <p className="text-gray-400 text-xs text-center">
            Protected portal — authorised users only
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
