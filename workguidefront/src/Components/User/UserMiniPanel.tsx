import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from 'tss-react/mui'
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Divider, Typography } from '@mui/material';

import UserAvatar from './UserAvatar';
import { getUserInfo, logOut } from '../../Request/AccountRequests';
import UserMainInfo from '../../Types/UserMainInfo';

const useStyles = makeStyles()((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
    menu: {
      padding: theme.spacing(1),
    },
    item: {
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  }),
);

const UserMiniPanel: React.FC = () => {
  const { classes, cx } = useStyles()

  const [userInfo, setUserInfo] = useState<UserMainInfo>();
  const [open, setOpen] = React.useState<boolean>(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false && anchorRef.current !== null) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    let isMounted = true;
    getUserInformation(isMounted);
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    const keyValue = 'Tab';
    if (event.key === keyValue) {
      event.preventDefault();
      setOpen(false);
    }
  }

  const getUserInformation = async (isMounted: boolean) => {
    const userInformation = await getUserInfo();

    if (isMounted) {
      setUserInfo(userInformation);
    }
  };

  const signOut = async () => {
    await logOut();
    sessionStorage.removeItem('signed');
    document.location.href = `/`;
  };

  return (
    <React.Fragment>
      {userInfo && (
        <React.Fragment>
          <Button onClick={handleToggle} ref={anchorRef}>
            <UserAvatar userInfo={{ userName: userInfo.userName, avatar: userInfo.avatar, role: userInfo.role }} />
          </Button>
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} disablePortal>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                  className={classes.menu}
                >
                  <Typography align="center" variant="h5" color="primary" component="h5">
                    {userInfo.userName} 
                  </Typography>
                  <Typography align="center" variant="subtitle2" component="h6">
                    {`${userInfo.firstName} ${userInfo.secondName}`}
                  </Typography>
                  <Divider />
                  {userInfo.role === 'Admin' && (
                    <MenuItem
                      className={classes.item}
                      onClick={() => {
                        document.location.href = `/admin/courses`;
                      }}
                    >
                      <Typography variant="h6">Администрирование</Typography>
                    </MenuItem>
                  )}
                  <MenuItem className={classes.item} onClick={signOut}>
                    <Typography variant="h6">Выйти</Typography>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Popper>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default UserMiniPanel;
