'use client';

import { useState } from 'react';
import { TextField, Button, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { resetPassword } from '@/@core/services/user';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

 const searchParams = useSearchParams();
  const reset_token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      setError('Both password fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      const res = await resetPassword({
        reset_token,
        password,
        email,
        password_confirmation: confirmPassword,
      });

      if (res.status) {
        setMessage(res.message || 'Password reset successful');
        // Clear storage
        sessionStorage.removeItem('resetEmail');
        sessionStorage.removeItem('resetToken');
        // Redirect to login after delay
        setTimeout(() => router.push('/signin'), 1500);
      } else {
        setError(res.message || 'Failed to reset password');
      }
    } catch (err: any) {
      setError(err.message || 'Password reset failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={10} component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" mb={2} textAlign="center">Reset Password</Typography>
      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TextField
        fullWidth
        type="password"
        label="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        margin="normal"
        required
      />
      <Button 
        variant="contained" 
        fullWidth 
        type="submit"
        disabled={isLoading}
        sx={{ mt: 2 }}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Reset Password'}
      </Button>
    </Box>
  );
}