import React from 'react'
import Drawer from '@mui/material/Drawer'
import { List } from 'react-bootstrap-icons'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { IconButton, ListItemButton, MenuItem, Typography } from '@mui/material'

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

  const menuItem = (name: string, click: () => void) => (
    <ListItem disablePadding>
      <ListItemButton onClick={click}>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  )

  React.useEffect(() => {
    let isMounted = true
    checkAuth(isMounted)
    return () => {
      isMounted = false
    }
  })

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
        <List />
      </IconButton>
      <Drawer anchor={'left'} open={state} onClose={toggleDrawer(false)}>
        {role === Roles.admin && (
          <List>
            {menuItem('Курсы', courses)}
            <Divider />
            {menuItem('Уроки', lessons)}
            <Divider />
            {menuItem('Работники', workers)}
          </List>
        )}
      </Drawer>
    </React.Fragment>
  )
}

export default HiddenNavigation
