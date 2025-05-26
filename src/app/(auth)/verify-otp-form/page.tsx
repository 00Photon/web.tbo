'use client';

import { useState } from 'react';
import { TextField, Button, Typography, Box, Alert, CircularProgress, Card, CardContent } from '@mui/material';
import { verifyResetOtp } from '@/@core/services/user';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyOtpForm() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!otp) {
    setError('OTP is required');
    return;
  }

  try {
    setIsLoading(true);
    setError('');
    
    // Get token from either URL params or sessionStorage
    const urlToken = searchParams.get('token');
    const storedToken = sessionStorage.getItem('resetToken') || '';
    const reset_token = urlToken || storedToken;
    
    console.log('Verifying OTP with token:', reset_token);
    
    const res = await verifyResetOtp({ 
      email, 
      otp,
      reset_token 
    });

    console.log('Verification response:', res);

    if (res.status) {
      setMessage(res.message || 'OTP verified successfully');
      
      // Update token if a new one was returned
      const finalToken = res.reset_token || reset_token;
      sessionStorage.setItem('resetToken', finalToken);
      
      // Proceed to password reset
      router.push(`/reset-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(finalToken)}`);
    } else {
      setError(res.message || 'Invalid OTP');
    }
  } catch (err: any) {
    console.error('Verification error:', err);
    setError(err.message || 'OTP verification failed');
  } finally {
    setIsLoading(false);
  }
};
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e8ff 100%)',
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 450,
          width: '100%',
          p: 4,
          borderRadius: 3,
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
            Verify OTP
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
            Enter the 6-digit OTP sent to <strong>{email}</strong>
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="OTP Code"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              sx={{ mb: 3 }}
              required
              aria-describedby="otp-error"
              InputProps={{
                sx: {
                  borderRadius: '8px',
                  '&:focus-within': {
                    boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.2)',
                  },
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
              sx={{ py: 1.5, borderRadius: '8px', mb: 2 }}
              aria-label="Verify OTP"
            >
              {isLoading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                  Verifying...
                </>
              ) : (
                'Verify OTP'
              )}
            </Button>
          </form>

          {error && (
            <Alert severity="error" sx={{ mt: 3, borderRadius: '8px' }} id="otp-error">
              {error}
            </Alert>
          )}

          {message && (
            <Alert severity="success" sx={{ mt: 3, borderRadius: '8px' }}>
              {message}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}