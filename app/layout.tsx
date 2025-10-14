import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { siteContent } from '@/lib/content';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

// Utility: safe fallback
const safe = <T,>(value: T | undefined, fallback: T): T => value ?? fallback;
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "name": safe(siteContent.personal.name, "John Doe"),
      "url": safe(siteContent.seo.url, "https://www.example.com"),
      "image": safe(siteContent.personal.profileImage, "https://www.example.com/default-profile.jpg"),
      "jobTitle": safe(siteContent.personal.profession, "Service Provider"),
      "sameAs": safe(siteContent.personal.socialLinks, []),
      "worksFor": {
        "@type": "Organization",
        "name": safe(siteContent.personal.organization, "Example Organization"),
        "url": safe(siteContent.personal.organizationUrl, "https://www.example.com")
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": safe(siteContent.personal.location, "Unknown Location")
      }
    },
    {
      "@type": "Organization",
      "name": safe(siteContent.personal.organization, "Example Organization"),
      "url": safe(siteContent.personal.organizationUrl, "https://www.example.com"),
      "logo": safe(siteContent.seo.ogImage, "https://www.example.com/default-logo.png"),
      "sameAs": safe(siteContent.personal.socialLinks, [])
    },
    {
      "@type": "ProfessionalService",
      "name": safe(siteContent.services.name, "General Service"),
      "description": safe(siteContent.services.description, "Professional services provided."),
      "url": safe(siteContent.seo.url, "https://www.example.com"),
      "logo": safe(siteContent.seo.ogImage, "https://www.example.com/default-logo.png"),
      "image": safe(siteContent.services.images?.[0], safe(siteContent.seo.ogImage, "https://www.example.com/default-service.jpg")),
      "areaServed": safe(siteContent.services.areaServed, "Global"),
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": safe(siteContent.seo.url, "https://www.example.com"),
        "availableLanguage": safe(siteContent.services.languages, ["English"])
      },
      "serviceType": safe(siteContent.services.types, ["General Service"]),
      "priceRange": safe(siteContent.services.priceRange, "$$"),
      "sameAs": safe(siteContent.personal.socialLinks, []),
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "telephone": safe(siteContent.personal.phone, "+0000000000"),
        "email": safe(siteContent.personal.email, "info@example.com"),
        "availableLanguage": safe(siteContent.services.languages, ["English"])
      }
    },
    // Projects / Portfolio
    ...(siteContent.projects?.length
      ? siteContent.projects.map((project) => ({
          "@type": "CreativeWork",
          "name": safe(project.name, "Sample Project"),
          "description": safe(project.description, "Project description here."),
          "url": safe(project.url, "https://www.example.com/project"),
          "image": safe(project.image, "https://www.example.com/default-project.jpg"),
          "datePublished": safe(project.datePublished, new Date().toISOString()),
          "keywords": safe(project.keywords, ["project", "example"]),
          "author": {
            "@type": "Person",
            "name": safe(siteContent.personal.name, "John Doe")
          }
        }))
      : [{
          "@type": "CreativeWork",
          "name": "Sample Project",
          "description": "Default project description",
          "url": "https://www.example.com/project",
          "image": "https://www.example.com/default-project.jpg",
          "datePublished": new Date().toISOString(),
          "keywords": ["project", "example"],
          "author": {
            "@type": "Person",
            "name": "John Doe"
          }
        }]
    ),
    // FAQ
    ...(siteContent.faq?.length
      ? [{
          "@type": "FAQPage",
          "mainEntity": siteContent.faq.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.answer
            }
          }))
        }]
      : [{
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What services do you offer?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We provide professional services tailored to your needs."
              }
            }
          ]
        }]
    ),
    // Breadcrumb
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": safe(siteContent.seo.url, "https://www.example.com")
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: safe(siteContent.seo.title, "Example Site"),
  description: safe(siteContent.seo.description, "Default site description."),
  keywords: safe(siteContent.seo.keywords, ["example", "service", "portfolio"]),
  authors: [{ name: safe(siteContent.seo.author, "John Doe") }],
  creator: safe(siteContent.seo.author, "John Doe"),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: safe(siteContent.seo.url, "https://www.example.com"),
    title: safe(siteContent.seo.title, "Example Site"),
    description: safe(siteContent.seo.description, "Default site description."),
    siteName: `${safe(siteContent.personal.name, "John Doe")} - Service Provider`,
    images: [
      {
        url: safe(siteContent.seo.ogImage, "https://www.example.com/default-og.jpg"),
        width: 1200,
        height: 630,
        alt: safe(siteContent.seo.title, "Example Site"),
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: safe(siteContent.seo.title, "Example Site"),
    description: safe(siteContent.seo.description, "Default site description."),
    creator: '@kishorsarkar',
    images: [safe(siteContent.seo.ogImage, "https://www.example.com/default-og.jpg")]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification-token-here',
  },
  metadataBase: new URL(safe(siteContent.seo.url, "https://www.example.com")),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
