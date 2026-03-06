"use client";

import { AuthSession } from "@/types/dashboard";

const AUTH_STORAGE_KEY = "easydev_admin_session";

export function getAuthSession(): AuthSession | null {
	if (typeof window === "undefined") return null;

	const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
	if (!raw) return null;

	try {
		return JSON.parse(raw) as AuthSession;
	} catch {
		window.localStorage.removeItem(AUTH_STORAGE_KEY);
		return null;
	}
}

export function setAuthSession(session: AuthSession): void {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function clearAuthSession(): void {
	if (typeof window === "undefined") return;
	window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getAuthToken(): string | null {
	return getAuthSession()?.token ?? null;
}

export function getAuthHeader(): Record<string, string> {
	const token = getAuthToken();
	return token ? { Authorization: `Bearer ${token}` } : {};
}
