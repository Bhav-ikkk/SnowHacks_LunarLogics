'use client';

import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

// Color palette options
export const colorPresets = {
  indigo: {
    name: 'Indigo',
    light: { main: '#6366f1', light: '#818cf8', dark: '#4f46e5' },
    dark: { main: '#818cf8', light: '#a5b4fc', dark: '#6366f1' },
  },
  blue: {
    name: 'Blue',
    light: { main: '#3b82f6', light: '#60a5fa', dark: '#2563eb' },
    dark: { main: '#60a5fa', light: '#93c5fd', dark: '#3b82f6' },
  },
  purple: {
    name: 'Purple',
    light: { main: '#8b5cf6', light: '#a78bfa', dark: '#7c3aed' },
    dark: { main: '#a78bfa', light: '#c4b5fd', dark: '#8b5cf6' },
  },
  teal: {
    name: 'Teal',
    light: { main: '#14b8a6', light: '#2dd4bf', dark: '#0d9488' },
    dark: { main: '#2dd4bf', light: '#5eead4', dark: '#14b8a6' },
  },
  green: {
    name: 'Green',
    light: { main: '#22c55e', light: '#4ade80', dark: '#16a34a' },
    dark: { main: '#4ade80', light: '#86efac', dark: '#22c55e' },
  },
  orange: {
    name: 'Orange',
    light: { main: '#f97316', light: '#fb923c', dark: '#ea580c' },
    dark: { main: '#fb923c', light: '#fdba74', dark: '#f97316' },
  },
  rose: {
    name: 'Rose',
    light: { main: '#f43f5e', light: '#fb7185', dark: '#e11d48' },
    dark: { main: '#fb7185', light: '#fda4af', dark: '#f43f5e' },
  },
  cyan: {
    name: 'Cyan',
    light: { main: '#06b6d4', light: '#22d3ee', dark: '#0891b2' },
    dark: { main: '#22d3ee', light: '#67e8f9', dark: '#06b6d4' },
  },
};

// Custom color palette generator
const getDesignTokens = (mode, colorKey) => {
  const colorPreset = colorPresets[colorKey] || colorPresets.indigo;
  const primaryColors = mode === 'light' ? colorPreset.light : colorPreset.dark;

  return {
    palette: {
      mode,
      primary: {
        ...primaryColors,
        contrastText: '#ffffff',
      },
      ...(mode === 'light'
        ? {
            secondary: {
              main: '#ec4899',
              light: '#f472b6',
              dark: '#db2777',
            },
            background: {
              default: '#f8fafc',
              paper: '#ffffff',
            },
            text: {
              primary: '#1e293b',
              secondary: '#64748b',
            },
            divider: '#e2e8f0',
            success: {
              main: '#10b981',
              light: '#34d399',
              dark: '#059669',
            },
            warning: {
              main: '#f59e0b',
              light: '#fbbf24',
              dark: '#d97706',
            },
            error: {
              main: '#ef4444',
              light: '#f87171',
              dark: '#dc2626',
            },
            info: {
              main: '#3b82f6',
              light: '#60a5fa',
              dark: '#2563eb',
            },
          }
        : {
            secondary: {
              main: '#f472b6',
              light: '#f9a8d4',
              dark: '#ec4899',
            },
            background: {
              default: '#0f172a',
              paper: '#1e293b',
            },
            text: {
              primary: '#f1f5f9',
              secondary: '#94a3b8',
            },
            divider: '#334155',
            success: {
              main: '#34d399',
              light: '#6ee7b7',
              dark: '#10b981',
            },
            warning: {
              main: '#fbbf24',
              light: '#fcd34d',
              dark: '#f59e0b',
            },
            error: {
              main: '#f87171',
              light: '#fca5a5',
              dark: '#ef4444',
            },
            info: {
              main: '#60a5fa',
              light: '#93c5fd',
              dark: '#3b82f6',
            },
          }),
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h6: {
        fontSize: '0.875rem',
        fontWeight: 600,
        lineHeight: 1.5,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 12,
    },
    shadows: [
      'none',
      '0px 1px 2px rgba(0, 0, 0, 0.05)',
      '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
      '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
      '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
      '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
      ...Array(18).fill('none'),
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 16px',
            fontWeight: 500,
          },
          contained: {
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
            '&:hover': {
              boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            border: 'none',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            marginBottom: 4,
            '&.Mui-selected': {
              backgroundColor: `${primaryColors.main}20`,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            fontWeight: 600,
          },
        },
      },
    },
  };
};

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');
  const [colorPreset, setColorPreset] = useState('indigo');

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    const savedColor = localStorage.getItem('themeColor');
    
    if (savedMode) {
      setMode(savedMode);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMode('dark');
    }
    
    if (savedColor && colorPresets[savedColor]) {
      setColorPreset(savedColor);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  const changeColor = (colorKey) => {
    if (colorPresets[colorKey]) {
      setColorPreset(colorKey);
      localStorage.setItem('themeColor', colorKey);
    }
  };

  const theme = useMemo(
    () => createTheme(getDesignTokens(mode, colorPreset)),
    [mode, colorPreset]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, colorPreset, changeColor, colorPresets }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
