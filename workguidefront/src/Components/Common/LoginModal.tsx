import React from 'react'
import { Button, Modal, Row } from 'react-bootstrap'
import { makeStyles } from '../../theme'
import LoginForm from '../User/LoginForm'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const useStyles = makeStyles()((theme) => ({
  buttons: {
    margin: "0rem 1rem"
  }
}))

const LoginModal: React.FC = () => {
  const { classes, cx } = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button
        className={classes.buttons}
        color="light"
        onClick={handleClickOpen}
      >
        Войти
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Войти</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <LoginForm />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default LoginModal
