'use client';

import {
  Box,
  Button,
  TextField,
  Alert,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { API_BASE_URL } from "@/@core/utils/constants";

const verifyOtp = async ({ email, otp }: { email: string; otp: string }) => {
  const response = await fetch(`${API_BASE_URL}/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'OTP verification failed');
  }

  return data;
};

const VerifyOtpForm = () => {
  const [otp, setOtp] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const mutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      setSuccessMsg(data.message);
      setTimeout(() => router.push('/signin'), 1500); // brief delay before redirect
    },
    onError: (error: any) => {
      console.error('OTP verification error:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return alert('Missing email');
    mutation.mutate({ email, otp });
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
      <Card sx={{ maxWidth: 420, width: '100%', p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Verify OTP
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
            Enter the 6-digit OTP sent to <strong>{email}</strong>
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="OTP"
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={mutation.isPending}
              startIcon={mutation.isPending ? <CircularProgress size={20} /> : null}
            >
              {mutation.isPending ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </form>

          {mutation.isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {(mutation.error as Error).message}
            </Alert>
          )}

          {successMsg && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {successMsg}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default VerifyOtpForm;
