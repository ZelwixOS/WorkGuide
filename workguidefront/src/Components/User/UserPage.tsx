import { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Globe, PersonLinesFill, ShieldLock, TelephoneFill } from 'react-bootstrap-icons'
import { getCurrentUserInfo } from '../../Request/GetRequests'
import { makeStyles } from '../../theme'
import UserMainInfo from '../../Types/UserMainInfo'
import AchievementsList from '../Achievements/AchievementsList'
import ActivityList from '../Activity/ActivityList'
import Calendar from '../Calendar/Calendar'
import Loading from '../Common/Loading'
import NavigationBar from '../Common/NavigationBar'
import CourseSmallCardList from '../Course/CourseSmallCardList'
import UserModal from './UserModal'

const useStyles = makeStyles()((theme) => ({
  card: {
    textAlign: 'left',
    width: '700px',
    border: 'none'
  },
  cardImage: {
    margin: '5px',
    height: '175px',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    borderRadius: '0.375rem'
  },
  title: {
    fontSize: '1.5rem'
  },
  info: {
    fontSize: '1.0rem',
    marginBottom: '1.25rem',
    paddingBottom: '0.25rem',
    borderBottom: '1px solid lightgray'
  },
  icon: {
    marginRight: '0.5rem'
  }
}))

const UserPage = () => {
  const { classes } = useStyles()
  const [user, setUser] = useState<UserMainInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getUser = async () => {
    setLoading(true);
    const res = await getCurrentUserInfo();
    setUser(res);
    setLoading(false);
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
    <NavigationBar />
    <Container className='h-100'>
      {loading ? <Loading /> : !user ? <div className='w-100 h-100 d-flex align-items-center justify-content-center'><h2>Для работы необходимо войти в систему 🚪</h2></div> :
        <>
          <Row>
            <Col md={8} className='ps-0'>
              <Row>
                <Card className={`${classes.card} m-1`}>
                  <Row>
                    <Col md='auto' className='p-0'>
                      <Card.Img className={classes.cardImage} variant="top" src={'/avatars/' + (user.avatar ? user.avatar : 'no-avatar.jpg')} />
                    </Col>
                    <Col>
                      <Card.Body>
                        <Card.Title className={classes.title}>{user.firstName} {user.secondName} <UserModal user={user} /></Card.Title>
                        <Card.Text className={classes.info}><PersonLinesFill size={18} className={classes.icon} />Должность: {user.position}</Card.Text>
                        <Card.Text className={classes.info}><Globe size={18} className={classes.icon} />{user.email}</Card.Text>
                        <Card.Text className={classes.info}><TelephoneFill size={18} className={classes.icon} />{user.phoneNumber}</Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Row>
              <Row>
                <CourseSmallCardList />
              </Row>
            </Col>
            <Col md={4} className='p-0'>
              <ActivityList />
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col md={8}>
              <Row>
                <AchievementsList />
              </Row>
            </Col>
            <Col md={4}>
              <Calendar />
            </Col>
          </Row>
        </>
      }
    </Container>
    </>
  )
}

export default UserPage
