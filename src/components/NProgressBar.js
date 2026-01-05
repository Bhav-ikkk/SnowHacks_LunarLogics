'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '@mui/material';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export default function NProgressBar() {
  const pathname = usePathname();
  const theme = useTheme();

  useEffect(() => {
    // Configure NProgress with optimized settings
    NProgress.configure({ 
      showSpinner: false,
      trickleSpeed: 200,
      minimum: 0.1,
      easing: 'ease',
      speed: 500,
    });

    // Inject custom styles dynamically using theme colors
    const style = document.createElement('style');
    style.innerHTML = `
      #nprogress {
        pointer-events: none;
      }
      
      #nprogress .bar {
        background: ${theme.palette.primary.main};
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        box-shadow: 0 0 8px ${theme.palette.primary.main};
      }
      
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 4px ${theme.palette.primary.main}, 0 0 4px ${theme.palette.primary.main};
        opacity: 1;
        transform: rotate(3deg) translate(0px, -4px);
      }
      
      #nprogress .spinner {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [theme]);

  useEffect(() => {
    NProgress.start();
    
    const timer = setTimeout(() => {
      NProgress.done();
    }, 400);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname]);

  return null;
}
