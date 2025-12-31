'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../lib/i18n';
import { ThemeProvider } from '@/theme/ThemeContext';
import DashboardLayout from '@/components/DashboardLayout';
import SettingsDrawer from '@/components/SettingsDrawer';

export default function RootLayout({ children }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  
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
          <DashboardLayout>{children}</DashboardLayout>
          <SettingsDrawer />
        </ThemeProvider>
      </body>
    </html>
  );
}
