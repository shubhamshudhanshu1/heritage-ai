/* eslint-disable react/no-unescaped-entities */
'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import EmailLogin from './../../../components/auth/EmailLogin';
import MobileOtpLogin from './../../../components/auth/MobileOtpLogin';
import AuthSwitch from './../../../components/auth/AuthSwitch';
import ErrorMessage from './../../../components/auth/ErrorMessage';

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '', mobile: '', otp: '' });
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loginMethod, setLoginMethod] = useState('mobile');

  const handleSignIn = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload =
        loginMethod === 'email'
          ? { email: credentials.email, password: credentials.password }
          : { mobile: credentials.mobile, otp: credentials.otp };
      const res = await signIn('credentials', {
        redirect: false,
        ...payload
      });
      setLoading(false);
      if (!res.ok) setError(res.error);
      else window.location.href = '/';
    } catch (err) {
      setLoading(false);
      setError('Login failed. Please check your credentials or OTP.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSignIn}
      sx={{
        p: 4,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 400,
        mx: 'auto'
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Signin
      </Typography>

      {loginMethod === 'email' ? (
        <EmailLogin credentials={credentials} setCredentials={setCredentials} />
      ) : (
        <MobileOtpLogin
          credentials={credentials}
          setCredentials={setCredentials}
          isOtpSent={isOtpSent}
          setIsOtpSent={setIsOtpSent}
          setError={setError}
        />
      )}

      <ErrorMessage error={error} />

      {loginMethod === 'mobile' && isOtpSent && (
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Verify OTP & Sign In
          {loading && (
            <CircularProgress size={`15px`} sx={{ color: 'white', marginLeft: '10px' }} />
          )}
        </Button>
      )}

      <AuthSwitch loginMethod={loginMethod} setLoginMethod={setLoginMethod} />

      <Button
        variant="text"
        fullWidth
        href="/auth/register"
        sx={{ mt: 1, fontSize: '12px', color: 'primary.main' }}
      >
        Don't have an account? Register
      </Button>
    </Box>
  );
}
