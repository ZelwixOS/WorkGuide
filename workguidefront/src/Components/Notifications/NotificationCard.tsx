import { Card, Col, Row } from 'react-bootstrap'
import { X } from 'react-bootstrap-icons';
import { makeStyles } from '../../theme'
import Notification from '../../Types/Notification'

interface INotificationCard {
  notification: Notification;
  close: (id: string) => void;
}

const useStyles = makeStyles()((theme) => ({
  card: {
    width: '300px',
    border: 'none'
  },
  title: {
    fontSize: '1.2rem'
  },
  info: {
    fontSize: '0.9rem',
    color: '#5227CC'
  }
}))

const NotificationCard = (props: INotificationCard) => {
  const { classes, cx } = useStyles()

  const onClose = () => {
    props.close(props.notification!.id);
  }

  return (
    <Card className={`${classes.card} m-1`}>
      <Card.Body>
        <Row>
          <Col>
            <Card.Title className={classes.title}>{props.notification?.title}</Card.Title>
          </Col>
          <Col md={'auto'}><X size={24} onClick={onClose}/></Col>
        </Row>
        <Card.Text className={classes.info}>{props.notification?.content}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default NotificationCard