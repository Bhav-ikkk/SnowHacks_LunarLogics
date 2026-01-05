'use client';

import { 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography,
  Link as MuiLink,
  Divider,
  alpha,
  useTheme,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { IconBrandGoogle, IconBrandGithub } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const theme = useTheme();
  const router = useRouter();

  const handleSignup = (e) => {
    e.preventDefault();
    // TODO: Implement signup logic
    router.push('/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        p: 2
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 450,
          borderRadius: 3,
          boxShadow: theme.shadows[4]
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              textAlign: 'center',
              color: 'primary.main'
            }}
          >
            Create Account
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 3,
              textAlign: 'center'
            }}
          >
            Sign up to get started
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<IconBrandGoogle size={20} />}
              sx={{ py: 1.5, textTransform: 'none' }}
            >
              Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<IconBrandGithub size={20} />}
              sx={{ py: 1.5, textTransform: 'none' }}
            >
              GitHub
            </Button>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              or continue with email
            </Typography>
          </Divider>

          <Box component="form" onSubmit={handleSignup}>
            <TextField
              fullWidth
              label="Full Name"
              type="text"
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              required
              sx={{ mb: 2 }}
            />

            <FormControlLabel
              control={<Checkbox required />}
              label={
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  I agree to the{' '}
                  <MuiLink
                    href="/terms"
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    Terms of Service
                  </MuiLink>{' '}
                  and{' '}
                  <MuiLink
                    href="/privacy"
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    Privacy Policy
                  </MuiLink>
                </Typography>
              }
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{ py: 1.5, mb: 2, fontWeight: 600 }}
            >
              Sign Up
            </Button>

            <Typography
              variant="body2"
              sx={{ textAlign: 'center', color: 'text.secondary' }}
            >
              Already have an account?{' '}
              <MuiLink
                component={Link}
                href="/login"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Sign in
              </MuiLink>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
