import { useEffect, useState } from 'react'
import { Container, Dropdown } from 'react-bootstrap'
import { makeStyles } from '../../theme'
import NotificationIcon from '../Notifications/NotificationIcon'
import Notification from '../../Types/Notification'
import NotificationCard from '../Notifications/NotificationCard'
import { getNotifications } from '../../Request/GetRequests'
import { readNotification } from '../../Request/PostRequests'



const useStyles = makeStyles()((theme) => ({
  toggle: {
    '&::before': {
      display: 'none !important'
    },
    '&::after': {
      display: 'none !important'
    },
  },
  background: {
    backgroundColor: '#A370F780',
    top: '100% !important',
    right: '0% !important',
    marginTop: '20px !important',
    userSelect: 'none'
  },
  noNotifications: {
    color: '#fff',
    textAlign: 'center',
    width: '200px'
  }
}))


const Notifications = () => {
  const { classes, cx } = useStyles()
  const [notifications, setNotifications] = useState<readonly Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);
  const [hasNotifications, setHasNotifications] = useState<boolean>(true);

  const loadNotifications = async () => {
    setLoading(false);
    const newNotifications: Notification[] = await getNotifications();

    setNotifications(newNotifications);
    setHasNotifications(newNotifications.length > 0);
  }

  const onToggle = (nextShow: boolean, meta: any) => {
    setOpened(nextShow);
  }

  const onNotificationClose = async (id: string) => {
    await readNotification(id);

    const newNotifications = notifications.filter(n => n.id !== id);
    setNotifications(newNotifications);
    setHasNotifications(newNotifications.length > 0);
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <Dropdown onToggle={onToggle} drop='start'>
      <Dropdown.Toggle as={Container} id="dropdown-basic" className={classes.toggle}>
        <NotificationIcon hasNotifications={hasNotifications} opened={opened} />
      </Dropdown.Toggle>

      <Dropdown.Menu className={classes.background}>
        {loading || !hasNotifications ? <div className={classes.noNotifications}><span>Оповещений нет</span></div> : notifications.map(n => <NotificationCard notification={n} close={onNotificationClose} />)}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default Notifications;
