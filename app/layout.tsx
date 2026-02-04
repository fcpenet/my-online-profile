import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Francis Penetrante - Senior Software Engineer',
  description: 'Software Engineer with 13+ years of experience specializing in Full Stack Development, ReactJS, NodeJS, Python, and Cloud Technologies (GCP, AWS, Azure)',
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
