import { Box } from '@mui/material';
import SigninForm from './components/SignInForm';
import Image from 'next/image';

export const metadata = {
  title: 'Sign In',
};

export default function Signin() {
  return (
    <main>
      <Box sx={{ backgroundImage: 'url(/backgrounds/signin.png)', backgroundColor: '#FCE1E4', backgroundSize: 'contain', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <SigninForm />
      </Box>
    </main>
  );
}