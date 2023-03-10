import { Card, Col, Row } from 'react-bootstrap'
import { Globe, PersonLinesFill, ShieldLock, TelephoneFill } from 'react-bootstrap-icons'
import { makeStyles } from '../../theme'
import UserSearchInfo from '../../Types/UserSearchInfo'
import UserAvatar from './UserAvatar'

interface IUserSearchCard {
  user: UserSearchInfo
}

const useStyles = makeStyles()((theme) => ({
  card: {
    width: '700px',
    border: 'none'
  },
  cardImage: {
    margin: '5px',
    height: '120px',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    borderRadius: '0.375rem'
  },
  title: {
    fontSize: '1.5rem'
  },
  info: {
    fontSize: '1.0rem'
  },
  icon: {
    marginRight: '0.5rem'
  }
}))

const UserSearchCard = (props: IUserSearchCard) => {
  const { classes, cx } = useStyles()
  
  return (
    <Card className={`${classes.card} m-1`}>
      <Row>
        <Col md='auto'>
          <Card.Img className={classes.cardImage} variant="top" src={'/avatars/' + (props.user?.avatar ? props.user?.avatar : 'no-avatar.jpg')  } />
        </Col>
        <Col>
          <Card.Body>
            <Card.Title className={classes.title}>{props.user?.firstName} {props.user?.secondName}</Card.Title>
            <Row className='mb-2'>
              <Col>
                <Card.Text className={classes.info}><ShieldLock size={20} className={classes.icon} />Отдел: ???</Card.Text>
              </Col>
              <Col>
                <Card.Text className={classes.info}><Globe size={20} className={classes.icon} />{props.user.email}</Card.Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card.Text className={classes.info}><PersonLinesFill size={20} className={classes.icon} />Должность: ???</Card.Text>
              </Col>
              <Col>
                <Card.Text className={classes.info}><TelephoneFill size={20} className={classes.icon} />{props.user.phoneNumber}</Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}

export default UserSearchCard
