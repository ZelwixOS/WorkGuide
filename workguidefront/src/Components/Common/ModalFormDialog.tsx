import React, { JSXElementConstructor, ReactElement } from 'react';
import { Dialog, DialogContent, DialogTitle, Grid, IconButton } from '@mui/material';
import { ArrowLeft as ArrowBack } from 'react-bootstrap-icons';

interface IModalFormDialog {
  name: string;
  open: boolean;
  form: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalFormDialog: React.FC<IModalFormDialog> = props => {
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="create-dialog-title"
      aria-describedby="create-dialog-description"
    >
      <Grid container direction="column">
        <DialogTitle id="create-dialog-title">
          <Grid item xs={12} sm={12} container direction="row" justifyContent="flex-start">
            <IconButton onClick={handleClose}>
              <ArrowBack />
            </IconButton>
            {props.name}
          </Grid>
        </DialogTitle>
        <DialogContent>{props.form}</DialogContent>
      </Grid>
    </Dialog>
  );
};

export default ModalFormDialog;
