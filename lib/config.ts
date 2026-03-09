export const veriable = {
	baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3500/api",
	// Defaults to easydev so every API payload carries a stable tenant header.
	// Set NEXT_PUBLIC_TENANT_ID to override per deployment.
	tenantId: process.env.NEXT_PUBLIC_TENANT_ID || "easydev",
};
