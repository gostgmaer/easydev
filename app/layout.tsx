import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { siteContent } from '@/lib/content';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: siteContent.seo.title,
  description: siteContent.seo.description,
  keywords: siteContent.seo.keywords,
  authors: [{ name: siteContent.seo.author }],
  creator: siteContent.seo.author,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteContent.seo.url,
    title: siteContent.seo.title,
    description: siteContent.seo.description,
    siteName: `${siteContent.personal.name} - Developer Portfolio`,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteContent.seo.title,
    description: siteContent.seo.description,
    creator: '@kishorsarkar',
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
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}