export const veriable = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3500/api",
  // NEXT_PUBLIC_TENANT_ID is mandatory for multi-tenant deployments.
  // For single-tenant apps set it in .env; the backend will use its own
  // DEFAULT_TENANT_ID if this is omitted (empty string = omit the header).
  tenantId: process.env.NEXT_PUBLIC_TENANT_ID || "",
};
