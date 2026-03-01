import { useCallback } from "react";

/**
 * Custom hook for handling errors with logging and user feedback
 */
export const useErrorHandler = () => {
	const handleError = useCallback(
		(error: unknown, context: string = "An error occurred", showAlert: boolean = false) => {
			const errorMessage = error instanceof Error ? error.message : String(error);
			const fullMessage = `${context}: ${errorMessage}`;

			// Log to console
			console.error(`❌ ${fullMessage}`);

			// TODO: Send to error tracking service
			// if (typeof window !== 'undefined' && window.Sentry) {
			//   window.Sentry.captureException(error, { tags: { context } });
			// }

			if (showAlert && typeof window !== "undefined") {
				// Use alert as fallback if no error modal available
				alert(errorMessage);
			}

			return errorMessage;
		},
		[],
	);

	return { handleError };
};

/**
 * Async function wrapper with error handling and retry logic
 */
export const withErrorHandling = async <T>(
	fn: () => Promise<T>,
	context: string = "Operation failed",
	maxRetries: number = 0,
): Promise<{ success: boolean; data?: T; error?: string }> => {
	try {
		const data = await fn();
		return { success: true, data };
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		console.error(`❌ ${context}: ${errorMessage}`);

		// Retry logic
		if (maxRetries > 0) {
			console.log(`⏳ Retrying ${context}... (${maxRetries} attempts remaining)`);
			await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retry
			return withErrorHandling(fn, context, maxRetries - 1);
		}

		return { success: false, error: errorMessage };
	}
};

/**
 * Validate form before submission
 */
export const validateFormData = (
	data: Record<string, any>,
	rules: Record<string, (value: any) => string | null>,
): { valid: boolean; errors: Record<string, string> } => {
	const errors: Record<string, string> = {};

	for (const [field, validator] of Object.entries(rules)) {
		const error = validator(data[field]);
		if (error) {
			errors[field] = error;
		}
	}

	return { valid: Object.keys(errors).length === 0, errors };
};

/**
 * Safe JSON parse
 */
export const safeJsonParse = <T = any>(json: string, fallback: T | null = null): T | null => {
	try {
		return JSON.parse(json) as T;
	} catch (error) {
		console.warn("⚠️ JSON parse error:", error instanceof Error ? error.message : String(error));
		return fallback;
	}
};

/**
 * Safe localStorage operations
 */
export const safeLocalStorage = {
	getItem: <T = any>(key: string, fallback: T | null = null): T | null => {
		try {
			if (typeof window === "undefined") {
				console.warn("⚠️ localStorage not available (SSR)");
				return fallback;
			}
			const item = window.localStorage.getItem(key);
			return item ? safeJsonParse<T>(item, fallback) : fallback;
		} catch (error) {
			console.warn(
				`⚠️ localStorage.getItem error for key "${key}":`,
				error instanceof Error ? error.message : String(error),
			);
			return fallback;
		}
	},

	setItem: (key: string, value: any): boolean => {
		try {
			if (typeof window === "undefined") {
				console.warn("⚠️ localStorage not available (SSR)");
				return false;
			}
			window.localStorage.setItem(key, JSON.stringify(value));
			return true;
		} catch (error) {
			console.warn(
				`⚠️ localStorage.setItem error for key "${key}":`,
				error instanceof Error ? error.message : String(error),
			);
			return false;
		}
	},

	removeItem: (key: string): boolean => {
		try {
			if (typeof window === "undefined") {
				console.warn("⚠️ localStorage not available (SSR)");
				return false;
			}
			window.localStorage.removeItem(key);
			return true;
		} catch (error) {
			console.warn(
				`⚠️ localStorage.removeItem error for key "${key}":`,
				error instanceof Error ? error.message : String(error),
			);
			return false;
		}
	},

	clear: (): boolean => {
		try {
			if (typeof window === "undefined") {
				console.warn("⚠️ localStorage not available (SSR)");
				return false;
			}
			window.localStorage.clear();
			return true;
		} catch (error) {
			console.warn("⚠️ localStorage.clear error:", error instanceof Error ? error.message : String(error));
			return false;
		}
	},
};
