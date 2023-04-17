import React from 'react'

import ServerResponse from '../../Types/ServerResponse'
import Login from '../../Types/Login'
import { logInRequest, serverAnswers } from '../../Request/AccountRequests'
import { Button, Container, Form, Row } from 'react-bootstrap'
import ErrorSnackBar from '../Common/ErrorSnackBar'
import { makeStyles } from '../../theme'

const useStyles = makeStyles()((theme) => ({
  spaces: {
    marginTop: '1rem',
  },
  buttons: {
    justifyItems: 'flex-end',
  },
}))

const LoginForm: React.FC = () => {
  const { classes, cx } = useStyles()

  const [loginData, setLoginData] = React.useState<Login>({
    login: '',
    password: '',
    rememberMe: true,
  })

  const [errors, setErrors] = React.useState<string[]>([])
  const [open, setOpen] = React.useState<boolean>(false)
  const [message, setMessage] = React.useState<string>('')

  const handleRememberMeChange = () => {
    setLoginData({
      login: loginData.login,
      password: loginData.password,
      rememberMe: !loginData.rememberMe,
    })
  }

  const handleLoginChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLoginData({
      login: event.target.value as string,
      password: loginData.password,
      rememberMe: loginData.rememberMe,
    })
  }

  const handlePasswordChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setLoginData({
      login: loginData.login,
      password: event.target.value as string,
      rememberMe: loginData.rememberMe,
    })
  }

  const logInButtonClicked = async () => {
    redirectTo(await logInRequest(loginData))
  }

  const redirectTo = async (response: ServerResponse) => {
    switch (response.code) {
      case serverAnswers.signedIn:
        window.location.replace('/')
        break
      case serverAnswers.noCommand:
        setMessage(response.message)
        setErrors(response.errors)
        setOpen(true)
        break
    }
  }

  return (
    <Container>
      <Form.Floating className={`mb-3 ${classes.spaces}`}>
        <Form.Control
          id="userLogin"
          onChange={handleLoginChange}
          value={loginData.login}
        />
        <label htmlFor="userLogin">Логин</label>
      </Form.Floating>
      <Form.Floating className={`mb-3 ${classes.spaces}`}>
          <Form.Control
            id="userPassword"
            type="password"
            onChange={handlePasswordChange}
            value={loginData.password}
          />
           <label htmlFor="userPassword">Пароль</label>
        </Form.Floating>
        <Form.Check
          type="checkbox"
          className={`mb-3 ${classes.spaces}`}
          id="rememberMe=cb"
          defaultChecked
          name="rememberMe"
          label="Запомнить меня"
        />
      <Row className={classes.buttons}>
        <Button
          type="button"
          className={`btn btn-primary ${classes.spaces}`}
          variant="contained"
          color="primary"
          onClick={logInButtonClicked}
        >
          Войти
        </Button>
      </Row>
      <ErrorSnackBar
        message={message}
        errors={errors}
        open={open}
        setOpen={setOpen}
      />
    </Container>
  )
}

export default LoginForm
