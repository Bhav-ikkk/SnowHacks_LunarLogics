'use client';

import { Box, Container, Typography, Card, CardContent, Grid, Button, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '@/components/DashboardLayout';
import Link from 'next/link';

export default function Home() {
  const { t } = useTranslation('common');

  const features = [
    {
      title: '3-Layer Architecture',
      description: 'Clean separation: Pages → Views → API → Services',
      icon: '🏗️'
    },
    {
      title: 'Database Ready',
      description: 'pg-promise with PostgreSQL integration',
      icon: '🗄️'
    },
    {
      title: 'UI Components',
      description: 'Material-UI + Tabler Icons + Framer Motion',
      icon: '🎨'
    },
    {
      title: 'Internationalization',
      description: 'i18next for multi-language support',
      icon: '🌍'
    },
    {
      title: 'Permissions',
      description: 'CASL for role-based access control',
      icon: '🔒'
    },
    {
      title: 'HTTP Client',
      description: 'Axios configured with interceptors',
      icon: '📡'
    }
  ];

  return (
    <DashboardLayout>
      <Container maxWidth='xl'>
        <Box sx={{ my: 4 }}>
          {/* Hero Section */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant='h2' component='h1' gutterBottom fontWeight={700}>
              🏔️ {t('welcome')}
            </Typography>
            <Typography variant='h5' color='text.secondary' sx={{ mb: 3 }}>
              Production-Ready Next.js Hackathon Template
            </Typography>
            <Chip label="3-Layer Architecture" color="primary" sx={{ mr: 1 }} />
            <Chip label="Page Router" color="secondary" sx={{ mr: 1 }} />
            <Chip label="JavaScript" color="success" />
          </Box>

          {/* Features Grid */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant='h3' sx={{ mb: 2 }}>
                      {feature.icon}
                    </Typography>
                    <Typography variant='h6' gutterBottom fontWeight={600}>
                      {feature.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Documentation Links */}
          <Card>
            <CardContent>
              <Typography variant='h5' gutterBottom fontWeight={600}>
                📚 Documentation
              </Typography>
              <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
                Everything you need to start building your hackathon project
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button 
                  variant='contained' 
                  size='large'
                  onClick={() => window.open('/ARCHITECTURE.md', '_blank')}
                >
                  Architecture Guide
                </Button>
                <Button 
                  variant='outlined' 
                  size='large'
                  onClick={() => window.open('/FLOW_EXAMPLE.md', '_blank')}
                >
                  Flow Example
                </Button>
                <Button 
                  variant='outlined' 
                  size='large'
                  onClick={() => window.open('/QUICKSTART.md', '_blank')}
                >
                  Quick Reference
                </Button>
                <Link href='/example' passHref>
                  <Button variant='contained' color='success' size='large'>
                    View Live Example
                  </Button>
                </Link>
              </Box>
            </CardContent>
          </Card>

          {/* Quick Start */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant='h6' gutterBottom>
              🚀 Ready to build?
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Check out the example at <code>/example</code> to see everything in action
            </Typography>
          </Box>
        </Box>
      </Container>
    </DashboardLayout>
  );
}

