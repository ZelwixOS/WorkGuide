import React from 'react';
import { Snackbar } from '@mui/material';
import { AlertTitle } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

interface IErrorSnackBar {
  open: boolean;
  setOpen: (b: boolean) => void;
  message: string;
  errors: string[];
}

const ErrorSnackBar: React.FC<IErrorSnackBar> = props => {
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={props?.open} onClose={handleClose}>
      <MuiAlert onClose={handleClose} severity="warning">
        <AlertTitle>{props?.message}</AlertTitle>
        <ul>
          {props?.errors.map((er, key) => (
            <li key={key}>{er}</li>
          ))}
        </ul>
      </MuiAlert>
    </Snackbar>
  );
};

export default ErrorSnackBar;
