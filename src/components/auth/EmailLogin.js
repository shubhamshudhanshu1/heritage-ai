import { TextField } from '@mui/material';
import CommonLabel from '@/components/common/label';

const EmailLogin = ({ credentials, setCredentials }) => {
  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <CommonLabel>Email</CommonLabel>
      <TextField
        name="email"
        type="email"
        fullWidth
        margin="normal"
        required
        value={credentials.email}
        onChange={handleChange}
      />
      <CommonLabel>Password</CommonLabel>
      <TextField
        name="password"
        type="password"
        fullWidth
        margin="normal"
        required
        value={credentials.password}
        onChange={handleChange}
      />
    </>
  );
};

export default EmailLogin;
