import { Button, CircularProgress, TextField } from '@mui/material';
import CommonLabel from '@/components/common/label';
import { useState } from 'react';
import OtpInput from 'react-otp-input';

const MobileOtpLogin = ({ credentials, setCredentials, isOtpSent, setIsOtpSent, setError }) => {
  const [mobileError, setMobileError] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const validateMobileNumber = mobile => /^[0-9]{10}$/.test(mobile);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      setMobileError('');
      setError('');
    }
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleOtpChange = otp => {
    setCredentials(prev => ({ ...prev, otp }));
    setError('');
  };

  const sendOtp = async () => {
    if (!validateMobileNumber(credentials.mobile)) {
      setMobileError('Please enter a valid 10-digit mobile number');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNumber: credentials.mobile })
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) setIsOtpSent(true);
      else setError(data.message || 'Failed to send OTP');
    } catch (err) {
      setLoading(false);
      setError('An error occurred while sending OTP');
    }
  };

  return (
    <>
      <CommonLabel>Mobile Number</CommonLabel>
      <TextField
        name="mobile"
        type="tel"
        fullWidth
        margin="normal"
        required
        value={credentials.mobile}
        onChange={handleChange}
        error={Boolean(mobileError)}
        helperText={mobileError}
        disabled={isOtpSent}
      />

      {isOtpSent && (
        <div className="mt-2">
          <CommonLabel className="mb-2">Enter OTP</CommonLabel>
          <OtpInput
            className="mt-4"
            value={credentials.otp}
            onChange={handleOtpChange}
            numInputs={4}
            renderSeparator={<span>-</span>}
            renderInput={props => <input {...props} />}
            inputStyle={{
              width: '50px',
              height: '50px',
              margin: '0 10px',
              fontSize: '20px',
              borderRadius: '8px',
              border: '1px solid #ced4da',
              textAlign: 'center'
            }}
          />
        </div>
      )}

      {!isOtpSent && (
        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={sendOtp}>
          Send OTP
          {loading && (
            <CircularProgress size={`15px`} sx={{ color: 'white', marginLeft: '10px' }} />
          )}
        </Button>
      )}
    </>
  );
};

export default MobileOtpLogin;
