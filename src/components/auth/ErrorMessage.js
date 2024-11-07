import { Typography } from '@mui/material';

const ErrorMessage = ({ error }) => {
  return error ? (
    <Typography color="error" sx={{ mt: 1 }}>
      {error}
    </Typography>
  ) : null;
};

export default ErrorMessage;
