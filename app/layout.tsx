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
      name: "Easydev – Complete Web Solution",
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
      alternateName: "Easydev - Complete Web Solution",
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
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Web Development",
            description:
              "Tailor-made, high-performance websites built using modern frameworks like React, Next.js, and Node.js. Designed exactly to meet your business requirements with pixel-perfect UI and optimized speed.",
            serviceOutput:
              "Responsive website, secure backend, SEO-friendly pages",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Complete Website Maintenance",
            description:
              "Comprehensive website monitoring, updates, security patches, bug fixes, backups, and performance optimization for smooth long-term operation.",
            serviceOutput:
              "Regular backups, monthly reports, uptime monitoring",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Stack Web Application Development",
            description:
              "End-to-end development of scalable web applications including frontend, backend, APIs, authentication, databases, dashboards, and cloud integration.",
            serviceOutput:
              "Production-ready web apps, API endpoints, admin dashboards",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO Optimization",
            description:
              "Boost search rankings and website visibility with on-page SEO, technical SEO fixes, structured data, metadata, Core Web Vitals optimization, and content recommendations.",
            serviceOutput: "Improved search visibility, faster Core Web Vitals",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI/UX Design",
            description:
              "Modern, user-friendly, conversion-focused UI/UX design with improved usability, interactions, prototypes, and optimized user journeys.",
            serviceOutput: "Wireframes, prototypes, final UI kit",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Performance Optimization",
            description:
              "Speed enhancements through code optimization, caching, database tuning, image compression, and Core Web Vitals improvements for the best user experience.",
            serviceOutput: "Faster page loads, reduced TTFB, improved LCP/CLS",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "eCommerce Website Development",
            description:
              "Custom online stores with product catalogs, secure checkout, cart systems, inventory management, admin dashboards, and payment gateway integration.",
            serviceOutput:
              "Secure store, payment integration, order management",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "API Development & Integration",
            description:
              "Development of custom REST/GraphQL APIs and integration with third-party services such as CRM, payment gateways, marketing tools, and automation systems.",
            serviceOutput:
              "Secure API endpoints, integrated third-party services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Landing Page Development",
            description:
              "High-converting landing pages optimized for ads, product marketing, sales funnels, and SEO to maximize conversions and leads.",
            serviceOutput: "Fast, lightweight conversion-focused pages",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Redesign & Revamp",
            description:
              "Transform outdated websites with modern UI, improved performance, optimized user flow, better conversions, and enhanced SEO structure.",
            serviceOutput:
              "Redesigned front-end, migration plan, SEO-safe changes",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Bug Fixing & Troubleshooting",
            description:
              "Diagnose and fix errors, crashes, slow performance issues, backend problems, frontend bugs, and security vulnerabilities.",
            serviceOutput:
              "Stability fixes, error resolution, security patches",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Server Management & Deployment (DevOps)",
            description:
              "Deploy and manage applications on AWS, GCP, DigitalOcean, Vercel, Docker, or VPS with CI/CD pipelines, SSL, monitoring, Infrastructure as Code and performance tuning.",
            serviceOutput:
              "CI/CD, monitoring, secure deployments, infrastructure scripts",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Dashboard Development",
            description:
              "Powerful admin dashboards, analytics systems, CRMs, reporting tools, and management panels tailored to business needs with real-time visualizations.",
            serviceOutput: "Interactive dashboards, charts, role-based access",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SaaS Application Development",
            description:
              "Complete SaaS product development including subscription billing, authentication, user roles, dashboards, analytics, cloud deployment, and multi-tenant architecture.",
            serviceOutput: "Multi-tenant SaaS platform, subscription handling",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "WordPress to Custom Website Migration",
            description:
              "Migrate your WordPress site to a modern, fast, secure custom-built platform without losing any content, SEO, or data.",
            serviceOutput:
              "SEO-preserving migration, content transfer, improved speed",
          },
        },
      ],
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
    {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "96",
      bestRating: "5",
      worstRating: "1",
    },
  ],
};

export const metadata: Metadata = {
  title: safe(
    siteContent.seo.title,
    "Kishor Sarkar - Express.js Developer | MySQL & MongoDB Expert"
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
      "EasyDev - Complete Web Solution Express.js Developer | MySQL & MongoDB Expert"
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
