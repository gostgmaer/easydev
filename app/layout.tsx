import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

// Utility: safe fallback
function safe<T>(value: T | undefined, fallback: T): T {
  return value ?? fallback;
}

// Fully static structured data
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "name": "John Doe",
      "url": "https://www.example.com",
      "image": "https://www.example.com/default-profile.jpg",
      "jobTitle": "Web Developer",
      "sameAs": [
        "https://www.linkedin.com/in/johndoe",
        "https://twitter.com/johndoe"
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "Example Corp",
        "url": "https://www.example.com"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "New York, USA"
      }
    },
    {
      "@type": "Organization",
      "name": "Example Corp",
      "url": "https://www.example.com",
      "logo": "https://www.example.com/default-logo.png",
      "sameAs": [
        "https://www.linkedin.com/company/example",
        "https://www.facebook.com/example"
      ]
    },
    {
      "@type": "ProfessionalService",
      "name": "Web Development Services",
      "description": "We provide professional web development services including frontend, backend, and fullstack solutions.",
      "url": "https://www.example.com/services",
      "logo": "https://www.example.com/default-logo.png",
      "image": "https://www.example.com/default-service.jpg",
      "areaServed": "Global",
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": "https://www.example.com/services",
        "availableLanguage": ["English"]
      },
      "serviceType": ["Web Development", "UI/UX Design", "SEO Optimization"],
      "priceRange": "$$",
      "sameAs": [
        "https://www.linkedin.com/in/johndoe",
        "https://twitter.com/johndoe"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "telephone": "+1-555-555-5555",
        "email": "info@example.com",
        "availableLanguage": ["English"]
      }
    },
    // Static Projects / Portfolio
    {
      "@type": "CreativeWork",
      "name": "Portfolio Project 1",
      "description": "A sample web development project.",
      "url": "https://www.example.com/project1",
      "image": "https://www.example.com/project1.jpg",
      "datePublished": "2025-01-01",
      "keywords": ["web", "development", "project"],
      "author": {
        "@type": "Person",
        "name": "John Doe"
      }
    },
    {
      "@type": "CreativeWork",
      "name": "Portfolio Project 2",
      "description": "Another sample project showcasing design and development skills.",
      "url": "https://www.example.com/project2",
      "image": "https://www.example.com/project2.jpg",
      "datePublished": "2025-02-01",
      "keywords": ["design", "frontend", "project"],
      "author": {
        "@type": "Person",
        "name": "John Doe"
      }
    },
    // Static FAQ
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What services do you offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We provide professional web development, UI/UX design, and SEO services."
          }
        },
        {
          "@type": "Question",
          "name": "How can I contact you?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can contact us via email at info@example.com or call +1-555-555-5555."
          }
        }
      ]
    },
    // Breadcrumb
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.example.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://www.example.com/services"
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "John Doe - Web Developer",
  description: "Professional web development services and portfolio by John Doe.",
  keywords: ["web development", "portfolio", "UI/UX", "SEO"],
  authors: [{ name: "John Doe" }],
  creator: "John Doe",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: "https://www.example.com",
    title: "John Doe - Web Developer",
    description: "Professional web development services and portfolio by John Doe.",
    siteName: "John Doe - Web Developer",
    images: [
      {
        url: "https://www.example.com/default-og.jpg",
        width: 1200,
        height: 630,
        alt: "John Doe - Web Developer",
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: "John Doe - Web Developer",
    description: "Professional web development services and portfolio by John Doe.",
    creator: '@johndoe',
    images: ["https://www.example.com/default-og.jpg"]
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
  metadataBase: new URL("https://www.example.com"),
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
