import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CyberShield AI — Cybersecurity Threat Analyzer',
  description: 'AI-powered cybersecurity platform that analyzes suspicious URLs and messages, explains warning signs, and provides personalized incident response plans.',
  keywords: ['cybersecurity', 'phishing detection', 'scam analyzer', 'URL analyzer', 'AI security'],
  openGraph: {
    title: 'CyberShield AI',
    description: "Don't just detect the threat. Know what to do next.",
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#050A14" />
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div suppressHydrationWarning style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          background: 'var(--bg-base)',
        }}>
          <Navigation />
          <main id="main-content" tabIndex={-1} suppressHydrationWarning style={{ flex: 1, paddingTop: '64px', outline: 'none' }}>
            {children}
          </main>
          <footer suppressHydrationWarning style={{
            borderTop: '1px solid var(--border-subtle)',
            padding: '20px 24px',
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '12px',
          }}>
            CyberShield AI — For educational and demonstration purposes only. Always verify with official sources.
          </footer>
        </div>
      </body>
    </html>
  );
}
