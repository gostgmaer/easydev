# Error Handling Quick Reference

## 🚀 Quick Start

### Handle API Call Errors

```typescript
import { submitContactForm, subscribeToNewsletter } from "@/lib/api";

try {
	const result = await submitContactForm(formData);
	console.log("✅ Success:", result);
} catch (error) {
	console.error("❌ Error:", error.message);
	showError("Failed to submit form", error.message);
}
```

### Use Safe Fetch

```typescript
import { safeFetch, safePost } from "@/lib/safe-fetch";

// Automatic retries + timeout handling
const response = await safeFetch<Data>("/api/data", { timeout: 10000, maxRetries: 2 });

if (response.success) {
	console.log("Data:", response.data);
} else {
	console.error("Error:", response.error);
}
```

### Use Safe Utils

```typescript
import { safeString, safeType, safeDOM } from "@/lib/safe-utils";

// Safe string operations
const email = safeString.trim(userInput);
const valid = safeType.isEmail(email);

// Safe DOM operations
const element = safeDOM.getElementById("myId");
safeDOM.scrollIntoView(element);

// Safe number parsing
const amount = safeNumber.parseFloat(userAmount, 0);
```

### Error Handler Hook

```typescript
import { useErrorHandler } from '@/lib/error-handling';

export default function MyComponent() {
  const { handleError } = useErrorHandler();

  const handleClick = async () => {
    try {
      await risky Operation();
    } catch (error) {
      handleError(error, 'Failed to complete operation');
    }
  };

  return <button onClick={handleClick}>Click</button>;
}
```

---

## 🔍 Common Patterns

### Form Submission with Validation

```typescript
import { validateFormData } from '@/lib/error-handling';
import { submitContactForm } from '@/lib/api';
import { useErrorModal } from '@/components/ui/error-modal';

export default function Form() {
  const { showError } = useErrorModal();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    // Validate
    const { valid, errors } = validateFormData(data, {
      email: (v) => !v || !v.includes('@') ? 'Invalid email' : null,
      name: (v) => !v || v.length < 2 ? 'Name too short' : null,
    });

    if (!valid) {
      showError('Validation Error', Object.values(errors)[0]);
      return;
    }

    // Submit
    setIsSubmitting(true);
    try {
      await submitContactForm(data);
      // Success!
    } catch (error) {
      showError('Submit Failed', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return <form onSubmit={handleSubmit(onSubmit)}>{/* ... */}</form>;
}
```

### Safe Data Fetching with Fallback

```typescript
import { fetchProjects, trackEvent } from '@/lib/api';

export default async function Projects() {
  try {
    const projects = await fetchProjects();
    // projects = [] if error, never throws

    if (!projects || projects.length === 0) {
      return <p>No projects found</p>;
    }

    return (
      <div>
        {projects.map(p => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return <p>Failed to load projects</p>;
  }
}
```

### Handle Analytics Non-Critically

```typescript
import { trackEvent } from '@/lib/api';

export default function Component() {
  const onClick = async () => {
    // Track event but don't block on error
    trackEvent({
      event: 'button_click',
      category: 'interaction',
      label: 'submit_button',
    });

    // This continues regardless of tracking result
    await submitForm();
  };

  return <button onClick={onClick}>Submit</button>;
}
```

---

## 🐛 Debugging

### Enable Detailed Logging

Add to `.env.local`:

```
NODE_ENV=development
```

Then you'll see:

```
📡 Fetching: POST /api/contact
✅ Contact form submitted successfully
❌ Error: Network error
📊 Analytics Event: { event: 'click', ... }
```

### Check for Specific Errors

```typescript
try {
	await operation();
} catch (error) {
	if (error instanceof TypeError) {
		// Network error
	}
	if (error.message.includes("timeout")) {
		// Timeout error
	}
	if (error.message.includes("validation")) {
		// Validation error
	}
}
```

### Inspect API Responses

```typescript
import { safeFetch } from "@/lib/safe-fetch";

const response = await safeFetch("/api/endpoint");
console.log({
	success: response.success,
	data: response.data,
	error: response.error,
	status: response.status,
	timestamp: response.timestamp,
});
```

---

## ⚙️ Configuration

### Change Request Timeout

```typescript
// In component
const result = await safeFetch(url, {
	timeout: 20000, // 20 seconds instead of 10
});
```

### Add Retry Logic

```typescript
// In API calls
const result = await safeFetch(url, {
	maxRetries: 3, // Retry 3 times
	retryDelay: 2000, // Wait 2 seconds between retries
});
```

### Custom Error Messages

```typescript
// In API handler
if (!response.ok) {
	const errorData = await response.json().catch(() => ({}));
	const message = errorData?.customMessage || "Operation failed";
	throw new Error(message);
}
```

---

## 📋 Checklist

Before deploying, verify:

- [ ] All form submissions have error handling
- [ ] All API calls have try-catch
- [ ] All fetch calls have timeouts
- [ ] User-facing errors have clear messages
- [ ] Non-critical errors don't break app
- [ ] Navigation works in error states
- [ ] Timeouts are appropriate for operation
- [ ] Logging is helpful for debugging
- [ ] Production messages are user-friendly
- [ ] Error tracking is configured (if using Sentry/etc)

---

## 🆘 Common Issues

### Issue: Request hangs forever

**Solution**: Add timeout

```typescript
const result = await safeFetch(url, { timeout: 10000 });
```

### Issue: API error crashes component

**Solution**: Add error boundary or try-catch

```typescript
try {
	const data = await fetchData();
} catch (error) {
	// Handle error gracefully
}
```

### Issue: Silent failures in analytics

**Solution**: Use non-blocking calls

```typescript
trackEvent(data).catch((err) => console.warn("Analytics failed"));
```

### Issue: Form validation errors not shown

**Solution**: Display validation messages

```typescript
if (!valid) {
	errors.forEach((err) => showError(err.field, err.message));
}
```

### Issue: Can't debug in production

**Solution**: Use error IDs

```typescript
// Server logs error ID
// User sees: "Error ID: abc123"
// Look up abc123 in server logs
```

---

## 📚 Full Documentation

See `/ERROR_HANDLING.md` for complete documentation including:

- Detailed strategy explanation
- All utility function signatures
- Best practices and patterns
- Integration guides
- Performance considerations

---

## 💡 Pro Tips

1. **Always validate before use**

   ```typescript
   if (!data || typeof data !== "object") {
   	throw new Error("Invalid data");
   }
   ```

2. **Use safe utilities for edge cases**

   ```typescript
   const value = safeObjectAccess(obj, "nested.prop", defaultValue);
   ```

3. **Let analytics fail silently**

   ```typescript
   trackEvent(data); // No await, no try-catch needed
   ```

4. **Show progress for async operations**

   ```typescript
   const [loading, setLoading] = useState(false);
   setLoading(true);
   try {
   	await operation();
   } finally {
   	setLoading(false);
   }
   ```

5. **Test error scenarios**
   ```
   DevTools → Network → Offline
   DevTools → Network → Slow 3G
   ```

---

**Happy Coding! 🚀**

Your application is now bulletproof against errors!
