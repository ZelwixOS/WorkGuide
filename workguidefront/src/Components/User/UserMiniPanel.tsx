import React, { useEffect, useState, useRef } from 'react'
import { Button, Dropdown, OverlayTrigger, Popover } from 'react-bootstrap'
import { getUserInfo, logOut } from '../../Request/AccountRequests'
import { makeStyles } from '../../theme'
import UserMainInfo from '../../Types/UserMainInfo'

import UserAvatar from './UserAvatar'

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: "2rem",
  },
  menu: {
    padding: "1rem",
  },
  item: {
    paddingRight: "4rem",
    paddingLeft: "4rem",
    paddingTop: "2rem",
    paddingBottom: "2rem",
  },
}))

const UserMiniPanel: React.FC = () => {
  const { classes, cx } = useStyles()

  const [userInfo, setUserInfo] = useState<UserMainInfo>()
  const [open, setOpen] = React.useState<boolean>(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)

  const prevOpen = useRef(open)
  useEffect(() => {
    if (
      prevOpen.current === true &&
      open === false &&
      anchorRef.current !== null
    ) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  useEffect(() => {
    let isMounted = true
    getUserInformation(isMounted)
    return () => {
      isMounted = false
    }
  }, [])

  function handleListKeyDown(event: React.KeyboardEvent) {
    const keyValue = 'Tab'
    if (event.key === keyValue) {
      event.preventDefault()
      setOpen(false)
    }
  }

  const getUserInformation = async (isMounted: boolean) => {
    const userInformation = await getUserInfo()

    if (isMounted) {
      setUserInfo(userInformation)
    }
  }

  const signOut = async () => {
    await logOut()
    sessionStorage.removeItem('signed')
    document.location.href = `/`
  }

  return (
    <React.Fragment>
      {userInfo && (
        <React.Fragment>
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={
              <Popover
              >
                    <Dropdown.Menu
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                      className={classes.menu}
                    >
                      {userInfo.role === 'Admin' && (
                        <Dropdown.Item
                          className={classes.item}
                          onClick={() => {
                            document.location.href = `/admin`
                          }}
                        >
                            Администрирование
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item className={classes.item} onClick={signOut}>
                        Выйти
                      </Dropdown.Item>
                    </Dropdown.Menu>
              </Popover>
            }
          >
            <Button>
              <UserAvatar
                userInfo={{
                  userName: userInfo.userName,
                  avatar: userInfo.avatar,
                  role: userInfo.role,
                }}
              />
            </Button>
          </OverlayTrigger>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}
export default UserMiniPanel
