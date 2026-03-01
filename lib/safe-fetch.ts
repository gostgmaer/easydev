/**
 * Type-safe fetch wrapper with comprehensive error handling
 */

interface FetchOptions extends RequestInit {
	timeout?: number;
	maxRetries?: number;
	retryDelay?: number;
	logRequest?: boolean;
	logResponse?: boolean;
}

interface FetchResponse<T> {
	success: boolean;
	data?: T;
	error?: string;
	status?: number;
	timestamp: Date;
}

/**
 * Safe fetch with error handling, timeouts, and retries
 */
export async function safeFetch<T = any>(url: string, options: FetchOptions = {}): Promise<FetchResponse<T>> {
	const {
		timeout = 10000,
		maxRetries = 0,
		retryDelay = 1000,
		logRequest = true,
		logResponse = false,
		...fetchOptions
	} = options;

	let lastError: Error | null = null;
	let retryCount = 0;

	while (retryCount <= maxRetries) {
		try {
			if (logRequest) {
				console.log(`📡 Fetching: ${fetchOptions.method || "GET"} ${url}`);
			}

			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), timeout);

			const response = await fetch(url, {
				...fetchOptions,
				signal: controller.signal,
				headers: { "Content-Type": "application/json", ...fetchOptions.headers },
			});

			clearTimeout(timeoutId);

			if (logResponse) {
				console.log(`📡 Response: ${response.status} ${response.statusText}`);
			}

			// Handle non-OK responses
			if (!response.ok) {
				let errorData: any = {};
				const contentType = response.headers.get("content-type");

				try {
					if (contentType?.includes("application/json")) {
						errorData = await response.json();
					} else {
						const text = await response.text();
						errorData = { error: text || response.statusText };
					}
				} catch (parseError) {
					console.warn(
						"⚠️ Failed to parse error response:",
						parseError instanceof Error ? parseError.message : String(parseError),
					);
					errorData = { error: response.statusText };
				}

				const errorMessage =
					errorData?.error || errorData?.message || `HTTP ${response.status}: ${response.statusText}`;

				// Retry on server errors (5xx)
				if (response.status >= 500 && retryCount < maxRetries) {
					console.warn(`⚠️ Server error ${response.status}. Retrying... (${retryCount + 1}/${maxRetries})`);
					await new Promise((resolve) => setTimeout(resolve, retryDelay));
					retryCount++;
					continue;
				}

				return { success: false, error: errorMessage, status: response.status, timestamp: new Date() };
			}

			// Parse response
			const contentType = response.headers.get("content-type");
			let data: T;

			if (contentType?.includes("application/json")) {
				data = await response.json();
			} else {
				data = (await response.text()) as any;
			}

			if (logResponse) {
				console.log("✅ Fetch successful");
			}

			return { success: true, data, status: response.status, timestamp: new Date() };
		} catch (error) {
			lastError = error instanceof Error ? error : new Error(String(error));

			if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
				// Network error
				if (retryCount < maxRetries) {
					console.warn(`⚠️ Network error. Retrying... (${retryCount + 1}/${maxRetries})`);
					await new Promise((resolve) => setTimeout(resolve, retryDelay));
					retryCount++;
					continue;
				}

				return { success: false, error: "Network error. Please check your connection.", timestamp: new Date() };
			}

			if (error instanceof Error && error.name === "AbortError") {
				return { success: false, error: `Request timeout (${timeout}ms)`, timestamp: new Date() };
			}

			// For other errors, don't retry
			break;
		}
	}

	return { success: false, error: lastError?.message || "Unknown error occurred", timestamp: new Date() };
}

/**
 * POST request with error handling
 */
export async function safePost<T = any>(url: string, data: any, options: FetchOptions = {}): Promise<FetchResponse<T>> {
	return safeFetch<T>(url, { ...options, method: "POST", body: JSON.stringify(data) });
}

/**
 * GET request with error handling
 */
export async function safeGet<T = any>(url: string, options: FetchOptions = {}): Promise<FetchResponse<T>> {
	return safeFetch<T>(url, { ...options, method: "GET" });
}

/**
 * PUT request with error handling
 */
export async function safePut<T = any>(url: string, data: any, options: FetchOptions = {}): Promise<FetchResponse<T>> {
	return safeFetch<T>(url, { ...options, method: "PUT", body: JSON.stringify(data) });
}

/**
 * DELETE request with error handling
 */
export async function safeDelete<T = any>(url: string, options: FetchOptions = {}): Promise<FetchResponse<T>> {
	return safeFetch<T>(url, { ...options, method: "DELETE" });
}
