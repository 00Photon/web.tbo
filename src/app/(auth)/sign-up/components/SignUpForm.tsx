'use client';
import React, { useState } from 'react';
import {
  ApartmentOutlined,
  MailOutline,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { API_BASE_URL } from '@/@core/utils/constants';

interface RegistrationData {
  account_type: 'CLIENT' | 'TALENT';
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const registerUser = async (
  registrationData: RegistrationData
): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registrationData),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const SignUpForm: React.FC = () => {
  const [activeAccountType, setActiveAccountType] = useState<'CLIENT' | 'TALENT'>('CLIENT');
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formEmail, setFormEmail] = useState('');

  const router = useRouter();

  const googleLogin = () => {
    const redirectUri = encodeURIComponent(`${window.location.origin}/post-auth`);
    const authUrl = `${API_BASE_URL}/auth/google?redirect_uri=${redirectUri}`;
    console.log('Initiating Google SSO:', authUrl); // Debug
    window.location.href = authUrl;
};
  
  

  const activeStyle = {
    backgroundColor: '#E61C31',
    color: 'white',
  };

  const inActiveStyle = {
    backgroundColor: '#F6F6F6',
    color: '#BCBCBC',
    border: '1px solid #D9D9D9',
  };

  const account_type = [
    {
      icon: '/icons/client_account.png',
      name: 'CLIENT',
    },
    {
      icon: '/icons/talent_account.png',
      name: 'TALENT',
    },
  ];

  const oAuthOptions = [
    {
      icon: '/icons/google.png',
      name: 'Google',
    },
  ];

  const fieldData = [
    {
      label: 'Full Name',
      name: 'name',
      placeholder: 'Enter Full Name',
      icon: <ApartmentOutlined />,
    },
    {
      label: 'Prefered Email Address',
      name: 'email',
      placeholder: 'Enter Email Address',
      icon: <MailOutline />,
    },
    {
      label: 'Password',
      name: 'password',
      placeholder: 'Enter Password',
    },
  ];

  const fieldErrorMessageStyle = {
    fontSize: '11px',
    marginTop: '5px',
    color: '#E61C31',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setShowSuccess(true);
      setTimeout(() => router.push(`/verify-otp?email=${formEmail}`), 2000);
    },
    onError: (error: any) => {
      console.error('Registration failed:', error);
    },
  });

  return (
    <Box
      sx={{
        width: { xs: '100%', md: '50%' },
        display: 'flex',
        justifyContent: 'center',
        paddingY: '30px',
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: '-5px' }}>
          <Link href="/">
            <Image
              style={{ marginBottom: '20px' }}
              src="TBO.svg"
              width={161}
              height={53}
              alt="TBO Icon"
            />
          </Link>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            marginBottom: '20px',
          }}
        >
          {account_type.map((account, index) => (
            <Box
              key={index}
              onClick={() => setActiveAccountType(account.name as 'CLIENT' | 'TALENT')}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                borderRadius: '8px',
                ...(index === 0
                  ? { marginRight: '5px' }
                  : { marginLeft: '5px' }),
                ...(activeAccountType === account.name
                  ? activeStyle
                  : inActiveStyle),
                cursor: 'pointer',
              }}
            >
              <Image
                src={account.icon}
                width={38.6}
                height={38.6}
                alt={`${account.name} Icon`}
              />
              <Box sx={{ fontSize: '14.3px', fontWeight: 700 }}>
                {account.name === 'CLIENT' ? 'Company Account' : 'Talent Account'}
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
          <Box sx={{ fontSize: '20px', fontWeight: 700 }}>Create Account</Box>
          <Box sx={{ fontSize: '12px' }}>
            Enter your credentials to create your account
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {oAuthOptions.map((option, index) => (
            <Box
              key={index}
              onClick={() => {
                if (option.name === 'Google') {
                  googleLogin();
                }
              }}
              sx={{
                display: 'flex',
                border: '1.5px solid #D0D5DD',
                borderRadius: '6px',
                padding: '6px 30px',
                alignItems: 'center',
                ...(index === 0
                  ? { marginRight: '5px' }
                  : { marginLeft: '5px' }),
                cursor: 'pointer',
                '&:hover': { border: '1.5px solid #E61C31' },
              }}
            >
              <Image
                style={{ marginRight: '8px' }}
                src={option.icon}
                width={14.3}
                height={14.3}
                alt={`${option.name} Icon`}
              />
              <Box sx={{ fontSize: '11.4px', fontWeight: 600 }}>
                {option.name}
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px',
            marginTop: '20px',
          }}
        >
          <Divider sx={{ width: '45%' }} />
          <Box
            sx={{
              fontSize: '11.2px',
              textAlign: 'center',
              marginX: '5px',
            }}
          >
            Or
          </Box>
          <Divider sx={{ width: '45%' }} />
        </Box>

        <form
          onSubmit={handleSubmit((data) => {
            setFormEmail(data.email);
            mutation.mutate({
              account_type: activeAccountType,
              name: data.name,
              email: data.email,
              password: data.password,
              password_confirmation: data.password,
            });
          })}
        >
          {fieldData.map((field, index) =>
            field.label !== 'Password' ? (
              <Box key={index} sx={{ marginBottom: '14px' }}>
                <Box
                  sx={{
                    color: '#101928',
                    fontSize: '12px',
                    fontWeight: 500,
                    marginBottom: '5px',
                  }}
                >
                  {field.label}
                </Box>
                <TextField
                  {...register(field.name, {
                    required: `${field.label} is required`,
                  })}
                  placeholder={field.placeholder}
                  sx={{ width: '100%' }}
                  inputProps={{ style: { fontSize: '12px' } }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {field.icon}
                      </InputAdornment>
                    ),
                  }}
                />
                <p style={fieldErrorMessageStyle}>
                  {errors[field.name]?.message as string}
                </p>
              </Box>
            ) : (
              <Box key={index} sx={{ marginBottom: '14px' }}>
                <Box
                  sx={{
                    color: '#101928',
                    fontSize: '12px',
                    fontWeight: 500,
                    marginBottom: '5px',
                  }}
                >
                  {field.label}
                </Box>
                <TextField
                  {...register(field.name, {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must have at least 8 characters',
                    },
                  })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder={field.placeholder}
                  sx={{ width: '100%' }}
                  inputProps={{ style: { fontSize: '12px' } }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <p style={fieldErrorMessageStyle}>
                  {errors[field.name]?.message as string}
                </p>
              </Box>
            )
          )}
          <Box>
            <Button
              type="submit"
              variant="contained"
              {...(mutation.isPending || mutation.isSuccess) && { disabled: true }}
              style={{
                textTransform: 'none',
                width: '100%',
                marginTop: '10px',
                marginBottom: '20px',
              }}
            >
              Create Your Account
            </Button>
          </Box>
        </form>

        <Box sx={{ fontSize: '12px', textAlign: 'center' }}>
          Already have an account?{' '}
          <Link style={{ display: 'inline' }} href="/signin">
            <span style={{ color: '#E61C31', fontWeight: 500 }}>Log in</span>
          </Link>
        </Box>

        {showSuccess && (
          <Alert
            sx={{ position: 'fixed', right: 20, top: 10, zIndex: 1000 }}
            variant="filled"
            severity="success"
          >
            Registration successful!
          </Alert>
        )}
        {mutation.isError && !mutation.isPending && (
          <Alert
            sx={{ position: 'fixed', right: 20, top: 10, zIndex: 1000 }}
            variant="filled"
            severity="error"
          >
            {mutation.error.message}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default SignUpForm;
