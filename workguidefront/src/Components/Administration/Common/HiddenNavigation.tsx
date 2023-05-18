import React from 'react'
import Drawer from '@mui/material/Drawer'
import { List as ListIcon } from 'react-bootstrap-icons'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { IconButton, MenuItem, Typography } from '@mui/material'

import Roles from '../../../Types/Roles'
import { getRole } from '../../../Request/AccountRequests'

const HiddenNavigation = () => {
  const [state, setState] = React.useState(false)
  const [role, setRole] = React.useState('')

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setState(open)
  }

  const onMenuItemClick = (loc: string) => {
    window.location.href = loc
  }

  const lessons = onMenuItemClick.bind(this, '/admin/lessons')
  const courses = onMenuItemClick.bind(this, '/admin/courses')
  const workers = onMenuItemClick.bind(this, '/admin/workers')
  const positions = onMenuItemClick.bind(this, '/admin/positions')
  const achievements = onMenuItemClick.bind(this, '/admin/achievements')

  const menuItem = (name: string, click: () => void) => (
    <MenuItem onClick={click}>
      <ListItem>
        <ListItemText>
          <Typography variant="h6">{name}</Typography>
        </ListItemText>
      </ListItem>
    </MenuItem>
  )

  React.useEffect(() => {
    let isMounted = true
    checkAuth(isMounted)
    return () => {
      isMounted = false
    }
  }, [])

  const checkAuth = async (isMounted: boolean) => {
    const authres = await getRole()
    setRole(authres)
    if (isMounted) {
      if (authres !== Roles.guest) {
        sessionStorage.setItem('signed', authres)
      }
    }
  }

  return (
    <React.Fragment>
      <IconButton
        color="secondary"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <ListIcon />
      </IconButton>
      <Drawer anchor={'left'} open={state} onClose={toggleDrawer(false)}>
        <List>
          {menuItem('Курсы', courses)}
          <Divider />
          {menuItem('Уроки', lessons)}
          <Divider />
          {menuItem('Работники', workers)}
          <Divider />
          {menuItem('Должность', positions)}
          <Divider />
          {menuItem('Достижения', achievements)}
        </List>
      </Drawer>
    </React.Fragment>
  )
}

export default HiddenNavigation
