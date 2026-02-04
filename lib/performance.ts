// Performance monitoring utilities
export const measurePerformance = () => {
	if (typeof window !== "undefined" && "performance" in window) {
		// Core Web Vitals
		const observer = new PerformanceObserver((list) => {
			for (const entry of list.getEntries()) {
				if (entry.entryType === "largest-contentful-paint") {
					console.log("LCP:", entry.startTime);
				}
				if (entry.entryType === "first-input") {
					// console.log('FID:', entry.processingStart - entry.startTime);
				}
				if (entry.entryType === "layout-shift") {
					if (!(entry as any).hadRecentInput) {
						console.log("CLS:", (entry as any).value);
					}
				}
			}
		});

		observer.observe({ entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"] });
	}
};

// Lazy loading utility
export const lazyLoad = (target: HTMLElement, callback: () => void) => {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					callback();
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.1 },
	);

	observer.observe(target);
};

// Preload critical resources
export const preloadResource = (href: string, as: string) => {
	if (typeof document !== "undefined") {
		const link = document.createElement("link");
		link.rel = "preload";
		link.href = href;
		link.as = as;
		document.head.appendChild(link);
	}
};
