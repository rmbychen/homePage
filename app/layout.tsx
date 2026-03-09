import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Letitia's Homepage",
  description: 'Web developer. Solving problems with code, exploring AI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
