import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/providers/AuthProvider';

export const metadata: Metadata = {
  title: 'Auth Demo',
  description:
    'Authentication app demonstrating authenticating a user, authorization, token and user management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <AuthProvider>
        <body>{children}</body>
      </AuthProvider>
    </html>
  );
}
