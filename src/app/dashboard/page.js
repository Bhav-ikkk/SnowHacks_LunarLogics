'use client';

import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography,
  alpha,
  useTheme
} from '@mui/material';
import { 
  IconUsers, 
  IconShoppingCart, 
  IconCoin,
  IconTrendingUp 
} from '@tabler/icons-react';

export default function Dashboard() {
  const theme = useTheme();

  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      icon: <IconUsers size={32} />,
      color: theme.palette.primary.main
    },
    {
      title: 'Total Sales',
      value: '$45,678',
      change: '+8%',
      icon: <IconShoppingCart size={32} />,
      color: theme.palette.success.main
    },
    {
      title: 'Revenue',
      value: '$12,345',
      change: '+23%',
      icon: <IconCoin size={32} />,
      color: theme.palette.warning.main
    },
    {
      title: 'Growth',
      value: '89%',
      change: '+5%',
      icon: <IconTrendingUp size={32} />,
      color: theme.palette.info.main
    }
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: theme.shadows[4],
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2
                  }}
                >
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: alpha(stat.color, 0.1),
                      color: stat.color
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'success.main',
                      fontWeight: 600,
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      px: 1,
                      py: 0.5,
                      borderRadius: 1
                    }}
                  >
                    {stat.change}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', mb: 0.5 }}
                >
                  {stat.title}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Card
          sx={{
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Welcome to Your Dashboard
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              This is your main dashboard. You can add more widgets and components here to display relevant data and insights.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
