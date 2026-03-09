"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  loginUser,
  forgotPassword,
  refreshAccessToken,
  getCurrentUser,
  type AuthUser,
  type AuthTokens,
} from "@/lib/api";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthContextType {
  user: AuthUser | null;
  /** In-memory access token — lost on hard refresh but restored via refreshToken */
  accessToken: string | null;
  loading: boolean;
  /** Login with email + password. Throws on failure. */
  login: (email: string, password: string) => Promise<void>;
  /** Send forgot-password reset email. Throws on failure. */
  sendForgotPassword: (email: string) => Promise<void>;
  /** Sign out and clear all stored tokens. */
  logout: () => void;
  /**
   * Attempt to refresh the access token using the persisted refreshToken.
   * Returns new accessToken string, or null if refresh token is missing / expired.
   */
  refresh: () => Promise<string | null>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "ea_refresh_token";

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessTokenExpiry, setAccessTokenExpiry] = useState<number | null>(null);

  // Ref keeps the current access token available inside callbacks without stale closure
  const tokenRef = useRef<string | null>(null);
  tokenRef.current = accessToken;

  // ── Helpers ────────────────────────────────────────────────────────────────

  const storeRefreshToken = (token: string) => {
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, token);
  };

  const clearRefreshToken = () => {
    if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
  };

  const getStoredRefreshToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(STORAGE_KEY);
  };

  // ── Public actions ─────────────────────────────────────────────────────────

  const login = useCallback(async (email: string, password: string) => {
		const data = await loginUser(email, password);
		storeRefreshToken(data.refreshToken);
		setAccessToken(data.accessToken);
		// Calculate expiry timestamp
		if (data.accessExpiresIn) {
			setAccessTokenExpiry(Date.now() + data.accessExpiresIn * 1000);
		}
		// Fetch full user profile; fall back to data.user if present
		try {
			const profile = await getCurrentUser(data.accessToken);
			setUser(profile);
		} catch {
			if (data.user) setUser(data.user);
		}
  }, []);

  const sendForgotPassword = useCallback(async (email: string) => {
    await forgotPassword(email);
  }, []);

  const logout = useCallback(() => {
    clearRefreshToken();
    setAccessToken(null);
    setUser(null);
  }, []);

  const refresh = useCallback(async (): Promise<string | null> => {
    const stored = getStoredRefreshToken();
    if (!stored) return null;
    try {
      const newToken = await refreshAccessToken(stored);
      setAccessToken(newToken);
      // Also refresh user profile silently
      getCurrentUser(newToken)
        .then(setUser)
        .catch(() => {});
      return newToken;
    } catch {
      // Refresh token expired — force logout
      clearRefreshToken();
      setAccessToken(null);
      setUser(null);
      return null;
    }
  }, []);

  // ── On mount: restore session from stored refresh token ───────────────────

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const stored = getStoredRefreshToken();
      if (!stored) {
        setLoading(false);
        return;
      }
      try {
				const newToken = await refreshAccessToken(stored);
				if (cancelled) return;
				setAccessToken(newToken);
				// Set expiry if available from refresh
				// You may need to parse expiry from refresh response if available
				const profile = await getCurrentUser(newToken);
				if (cancelled) return;
				setUser(profile);
			} catch {
        if (!cancelled) {
          clearRefreshToken();
          setAccessToken(null);
          setUser(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Proactive token refresh every 10 minutes ──────────────────────────────

  useEffect(() => {
    // Schedule refresh shortly before expiry
    if (!accessTokenExpiry) return;
    const now = Date.now();
    const msUntilRefresh = accessTokenExpiry - now - 5 * 60 * 1000; // 5 min before expiry
    if (msUntilRefresh <= 0) return;
    const timer = setTimeout(async () => {
      const stored = getStoredRefreshToken();
      if (!stored) return;
      try {
        const newToken = await refreshAccessToken(stored);
        setAccessToken(newToken);
        // If refresh response includes expiry, update it
        // setAccessTokenExpiry(newExpiryTimestamp);
      } catch {
        // Let the request-time 401 handler deal with it
      }
    }, msUntilRefresh);
    return () => clearTimeout(timer);
  }, [accessTokenExpiry]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        login,
        sendForgotPassword,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
