"use client";
import React, { useState } from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Box,
  IconButton,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Typography,
  useTheme,
  alpha,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import {
  IconMenu2,
  IconSettings,
  IconUser,
  IconLogout,
  IconChevronDown,
  IconLogin,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useSidebar } from './AppShell';

export default function AppBar() {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { setMobileDrawerOpen } = useSidebar();
  
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // TODO: Replace with actual auth state

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfile = () => {
    handleCloseUserMenu();
    router.push('/settings');
  };

  const handleSettings = () => {
    handleCloseUserMenu();
    router.push('/settings');
  };

  const handleLogout = async () => {
    handleCloseUserMenu();
    // TODO: Implement logout
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <MuiAppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 }, minHeight: { xs: 56, sm: 64 } }}>
        {/* Menu Toggle Button for Mobile */}
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={() => setMobileDrawerOpen(true)}
            edge="start"
            sx={{
              mr: 2,
              color: 'text.primary',
            }}
          >
            <IconMenu2 size={24} />
          </IconButton>
        )}

        {/* Logo/Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              display: { xs: isMobile ? 'block' : 'none', md: 'block' },
            }}
          >
            SnowHacks
          </Typography>
        </Box>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Right Side Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isLoggedIn ? (
            <>
              {/* Settings - Hidden on mobile */}
              {!isMobile && (
                <Tooltip title="Settings">
                  <IconButton
                    size="large"
                    onClick={handleSettings}
                    sx={{ color: 'text.primary' }}
                  >
                    <IconSettings size={22} />
                  </IconButton>
                </Tooltip>
              )}

              {/* User Menu */}
              <Box
                onClick={handleOpenUserMenu}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  ml: 1,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 38,
                    height: 38,
                    bgcolor: 'primary.main',
                    fontSize: '1rem',
                    fontWeight: 600,
                  }}
                >
                  U
                </Avatar>
                {!isMobile && (
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        lineHeight: 1.2,
                      }}
                    >
                      User
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1,
                      }}
                    >
                      Admin
                    </Typography>
                  </Box>
                )}
                {!isMobile && (
                  <IconChevronDown
                    size={18}
                    style={{ color: theme.palette.text.secondary }}
                  />
                )}
              </Box>

              {/* User Menu Dropdown */}
              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                onClick={handleCloseUserMenu}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 1.5,
                    minWidth: 220,
                    borderRadius: 2,
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    User Name
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    user@example.com
                  </Typography>
                </Box>
                <Divider />
                <MenuItem onClick={handleProfile} sx={{ py: 1.5 }}>
                  <ListItemIcon>
                    <IconUser size={20} />
                  </ListItemIcon>
                  <ListItemText>My Profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleSettings} sx={{ py: 1.5 }}>
                  <ListItemIcon>
                    <IconSettings size={20} />
                  </ListItemIcon>
                  <ListItemText>Settings</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: 'error.main' }}>
                  <ListItemIcon>
                    <IconLogout size={20} color="inherit" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {/* Login/Signup Buttons */}
              <Button
                variant="text"
                startIcon={<IconLogin size={18} />}
                onClick={handleLogin}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                {!isMobile && 'Login'}
              </Button>
              <Button
                variant="contained"
                onClick={handleSignup}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                }}
              >
                {isMobile ? 'Sign Up' : 'Sign Up'}
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}
