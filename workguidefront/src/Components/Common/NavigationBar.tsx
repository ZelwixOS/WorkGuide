import React, { useState, useEffect } from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'
import { getRole } from '../../Request/AccountRequests'
import { makeStyles } from '../../theme'
import Roles from '../../Types/Roles'
import UserMiniPanel from '../User/UserMiniPanel'
import LoginModal from './LoginModal'

const useStyles = makeStyles()((theme) => ({
  buttons: {
    margin: "2rem",
  },
}))

const NavigationBar: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const [isAuth, setAuth] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    let isMounted = true
    checkAuth(isMounted)
    return () => {
      isMounted = false
    }
  })

  const onSearchChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const str = event.target.value as string
    setSearch(str)
  }

  const searchRequest = (
    event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      window.history.pushState({}, 'Service', `/?search=${search}`)
      window.location.replace(`/?search=${search}`)
    }
  }

  const checkAuth = async (isMounted: boolean) => {
    const authres = await getRole()

    if (isMounted) {
      if (authres !== Roles.guest) {
        sessionStorage.setItem('signed', authres)
        setAuth(true)
      } else {
        setAuth(false)
      }
      setLoaded(true)
    }
  }

  const { classes, cx } = useStyles()

  return (
    <Navbar bg="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src="/logo512.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="WorkGuide"
          />
        </Navbar.Brand>
        {loaded && (isAuth ? <UserMiniPanel /> : <LoginModal />)}
      </Container>
    </Navbar>
  )
}
export default NavigationBar
