import React from 'react'
import { Button, Modal, Row } from 'react-bootstrap'
import { makeStyles } from '../../theme'
import LoginForm from '../User/LoginForm'

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
      <Modal
        show={open}
        onHide={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Modal.Header closeButton>
          <Modal.Title id="alert-dialog-title">Войти</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm />
        </Modal.Body>
        <Modal.Footer>
          <Row>
            Вы здесь впервые?
            <a href="/Registration"> Зарегистрироваться </a>
          </Row>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default LoginModal
