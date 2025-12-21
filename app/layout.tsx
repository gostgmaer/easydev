import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteContent } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Utility: safe fallback
function safe<T>(value: T | undefined, fallback: T): T {
  return value ?? fallback;
}
const servicesSchema = [
  {
    "@type": "Service",
    "@id": "https://easydev.in/#custom-web-development",
    name: "Custom Web Development",
    serviceType: "Web Development",
    provider: { "@type": "Organization", name: "Easydev" },
    areaServed: "Worldwide",
    description:
      "Custom, scalable, high-performance websites built using modern frameworks like Next.js, React, and Node.js, tailored to business needs.",
  },
  {
    "@type": "Service",
    "@id": "https://easydev.in/#website-maintenance",
    name: "Website Maintenance & Support",
    serviceType: "Website Maintenance",
    provider: { "@type": "Organization", name: "Easydev" },
    areaServed: "Worldwide",
    description:
      "Ongoing website maintenance including updates, bug fixes, security patches, backups, uptime monitoring, and performance optimization.",
  },
  {
    "@type": "Service",
    "@id": "https://easydev.in/#full-stack-development",
    name: "Full Stack Web Application Development",
    serviceType: "Web Application Development",
    provider: { "@type": "Organization", name: "Easydev" },
    areaServed: "Worldwide",
    description:
      "End-to-end development of scalable web applications including frontend, backend, APIs, authentication, databases, and dashboards.",
  },
  {
    "@type": "Service",
    "@id": "https://easydev.in/#seo-optimization",
    name: "SEO Optimization",
    serviceType: "Search Engine Optimization",
    provider: { "@type": "Organization", name: "Easydev" },
    areaServed: "Worldwide",
    description:
      "Technical SEO, on-page optimization, Core Web Vitals improvements, structured data, and search visibility enhancements.",
  },
  {
    "@type": "Service",
    "@id": "https://easydev.in/#ui-ux-design",
    name: "UI/UX Design",
    serviceType: "UI/UX Design",
    provider: { "@type": "Organization", name: "Easydev" },
    areaServed: "Worldwide",
    description:
      "Modern, user-focused UI/UX design with wireframes, prototypes, design systems, and conversion-focused interfaces.",
  },
  {
    "@type": "Service",
    "@id": "https://easydev.in/#performance-optimization",
    name: "Performance Optimization",
    serviceType: "Website Performance Optimization",
    provider: { "@type": "Organization", name: "Easydev" },
    areaServed: "Worldwide",
    description:
      "Speed and performance optimization through caching, code splitting, database tuning, and Core Web Vitals improvements.",
  },
  {
    "@type": "Service",
    "@id": "https://easydev.in/#ecommerce-development",
    name: "eCommerce Website Development",
    serviceType: "eCommerce Development",
    provider: { "@type": "Organization", name: "Easydev" },
    areaServed: "Worldwide",
    description:
      "Custom eCommerce platforms with secure checkout, payment gateways, inventory management, and admin dashboards.",
  },
  {
    "@type": "Service",
    "@id": "https://easydev.in/#api-development",
    name: "API Development & Integration",
    serviceType: "API Development",
    provider: { "@type": "Organization", name: "Easydev" },
    areaServed: "Worldwide",
    description:
      "Secure REST and GraphQL API development with third-party integrations including payment, CRM, and automation services.",
  },
  {
    "@type": "Service",
    "@id": "https://easydev.in/#landing-page-development",
    name: "Landing Page Development",
    serviceType: "Landing Page Development",
    provider: { "@type": "Organization", name: "Easydev" },
    areaServed: "Worldwide",
    description:
      "High-converting landing pages optimized for ads, SEO, speed, and lead generation.",
  },
  {
    "@type": "Service",
    "@id": "https://easydev.in/#website-redesign",
    name: "Website Redesign & Revamp",
    serviceType: "Website Redesign",
    provider: { "@type": "Organization", name: "Easydev" },
    areaServed: "Worldwide",
    description:
      "Complete website revamp with modern UI, improved performance, SEO-safe structure, and better user experience.",
  },
  {
    "@type": "Service",
    "@id": "https://easydev.in/#bug-fixing",
    name: "Bug Fixing & Troubleshooting",
    serviceType: "Bug Fixing",
    provider: { "@type": "Organization", name: "Easydev" },
    areaServed: "Worldwide",
    description:
      "Identification and resolution of frontend, backend, performance, and security issues across web applications.",
  },
  {
    "@type": "Service",
    "@id": "https://easydev.in/#devops-services",
    name: "Server Management & DevOps",
    serviceType: "DevOps Services",
    provider: { "@type": "Organization", name: "Easydev" },
    areaServed: "Worldwide",
    description:
      "CI/CD pipelines, cloud deployments, Docker, monitoring, SSL, server optimization, and infrastructure management.",
  },
  {
    "@type": "Service",
    "@id": "https://easydev.in/#dashboard-development",
    name: "Custom Dashboard Development",
    serviceType: "Dashboard Development",
    provider: { "@type": "Organization", name: "Easydev" },
    areaServed: "Worldwide",
    description:
      "Custom admin dashboards, analytics systems, CRMs, and reporting tools with role-based access.",
  },
  {
    "@type": "Service",
    "@id": "https://easydev.in/#saas-development",
    name: "SaaS Application Development",
    serviceType: "SaaS Development",
    provider: { "@type": "Organization", name: "Easydev" },
    areaServed: "Worldwide",
    description:
      "Complete SaaS development including subscriptions, multi-tenancy, authentication, analytics, and cloud deployment.",
  },
  {
    "@type": "Service",
    "@id": "https://easydev.in/#wordpress-migration",
    name: "WordPress to Custom Website Migration",
    serviceType: "Website Migration",
    provider: { "@type": "Organization", name: "Easydev" },
    areaServed: "Worldwide",
    description:
      "SEO-safe migration from WordPress to modern custom-built platforms with improved performance and security.",
  },
];

// Dynamic structured data based on content
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://easydev.in/#localbusiness",
      name: "Easydev",
      url: "https://easydev.in",
      logo: {
        "@type": "ImageObject",
        url: "https://easydev.in/logo.png",
        width: 512,
        height: 512,
      },
      image: "https://easydev.in/logo.png",
      telephone: "+91-8637317273",
      email: "hello@easydev.in",
      address: {
        "@type": "PostalAddress",
        streetAddress: safe(
          siteContent.personal.address.streetAddress,
          "B-12, Andheri West"
        ),
        addressLocality: safe(
          siteContent.personal.address.addressLocality,
          "Mumbai"
        ),
        addressRegion: safe(
          siteContent.personal.address.addressRegion,
          "Maharashtra"
        ),
        postalCode: safe(siteContent.personal.address.postalCode, "400001"),
        addressCountry: safe(siteContent.personal.address.addressCountry, "IN"),
      },
      priceRange: "$$",
      areaServed: {
        "@type": "Country",
        name: "Worldwide",
      },
    },
    {
      "@type": "Person",
      "@id": "https://easydev.in/#founder",
      name: "Kishor Sarkar",
      jobTitle: "Founder & Lead Engineer",
      worksFor: {
        "@type": "Organization",
        name: "Easydev",
      },
      sameAs: [
        "https://linkedin.com/in/kishorsarkar",
        "https://github.com/kishorsarkar",
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://easydev.in/#homepage",
      url: "https://easydev.in",
      name: "Easydev – Web Development, SaaS & DevOps Services",
      inLanguage: "en-US,en",

      isPartOf: {
        "@type": "WebSite",
        "@id": "https://easydev.in/#website",
      },
      about: {
        "@type": "Organization",
        name: "Easydev",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://easydev.in/#website",
      url: "https://easydev.in",
      name: "Easydev",
      publisher: {
        "@type": "Organization",
        "@id": "https://easydev.in/#organization",
        name: "Easydev",
        logo: {
          "@type": "ImageObject",
          url: "https://easydev.in/logo.png",
          width: 512,
          height: 512,
        },
      },
    },
    {
      "@type": "Organization",
      "@id": "https://easydev.in/#organization",
      name: "Easydev",
      legalName: "Easydev",
      url: "https://easydev.in",
      logo: {
        "@type": "ImageObject",
        url: "https://easydev.in/logo.png",
        width: 512,
        height: 512,
      },
      image: "https://easydev.in/logo.png",
      alternateName: "EasyDev - Full-Stack & Web Solutions",
      slogan: "Complete web solution — dev, devops, bug fix, and more",
      description:
        "Easydev provides complete web solutions: custom web & SaaS development, DevOps, performance & security, bug fixing, maintenance and full-stack systems tailored to business needs.",
      telephone: "+91-8637317273",
      email: "hello@easydev.in",
      priceRange: "$$",
      founder: {
        "@type": "Person",
        name: "Kishor Sarkar",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: safe(
          siteContent.personal.address.streetAddress,
          "B-12, Andheri West"
        ),
        addressLocality: safe(
          siteContent.personal.address.addressLocality,
          "Mumbai"
        ),
        addressRegion: safe(
          siteContent.personal.address.addressRegion,
          "Maharashtra"
        ),
        postalCode: safe(siteContent.personal.address.postalCode, "400001"),
        addressCountry: safe(siteContent.personal.address.addressCountry, "IN"),
      },

      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-8637317273",
          email: "hello@easydev.in",
          contactType: "customer support",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi", "Bengali"],
        },
      ],
      areaServed: {
        "@type": "Country",
        name: "Worldwide",
      },
      sameAs: [
        "https://github.com/easydev",
        "https://linkedin.com/in/easydev",
        "https://twitter.com/easydev",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Easydev Services",
        itemListElement: servicesSchema,
      },
      hasPOS: "https://easydev.in",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://easydev.in",
      },
    },
    ...safe(siteContent.portfolio.projects, [])
      .slice(0, 6)
      .map((project, index) => ({
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        url: `${safe(siteContent.seo.url, "https://www.easydev.in")}#portfolio`,
        image: project.image,
        datePublished: new Date(Date.now() - index * 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        keywords: project.technologies,
        author: {
          "@type": "Person",
          name: safe(siteContent.personal.name, "Kishor Sarkar"),
        },
        programmingLanguage: project.technologies,
        applicationCategory: project.category,
      })),
    // Dynamic FAQ from contact
    {
      "@type": "FAQPage",
      mainEntity: safe(siteContent.contact.faqs, []).map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
    // Breadcrumb
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: safe(siteContent.seo.url, "https://www.easydev.in"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: `${safe(siteContent.seo.url, "https://www.easydev.in")}#about`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Services",
          item: `${safe(
            siteContent.seo.url,
            "https://www.easydev.in"
          )}#services`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Portfolio",
          item: `${safe(
            siteContent.seo.url,
            "https://www.easydev.in"
          )}#portfolio`,
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Contact",
          item: `${safe(
            siteContent.seo.url,
            "https://www.easydev.in"
          )}#contact`,
        },
      ],
    },
    // Review aggregate from testimonials
    {
      "@type": "Product",
      name: "Web Development Services",
      description: "High-quality web development & full-stack services.",
      itemReviewed: {
        "@type": "Service",
        name: "Web Development Services",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "96",
        bestRating: "5",
        worstRating: "1",
      },
    },
    
  ],
};

export const metadata: Metadata = {
  title: safe(
    siteContent.seo.title,
    "Easydev – Web Development, SaaS & DevOps Services"
  ),
  category: "technology",

  description: safe(
    siteContent.seo.description,
    "Professional backend developer specializing in Express.js, MySQL, and MongoDB. I build scalable APIs, design efficient databases, and create robust server-side solutions for modern web applications."
  ),
  keywords: safe(
    siteContent.seo.keywords,
    "Express.js developer, MySQL expert, MongoDB specialist, backend developer, API development, database design, Node.js developer, IN"
  ),
  authors: [{ name: safe(siteContent.seo.author, "Kishor Sarkar") }],
  creator: safe(siteContent.seo.author, "Kishor Sarkar"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: safe(siteContent.seo.url, "https://www.easydev.in/"),
    title: safe(
      siteContent.seo.title,
      "Kishor Sarkar - Express.js Developer | MySQL & MongoDB Expert"
    ),
    description: safe(
      siteContent.seo.description,
      "Professional backend developer specializing in Express.js, MySQL, and MongoDB. I build scalable APIs, design efficient databases, and create robust server-side solutions for modern web applications."
    ),
    siteName: `${safe(
      siteContent.personal.name,
      "Kishor Sarkar"
    )} - Developer Portfolio`,
    images: [
      {
        url: `${safe(
          siteContent.seo.url,
          "https://www.easydev.in"
        )}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${safe(
          siteContent.personal.name,
          "Kishor Sarkar"
        )} - Backend Developer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: safe(
      siteContent.seo.title,
      "EasyDev - Full-Stack & Web Solutions"
    ),
    description: safe(
      siteContent.seo.description,
      "Professional backend developer specializing in Express.js, MySQL, and MongoDB. I build scalable APIs, design efficient databases, and create robust server-side solutions for modern web applications."
    ),
    creator: "@kishorsarkar",
    images: [
      `${safe(siteContent.seo.url, "https://www.easydev.in")}/og-image.png
      `,
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification-token-here",
  },
  metadataBase: new URL(safe(siteContent.seo.url, "https://www.easydev.in")),
  alternates: {
    canonical: safe(siteContent.seo.url, "https://www.easydev.in"),
  },
  classification: "Business",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
