import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Francis Penetrante - Senior Software Engineer',
  description: 'Software Engineer with 13+ years of experience specializing in Full Stack Development, ReactJS, NodeJS, Python, and Cloud Technologies (GCP, AWS, Azure)',
  openGraph: {
    title: 'kikOS - Francis Penetrante Portfolio',
    description: 'An interactive portfolio experience with a terminal boot sequence and guided tour. Built with Next.js and TypeScript.',
    url: 'https://kikopenetrante.com',
    siteName: 'kikOS',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'kikOS Boot Screen',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'kikOS - Francis Penetrante Portfolio',
    description: 'An interactive portfolio experience with a terminal boot sequence and guided tour.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
