"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import AppBar from './AppBar';
import { Box, useTheme, useMediaQuery } from '@mui/material';

const SidebarContext = createContext({ 
  sidebarOpen: true, 
  setSidebarOpen: () => {},
  mobileDrawerOpen: false,
  setMobileDrawerOpen: () => {}
});

export const useSidebar = () => useContext(SidebarContext);

export default function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by rendering a consistent initial state
  if (!mounted) {
    return null;
  }

  return (
    <SidebarContext.Provider value={{ 
      sidebarOpen, 
      setSidebarOpen, 
      mobileDrawerOpen, 
      setMobileDrawerOpen 
    }}>
      <Box sx={{ display: 'flex', overflow: 'hidden', height: '100vh', width: '100vw' }}>
        <Sidebar />
        <Box 
          sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            padding: isMobile ? 1 : 2,
            flexDirection: 'column',
            overflow: 'hidden',
            width: isMobile ? '100vw' : `calc(100vw - ${sidebarOpen ? '240px' : '64px'})`,
            transition: 'width 0.25s ease-in-out'
          }}
        >
          <AppBar />
          <Box 
            component="main" 
            sx={{ 
              p: 2,
              flexGrow: 1,
              overflow: 'auto',
              transition: 'padding 0.25s'
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </SidebarContext.Provider>
  );
}
