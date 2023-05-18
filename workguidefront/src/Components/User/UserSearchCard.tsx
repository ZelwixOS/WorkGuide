import { Card, Col, Row } from 'react-bootstrap'
import { Globe, PersonLinesFill, ShieldLock, TelephoneFill } from 'react-bootstrap-icons'
import { makeStyles } from '../../theme'
import UserInfo from '../../Types/UserInfo'
interface IUserSearchCard {
  user: UserInfo
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
                <Card.Text className={classes.info}><ShieldLock size={20} className={classes.icon} />Должность: {props.user.position}</Card.Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card.Text className={classes.info}><Globe size={20} className={classes.icon} /><a href={`mailto:${props.user.email}`}>{props.user.email}</a></Card.Text>
              </Col>
              <Col>
                <Card.Text className={classes.info}><TelephoneFill size={20} className={classes.icon} /><a href={`tel:${props.user.phoneNumber}`}>{props.user.phoneNumber}</a></Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}

export default UserSearchCard
