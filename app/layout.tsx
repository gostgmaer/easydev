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
      "@type": "Person",
      name: safe(siteContent.personal.name, "Kishor Sarkar"),
      url: safe(siteContent.seo.url, "https://easydev.in"),
      image: `${safe(
        siteContent.seo.url,
        "https://kishorsarkar.dev"
      )}/profile.jpg`,
      jobTitle: safe(siteContent.personal.title, "Full-Stack Developer"),
      description: safe(
        siteContent.personal.bio,
        "Backend specialist with expertise in Express.js, MySQL, and MongoDB"
      ),
      sameAs: [
        safe(
          siteContent.social.linkedin,
          "https://linkedin.com/in/kishorsarkar"
        ),
        safe(siteContent.social.twitter, "https://twitter.com/kishorsarkar"),
        safe(siteContent.social.github, "https://github.com/kishorsarkar"),
      ],
      worksFor: {
        "@type": "Organization",
        name: "Freelance Developer",
        url: safe(siteContent.seo.url, "https://kishorsarkar.dev"),
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: safe(siteContent.personal.location, "Mumbai, India"),
      },
      email: safe(siteContent.personal.email, "contact@easydev.in"),
      telephone: safe(siteContent.personal.phone, "+91 98765 43210"),
      knowsAbout: safe(siteContent.about.skills, []).slice(0, 10),
      alumniOf: {
        "@type": "Organization",
        name: "Professional Developer",
      },
    },
    {
      "@type": "Organization",
      name: `${safe(
        siteContent.personal.name,
        "Kishor Sarkar"
      )} - Developer Services`,
      url: safe(siteContent.seo.url, "https://kishorsarkar.dev"),
      logo: `${safe(siteContent.seo.url, "https://kishorsarkar.dev")}/logo.png`,
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
        addressCountry: safe(
          siteContent.personal.address.addressCountry,
          "India"
        ),
      },
      sameAs: [
        safe(
          siteContent.social.linkedin,
          "https://linkedin.com/in/kishorsarkar"
        ),
        safe(siteContent.social.github, "https://github.com/kishorsarkar"),
      ],
      founder: {
        "@type": "Person",
        name: safe(siteContent.personal.name, "Kishor Sarkar"),
      },
    },
    {
      "@type": "ProfessionalService",
      name: "Backend Development Services",
      description: safe(
        siteContent.services.subtitle,
        "Comprehensive backend development services with expertise in Express.js and database technologies"
      ),
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
        addressCountry: safe(
          siteContent.personal.address.addressCountry,
          "India"
        ),
      },
      url: `${safe(siteContent.seo.url, "https://kishorsarkar.dev")}#services`,
      logo: `${safe(siteContent.seo.url, "https://kishorsarkar.dev")}/logo.png`,
      image: `${safe(
        siteContent.seo.url,
        "https://kishorsarkar.dev"
      )}/services.jpg`,
      areaServed: "Global",
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: `${safe(
          siteContent.seo.url,
          "https://kishorsarkar.dev"
        )}#services`,
        availableLanguage: ["English", "Hindi"],
      },
      serviceType: safe(siteContent.services.list, []).map(
        (service) => service.title
      ),
      priceRange: "$$",
      sameAs: [
        safe(
          siteContent.social.linkedin,
          "https://linkedin.com/in/kishorsarkar"
        ),
        safe(siteContent.social.github, "https://github.com/kishorsarkar"),
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        telephone: safe(siteContent.personal.phone, "+91 98765 43210"),
        email: safe(siteContent.personal.email, "contact@easydev.in"),
        availableLanguage: ["English", "Hindi"],
        hoursAvailable: "Mo-Fr 10:00-19:00",
      },
    },
    // Dynamic Projects from portfolio
    ...safe(siteContent.portfolio.projects, [])
      .slice(0, 6)
      .map((project, index) => ({
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        url: `${safe(
          siteContent.seo.url,
          "https://kishorsarkar.dev"
        )}#portfolio`,
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
          item: safe(siteContent.seo.url, "https://kishorsarkar.dev"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: `${safe(
            siteContent.seo.url,
            "https://kishorsarkar.dev"
          )}#about`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Services",
          item: `${safe(
            siteContent.seo.url,
            "https://kishorsarkar.dev"
          )}#services`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Portfolio",
          item: `${safe(
            siteContent.seo.url,
            "https://kishorsarkar.dev"
          )}#portfolio`,
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Contact",
          item: `${safe(
            siteContent.seo.url,
            "https://kishorsarkar.dev"
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
    "Kishor Sarkar - Express.js Developer | MySQL & MongoDB Expert"
  ),
  description: safe(
    siteContent.seo.description,
    "Professional backend developer specializing in Express.js, MySQL, and MongoDB. I build scalable APIs, design efficient databases, and create robust server-side solutions for modern web applications."
  ),
  keywords: safe(
    siteContent.seo.keywords,
    "Express.js developer, MySQL expert, MongoDB specialist, backend developer, API development, database design, Node.js developer, India"
  ),
  authors: [{ name: safe(siteContent.seo.author, "Kishor Sarkar") }],
  creator: safe(siteContent.seo.author, "Kishor Sarkar"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: safe(siteContent.seo.url, "https://kishorsarkar.dev"),
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
          "https://kishorsarkar.dev"
        )}/og-image.jpg`,
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
      "Kishor Sarkar - Express.js Developer | MySQL & MongoDB Expert"
    ),
    description: safe(
      siteContent.seo.description,
      "Professional backend developer specializing in Express.js, MySQL, and MongoDB. I build scalable APIs, design efficient databases, and create robust server-side solutions for modern web applications."
    ),
    creator: "@kishorsarkar",
    images: [
      `${safe(siteContent.seo.url, "https://kishorsarkar.dev")}/og-image.jpg`,
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
  metadataBase: new URL(safe(siteContent.seo.url, "https://kishorsarkar.dev")),
  alternates: {
    canonical: safe(siteContent.seo.url, "https://kishorsarkar.dev"),
  },
  category: "technology",
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
