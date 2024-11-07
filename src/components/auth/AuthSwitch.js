import { Button } from '@mui/material';

const AuthSwitch = ({ loginMethod, setLoginMethod }) => {
  return (
    <Button
      variant="text"
      fullWidth
      onClick={() => setLoginMethod(loginMethod === 'email' ? 'mobile' : 'email')}
      sx={{ mt: 1 }}
    >
      {loginMethod === 'email' ? 'Sign in with Mobile' : 'Sign in with Email'}
    </Button>
  );
};

export default AuthSwitch;
