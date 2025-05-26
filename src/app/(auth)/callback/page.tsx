'use client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const { token, error } = router.query;
    console.log('Callback Params:', { token, error }); // Debug

    if (typeof token === 'string') {
      localStorage.setItem('authToken', token);
      const returnTo = sessionStorage.getItem('preAuthRoute') || '/dashboard';
      sessionStorage.removeItem('preAuthRoute');
      sessionStorage.removeItem('accountType');
      console.log('Redirecting to:', returnTo); // Debug
      router.push(returnTo);
    }

    if (error) {
      console.error('OAuth Error:', error);
      alert('Google login failed: ' + error);
      router.push('/signup');
    }
  }, [router]);

  return <div>Loading...</div>;
}