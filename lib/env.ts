// Environment Variables Configuration
// Add these to your .env.local file for production

export const ENV_VARS = {
  // Required for production
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://easydev.in',
  
  // Email Services (choose one)
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY, // SendGrid
  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY, // Mailgun
  MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
  RESEND_API_KEY: process.env.RESEND_API_KEY, // Resend
  
  // Newsletter Services (choose one)
  MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
  MAILCHIMP_SERVER_PREFIX: process.env.MAILCHIMP_SERVER_PREFIX,
  MAILCHIMP_AUDIENCE_ID: process.env.MAILCHIMP_AUDIENCE_ID,
  CONVERTKIT_API_KEY: process.env.CONVERTKIT_API_KEY,
  CONVERTKIT_FORM_ID: process.env.CONVERTKIT_FORM_ID,
  
  // Analytics
  GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_ID,
  GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
  GA_API_SECRET: process.env.GA_API_SECRET,
  MIXPANEL_TOKEN: process.env.MIXPANEL_TOKEN,
  
  // File Storage (choose one)
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  
  // Database (if using dynamic content)
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
  
  // CMS (if using headless CMS)
  STRAPI_API_URL: process.env.STRAPI_API_URL,
  STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
  CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
  SANITY_DATASET: process.env.SANITY_DATASET,
  SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
  
  // Social Media APIs (optional)
  TWITTER_API_KEY: process.env.TWITTER_API_KEY,
  TWITTER_API_SECRET: process.env.TWITTER_API_SECRET,
  LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
  LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,
  
  // Monitoring & Performance
  VERCEL_ANALYTICS_ID: process.env.VERCEL_ANALYTICS_ID,
  NEW_RELIC_LICENSE_KEY: process.env.NEW_RELIC_LICENSE_KEY,
  SENTRY_DSN: process.env.SENTRY_DSN,
  
  // Security
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  
  // Rate Limiting
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
};

// Validation helper
export const validateRequiredEnvVars = () => {
  const required = [
    'NEXT_PUBLIC_SITE_URL',
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.warn('Missing required environment variables:', missing);
  }
  
  return missing.length === 0;
};

// Development vs Production check
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

// Feature flags based on environment variables
export const FEATURES = {
  ANALYTICS_ENABLED: !!ENV_VARS.GA_TRACKING_ID,
  EMAIL_ENABLED: !!(ENV_VARS.SENDGRID_API_KEY || ENV_VARS.MAILGUN_API_KEY || ENV_VARS.RESEND_API_KEY),
  NEWSLETTER_ENABLED: !!(ENV_VARS.MAILCHIMP_API_KEY || ENV_VARS.CONVERTKIT_API_KEY),
  FILE_UPLOAD_ENABLED: !!(ENV_VARS.AWS_ACCESS_KEY_ID || ENV_VARS.CLOUDINARY_CLOUD_NAME),
  DATABASE_ENABLED: !!(ENV_VARS.SUPABASE_URL || ENV_VARS.DATABASE_URL),
  CMS_ENABLED: !!(ENV_VARS.STRAPI_API_URL || ENV_VARS.CONTENTFUL_SPACE_ID || ENV_VARS.SANITY_PROJECT_ID),
};