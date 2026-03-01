/**
 * Safe utility functions to prevent runtime errors
 */

/**
 * Safe array access
 */
export const safeArrayAccess = <T>(
	array: T[] | undefined | null,
	index: number,
	fallback: T | null = null,
): T | null => {
	try {
		if (!Array.isArray(array)) {
			console.warn(`⚠️ Not an array:`, array);
			return fallback;
		}
		if (index < 0 || index >= array.length) {
			console.warn(`⚠️ Index out of bounds: ${index} for array of length ${array.length}`);
			return fallback;
		}
		return array[index] ?? fallback;
	} catch (error) {
		console.warn("⚠️ Array access error:", error instanceof Error ? error.message : String(error));
		return fallback;
	}
};

/**
 * Safe object property access
 */
export const safeObjectAccess = <T>(obj: any, path: string, fallback: T | null = null): T | null => {
	try {
		if (!obj || typeof obj !== "object") {
			return fallback;
		}

		const keys = path.split(".");
		let current: any = obj;

		for (const key of keys) {
			if (current && typeof current === "object" && key in current) {
				current = current[key];
			} else {
				return fallback;
			}
		}

		return current ?? fallback;
	} catch (error) {
		console.warn(`⚠️ Object access error for path "${path}":`, error instanceof Error ? error.message : String(error));
		return fallback;
	}
};

/**
 * Safe string operations
 */
export const safeString = {
	trim: (str: unknown, fallback: string = ""): string => {
		try {
			if (typeof str !== "string") {
				return fallback;
			}
			return str.trim() || fallback;
		} catch (error) {
			console.warn("⚠️ String trim error:", error instanceof Error ? error.message : String(error));
			return fallback;
		}
	},

	toLowerCase: (str: unknown, fallback: string = ""): string => {
		try {
			if (typeof str !== "string") {
				return fallback;
			}
			return str.toLowerCase();
		} catch (error) {
			console.warn("⚠️ String toLowerCase error:", error instanceof Error ? error.message : String(error));
			return fallback;
		}
	},

	toUpperCase: (str: unknown, fallback: string = ""): string => {
		try {
			if (typeof str !== "string") {
				return fallback;
			}
			return str.toUpperCase();
		} catch (error) {
			console.warn("⚠️ String toUpperCase error:", error instanceof Error ? error.message : String(error));
			return fallback;
		}
	},

	substring: (str: unknown, start: number, end?: number, fallback: string = ""): string => {
		try {
			if (typeof str !== "string") {
				return fallback;
			}
			return str.substring(start, end) || fallback;
		} catch (error) {
			console.warn("⚠️ String substring error:", error instanceof Error ? error.message : String(error));
			return fallback;
		}
	},

	replace: (str: unknown, searchValue: string | RegExp, replaceValue: string, fallback: string = ""): string => {
		try {
			if (typeof str !== "string") {
				return fallback;
			}
			return str.replace(searchValue, replaceValue) || fallback;
		} catch (error) {
			console.warn("⚠️ String replace error:", error instanceof Error ? error.message : String(error));
			return fallback;
		}
	},

	includes: (str: unknown, searchString: string): boolean => {
		try {
			if (typeof str !== "string") {
				return false;
			}
			return str.includes(searchString);
		} catch (error) {
			console.warn("⚠️ String includes error:", error instanceof Error ? error.message : String(error));
			return false;
		}
	},

	startsWith: (str: unknown, searchString: string): boolean => {
		try {
			if (typeof str !== "string") {
				return false;
			}
			return str.startsWith(searchString);
		} catch (error) {
			console.warn("⚠️ String startsWith error:", error instanceof Error ? error.message : String(error));
			return false;
		}
	},

	endsWith: (str: unknown, searchString: string): boolean => {
		try {
			if (typeof str !== "string") {
				return false;
			}
			return str.endsWith(searchString);
		} catch (error) {
			console.warn("⚠️ String endsWith error:", error instanceof Error ? error.message : String(error));
			return false;
		}
	},
};

/**
 * Safe number operations
 */
export const safeNumber = {
	isNumeric: (value: unknown): value is number => {
		try {
			if (typeof value === "number") {
				return !isNaN(value);
			}
			if (typeof value === "string") {
				return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
			}
			return false;
		} catch (error) {
			console.warn("⚠️ Number check error:", error instanceof Error ? error.message : String(error));
			return false;
		}
	},

	parseFloat: (value: unknown, fallback: number = 0): number => {
		try {
			const num = parseFloat(String(value));
			return isNaN(num) ? fallback : num;
		} catch (error) {
			console.warn("⚠️ parseFloat error:", error instanceof Error ? error.message : String(error));
			return fallback;
		}
	},

	parseInt: (value: unknown, radix: number = 10, fallback: number = 0): number => {
		try {
			const num = parseInt(String(value), radix);
			return isNaN(num) ? fallback : num;
		} catch (error) {
			console.warn("⚠️ parseInt error:", error instanceof Error ? error.message : String(error));
			return fallback;
		}
	},
};

/**
 * Safe date operations
 */
export const safeDate = {
	parse: (dateString: unknown, fallback: Date | null = null): Date | null => {
		try {
			if (typeof dateString !== "string" && typeof dateString !== "number") {
				return fallback;
			}
			const date = new Date(dateString);
			return isNaN(date.getTime()) ? fallback : date;
		} catch (error) {
			console.warn("⚠️ Date parse error:", error instanceof Error ? error.message : String(error));
			return fallback;
		}
	},

	format: (date: unknown, locale: string = "en-US", options: Intl.DateTimeFormatOptions = {}): string => {
		try {
			if (!(date instanceof Date) || isNaN(date.getTime())) {
				return "";
			}
			return date.toLocaleDateString(locale, options);
		} catch (error) {
			console.warn("⚠️ Date format error:", error instanceof Error ? error.message : String(error));
			return "";
		}
	},

	toISOString: (date: unknown, fallback: string = ""): string => {
		try {
			if (!(date instanceof Date) || isNaN(date.getTime())) {
				return fallback;
			}
			return date.toISOString();
		} catch (error) {
			console.warn("⚠️ toISOString error:", error instanceof Error ? error.message : String(error));
			return fallback;
		}
	},
};

/**
 * Safe DOM operations
 */
export const safeDOM = {
	getElementById: (id: string, fallback: HTMLElement | null = null): HTMLElement | null => {
		try {
			if (typeof window === "undefined") {
				return fallback;
			}
			const element = document.getElementById(id);
			return element ?? fallback;
		} catch (error) {
			console.warn(`⚠️ getElementById error for id "${id}":`, error instanceof Error ? error.message : String(error));
			return fallback;
		}
	},

	querySelector: (selector: string, fallback: Element | null = null): Element | null => {
		try {
			if (typeof window === "undefined") {
				return fallback;
			}
			const element = document.querySelector(selector);
			return element ?? fallback;
		} catch (error) {
			console.warn(
				`⚠️ querySelector error for selector "${selector}":`,
				error instanceof Error ? error.message : String(error),
			);
			return fallback;
		}
	},

	querySelectorAll: (selector: string, fallback: Element[] = []): Element[] => {
		try {
			if (typeof window === "undefined") {
				return fallback;
			}
			const elements = document.querySelectorAll(selector);
			return Array.from(elements) ?? fallback;
		} catch (error) {
			console.warn(
				`⚠️ querySelectorAll error for selector "${selector}":`,
				error instanceof Error ? error.message : String(error),
			);
			return fallback;
		}
	},

	scrollIntoView: (element: Element | null, behavior: ScrollBehavior = "smooth"): boolean => {
		try {
			if (!element || typeof element.scrollIntoView !== "function") {
				return false;
			}
			element.scrollIntoView({ behavior });
			return true;
		} catch (error) {
			console.warn("⚠️ scrollIntoView error:", error instanceof Error ? error.message : String(error));
			return false;
		}
	},
};

/**
 * Safe type checking
 */
export const safeType = {
	isEmail: (value: unknown): value is string => {
		try {
			if (typeof value !== "string") {
				return false;
			}
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return emailRegex.test(value);
		} catch (error) {
			console.warn("⚠️ Email check error:", error instanceof Error ? error.message : String(error));
			return false;
		}
	},

	isPhoneNumber: (value: unknown): value is string => {
		try {
			if (typeof value !== "string") {
				return false;
			}
			const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s]?[(]?[0-9]{1,4}[)]?[-\s]?[0-9]{1,9}$/;
			return phoneRegex.test(value.replace(/\s/g, ""));
		} catch (error) {
			console.warn("⚠️ Phone number check error:", error instanceof Error ? error.message : String(error));
			return false;
		}
	},

	isURL: (value: unknown): value is string => {
		try {
			if (typeof value !== "string") {
				return false;
			}
			new URL(value);
			return true;
		} catch (error) {
			return false;
		}
	},
};
