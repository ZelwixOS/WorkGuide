import { Badge } from "react-bootstrap";
import { Bell } from "react-bootstrap-icons";
import { makeStyles } from "tss-react/mui"

interface INotificationIcon {
  hasNotifications?: boolean;
  opened?: boolean;
}

const useStyles = makeStyles()((theme) => ({
  badge: {
    fontSize: '5px',
    position: 'absolute',
    top: '5px',
    left: '22px'
  },
  opened: {
    color: 'white !important'
  }
}))

const NotificationIcon = (props: INotificationIcon) => {
  const { classes, cx } = useStyles()

  return <>
    <Bell size={18} className={props.opened ? classes.opened : ''}/>
    {props.hasNotifications && !props.opened ? <Badge pill bg="danger" className={classes.badge}>
      &nbsp;
    </Badge> : null }
  </>
}

export default NotificationIcon;