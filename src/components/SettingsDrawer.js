'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Tooltip,
  Fab,
  useTheme,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Close as CloseIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import { useThemeContext, colorPresets } from '@/theme/ThemeContext';

export default function SettingsDrawer() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { mode, toggleTheme, colorPreset, changeColor } = useThemeContext();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Floating Settings Button */}
      <Fab
        color="primary"
        size="medium"
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1200,
          boxShadow: `0 8px 16px -4px ${theme.palette.primary.main}50`,
        }}
      >
        <SettingsIcon />
      </Fab>

      {/* Settings Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 320,
            bgcolor: 'background.paper',
            p: 0,
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2.5,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t('settings.title')}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ p: 3 }}>
          {/* Mode Selection */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="subtitle2"
              sx={{ mb: 2, fontWeight: 600, color: 'text.secondary' }}
            >
              {t('settings.mode')}
            </Typography>
            <ToggleButtonGroup
              value={mode}
              exclusive
              onChange={(e, newMode) => newMode && toggleTheme()}
              fullWidth
              sx={{
                '& .MuiToggleButton-root': {
                  py: 1.5,
                  borderRadius: 2,
                  gap: 1,
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  },
                },
              }}
            >
              <ToggleButton value="light">
                <LightModeIcon fontSize="small" />
                {t('settings.light')}
              </ToggleButton>
              <ToggleButton value="dark">
                <DarkModeIcon fontSize="small" />
                {t('settings.dark')}
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Color Presets */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ mb: 2, fontWeight: 600, color: 'text.secondary' }}
            >
              {t('settings.primaryColor')}
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 1.5,
              }}
            >
              {Object.entries(colorPresets).map(([key, preset]) => {
                const isSelected = colorPreset === key;
                const colorValue = mode === 'light' ? preset.light.main : preset.dark.main;

                return (
                  <Tooltip key={key} title={preset.name} arrow>
                    <Box
                      onClick={() => changeColor(key)}
                      sx={{
                        width: '100%',
                        aspectRatio: '1',
                        borderRadius: 2,
                        bgcolor: colorValue,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 3,
                        borderColor: isSelected ? 'text.primary' : 'transparent',
                        transition: 'all 0.2s',
                        boxShadow: isSelected
                          ? `0 4px 12px ${colorValue}50`
                          : '0 2px 4px rgba(0,0,0,0.1)',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          boxShadow: `0 6px 16px ${colorValue}40`,
                        },
                      }}
                    >
                      {isSelected && (
                        <CheckIcon sx={{ color: '#fff', fontSize: 20 }} />
                      )}
                    </Box>
                  </Tooltip>
                );
              })}
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Preview Section */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ mb: 2, fontWeight: 600, color: 'text.secondary' }}
            >
              {t('settings.preview')}
            </Typography>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: mode === 'light' ? 'grey.100' : 'background.default',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography sx={{ color: '#fff', fontWeight: 700 }}>A</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {t('settings.primaryButton')}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {colorPresets[colorPreset]?.name || 'Indigo'}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Box
                  sx={{
                    flex: 1,
                    height: 8,
                    borderRadius: 4,
                    bgcolor: 'primary.light',
                  }}
                />
                <Box
                  sx={{
                    flex: 1,
                    height: 8,
                    borderRadius: 4,
                    bgcolor: 'primary.main',
                  }}
                />
                <Box
                  sx={{
                    flex: 1,
                    height: 8,
                    borderRadius: 4,
                    bgcolor: 'primary.dark',
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Info */}
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
              {t('settings.customizationActive')}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              {t('settings.preferencesInfo')}
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
