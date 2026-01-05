'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import '../lib/i18n';
import { ThemeProvider } from '@/theme/ThemeContext';
import AppShell from '@/components/AppShell';
import SettingsDrawer from '@/components/SettingsDrawer';
import NProgressBar from '@/components/NProgressBar';

export default function RootLayout({ children }) {
  const { i18n } = useTranslation();
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Pages that should not have AppShell (sidebar/navbar)
  const authPages = ['/login', '/signup', '/forgot-password'];
  const isAuthPage = authPages.some(page => pathname?.startsWith(page));
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0 }}>
        <ThemeProvider>
          <NProgressBar />
          {isAuthPage ? (
            children
          ) : (
            <AppShell>{children}</AppShell>
          )}
          <SettingsDrawer />
        </ThemeProvider>
      </body>
    </html>
  );
}
