# Error Handling Documentation

## Overview

This application implements comprehensive error handling to ensure the application doesn't break when errors occur. All critical and non-critical errors are caught, logged, and handled gracefully.

## Error Handling Strategy

### 1. **API Routes Error Handling** (`/app/api/*/route.ts`)

All API routes include:

- **Input Validation**: Validates request data before processing
- **Type Safety**: Checks data types before operations
- **Error Logging**: Logs errors with context for debugging
- **Graceful Responses**: Returns appropriate HTTP status codes and error messages
- **Fallback Values**: Uses safe defaults when data is missing
- **Timeout Handling**: Implements request timeouts to prevent hanging

Example:

```typescript
// ✅ Good - Input validation with error handling
if (!email || typeof email !== "string" || !isValidEmail(email)) {
	return NextResponse.json({ error: "Valid email is required", success: false }, { status: 400 });
}
```

### 2. **API Client Error Handling** (`/lib/api.ts`)

- **Try-Catch Blocks**: All async operations wrapped in try-catch
- **Request Timeouts**: 10-second timeout for critical operations, 5 seconds for non-critical
- **Retry Logic**: Automatic retries available via `maxRetries` parameter
- **Timeout Handling**: Clear AbortController to prevent memory leaks
- **Error Messages**: User-friendly error messages in production, detailed in development

Example:

```typescript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 10000);

try {
	const response = await fetch(url, { signal: controller.signal, ...options });
	// Handle response
} catch (error) {
	if (fetchError.name === "AbortError") {
		throw new Error("Request timeout");
	}
	throw error;
} finally {
	clearTimeout(timeoutId);
}
```

### 3. **Component Error Handling**

#### Hero Component

- Validates roles array before rendering
- Handles scroll errors with fallback navigation
- Prevents rendering until component is mounted (hydration safety)
- Safe interval cleanup

#### Footer Component

- Validates email before submission
- Shows user-friendly error/success messages
- Clears messages when user interacts
- Separate error tracking for non-critical failures

#### Contact Components

- Form validation before submission
- Error modal for user feedback
- Non-blocking newsletter subscription
- Graceful fallback if error modal not available

### 4. **Utility Functions** (`/lib/safe-*.ts`)

#### `safe-fetch.ts` - Type-safe HTTP requests

```typescript
const result = await safeFetch<Data>("/api/endpoint", {
	method: "POST",
	body: JSON.stringify(data),
	timeout: 10000,
	maxRetries: 2,
	retryDelay: 1000,
});

if (result.success) {
	// Use result.data safely
} else {
	// Handle error with result.error
}
```

#### `safe-utils.ts` - Safe utility functions

```typescript
// Safe array access
const item = safeArrayAccess(array, index, defaultValue);

// Safe object access
const value = safeObjectAccess(obj, "path.to.property", fallback);

// Safe string operations
const trimmed = safeString.trim(userInput);

// Safe DOM operations
const element = safeDOM.getElementById("id");
const scrolled = safeDOM.scrollIntoView(element);

// Safe type checking
if (safeType.isEmail(email)) {
	/* ... */
}
if (safeType.isURL(url)) {
	/* ... */
}
```

#### `error-handling.ts` - Error handling utilities

```typescript
// Use error handler hook
const { handleError } = useErrorHandler();

try {
	// operation
} catch (error) {
	handleError(error, "Operation context", true); // true = show alert
}

// Async wrapper with retry
const result = await withErrorHandling(
	() => fetchData(),
	"Fetching data",
	3, // max retries
);

// Form validation
const { valid, errors } = validateFormData(formData, {
	email: (value) => (!value ? "Email required" : null),
	name: (value) => (!value || value.length < 2 ? "Invalid name" : null),
});
```

## Error Types and Handling

### Network Errors

- Caught as TypeError with "Failed to fetch"
- Retry logic automatically triggered (if configured)
- User-friendly message: "Network error. Please check your connection."

### Timeout Errors

- Detected via AbortError name
- Timeout duration shown to user
- Clear message for upload timeouts: "Request timeout. File may be too large."

### Validation Errors

- Caught before API call
- Specific field-level error messages
- HTTP 400 response with error details

### Server Errors (5xx)

- Automatically retried if maxRetries > 0
- Returns error with HTTP status code
- Logged for monitoring

### Non-Critical Errors (Analytics, Logging)

- Never throw/break the application
- Logged with ⚠️ prefix
- Fire-and-forget approach
- User-friendly defaults applied

## Error Logging

### Log Levels

- **❌ (Error)**: Critical errors that affect functionality
- **⚠️ (Warning)**: Non-critical issues that might affect experience
- **📡 (Info)**: API calls and responses (detailed logging)
- **✅ (Success)**: Successful operations completion

### Log Format

```
[emoji] [Context]: [Message]
```

Example:

```
❌ Contact form submission error: Network error
⚠️ Analytics tracking error (non-critical): Timeout
📊 Analytics Event (PLACEHOLDER): { event: 'click', category: 'button' }
✅ Newsletter subscription successful
```

## Best Practices

### 1. Always Validate Input

```typescript
// ❌ Bad
const email = formData.email;

// ✅ Good
if (!formData.email || typeof formData.email !== "string") {
	throw new Error("Invalid email");
}
const email = formData.email.trim().toLowerCase();
```

### 2. Use Try-Catch for Async Operations

```typescript
// ❌ Bad
const data = await fetch(url).then((r) => r.json());

// ✅ Good
try {
	const response = await fetch(url);
	if (!response.ok) throw new Error(`HTTP ${response.status}`);
	const data = await response.json();
} catch (error) {
	console.error("Fetch error:", error);
	throw error;
}
```

### 3. Implement Timeouts

```typescript
// ❌ Bad
await fetch(url);

// ✅ Good
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 10000);
try {
	const response = await fetch(url, { signal: controller.signal });
} finally {
	clearTimeout(timeoutId);
}
```

### 4. Prioritize User Experience

```typescript
// ❌ Bad
throw error; // Silent failure

// ✅ Good
try {
	// operation
} catch (error) {
	console.error("Operation failed:", error);
	showUserFeedback("Failed. Please try again.");
}
```

### 5. Distinguish Critical vs Non-Critical Operations

```typescript
// ❌ Bad - Analytics failure breaks the app
await trackEvent(data); // throws error if fails

// ✅ Good - Non-critical operation never breaks app
trackEvent(data).catch((err) => {
	console.warn("Analytics error (non-critical):", err);
});
```

## Testing Error Scenarios

### To Test Timeout Errors

```javascript
// Use Chrome DevTools
// Network tab → right-click → Throttling → Slow 3G
```

### To Test Network Errors

```javascript
// Use Chrome DevTools
// Network conditions → Offline
```

### To Test Invalid Data

```typescript
// Directly test API endpoints with invalid data
fetch("/api/contact", {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({ name: "" }), // Missing email, subject, message
});
```

## Error Tracking Services (Optional)

To integrate with error tracking services:

### Sentry Example

```typescript
// lib/error-handling.ts
if (typeof window !== "undefined" && window.Sentry) {
	window.Sentry.captureException(error, { tags: { context }, contexts: { react: { componentStack } } });
}
```

### Custom Analytics

```typescript
// lib/error-handling.ts
const reportError = async (error: Error, context: string) => {
	await fetch("/api/error-logs", {
		method: "POST",
		body: JSON.stringify({
			message: error.message,
			stack: error.stack,
			context,
			userAgent: navigator.userAgent,
			timestamp: new Date().toISOString(),
		}),
	}).catch(() => {});
};
```

## Common Error Messages

| Error                   | Cause                      | Solution                 |
| ----------------------- | -------------------------- | ------------------------ |
| Network error           | No internet connection     | Check connection, retry  |
| Request timeout         | Server slow or unreachable | Check server, try again  |
| Invalid email           | Email format wrong         | Verify email format      |
| Missing required fields | Form incomplete            | Fill all required fields |
| File too large          | File exceeds size limit    | Use smaller file         |
| Invalid file type       | Wrong file format          | Upload correct format    |
| JSON parse error        | Malformed response         | Server error, try again  |

## Performance Considerations

1. **Timeouts Prevent Hanging**: Requests abort after timeout
2. **Fire-and-Forget for Non-Critical**: Analytics don't block main operations
3. **Error Logging is Non-Blocking**: Debug logs don't affect performance
4. **No Memory Leaks**: All timers and intervals are properly cleaned up
5. **Retry Logic**: Automatic retries reduce manual user action

## Environment-Specific Handling

### Production (`NODE_ENV === 'production'`)

- Generic error messages ("Something went wrong")
- No stack traces shown to users
- Detailed logs only in server console
- No error IDs shown

### Development (`NODE_ENV === 'development'`)

- Detailed error messages
- Full stack traces visible
- API request/response logging
- Error IDs for debugging

Example:

```typescript
const message = isProduction ? "An unexpected error occurred" : error.message;
```

## Monitoring Checklist

- [ ] All API routes have input validation
- [ ] All async operations have try-catch
- [ ] All fetch calls have timeouts
- [ ] All user-facing errors have clear messages
- [ ] All non-critical errors are caught separately
- [ ] Error cleanup (timers) in finally blocks
- [ ] No silent failures (console.log for debugging)
- [ ] SSR-safe DOM access (typeof window check)
- [ ] Form validation before submission
- [ ] Loading states for async operations

## Related Files

- `/lib/api.ts` - API client with error handling
- `/lib/safe-fetch.ts` - Type-safe fetch wrapper
- `/lib/safe-utils.ts` - Safe utility functions
- `/lib/error-handling.ts` - Error handling hooks and helpers
- `/app/api/*/route.ts` - API route handlers with validation
- `/components/ui/error-modal.tsx` - Error display component
- `/app/error.tsx` - Global error boundary

## Future Improvements

- [ ] Implement Sentry integration for production error tracking
- [ ] Add breadcrumb tracking for user actions
- [ ] Create error dashboard for monitoring
- [ ] Implement rate limiting for API recovery
- [ ] Add A/B testing for error messages
- [ ] Create error recovery workflows
- [ ] Implement user session recovery after errors
