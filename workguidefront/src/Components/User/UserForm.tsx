import React, { useEffect } from 'react'

import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { makeStyles } from '../../theme'
import { Globe, PersonLinesFill, ShieldLock, TelephoneFill } from 'react-bootstrap-icons'
import UserMainInfo from '../../Types/UserMainInfo'
import UserLinks from '../../Types/UserLinks'
import { updateUserLinks } from '../../Request/PutRequests'
import ServerResponse from '../../Types/ServerResponse'

interface IUserForm {
  user: UserMainInfo;
}

const useStyles = makeStyles()((theme) => ({
  card: {
    textAlign: 'left',
    width: '700px',
    border: 'none',
    backgroundColor: '#A370F7'
  },
  cardImage: {
    margin: '5px',
    height: '180px',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    borderRadius: '0.375rem'
  },
  title: {
    fontSize: '1.5rem'
  },
  info: {
    fontSize: '1.0rem',
    marginBottom: '0.25rem',
    paddingBottom: '0.25rem',
    borderBottom: '1px solid lightgray'
  },
  icon: {
    marginRight: '0.5rem'
  },
  saveButton: {
    backgroundColor: 'transparent',
    textDecoration: 'underline',
    fontSize: '1.25rem',
    border: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
      textDecoration: 'underline',
    }
  }
}))

const UserForm: React.FC<IUserForm> = (props: IUserForm) => {
  const { classes, cx } = useStyles()
  const [userData, setUserData] = React.useState<UserLinks>({
    phoneNumber: '',
    email: ''
  })

  const handleMailChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUserData({ phoneNumber: userData.phoneNumber, email: event.target.value as string })
  }

  const handlePhoneChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUserData({ phoneNumber: event.target.value as string, email: userData.email })
  }

  const onSave = async () => {
    redirectTo(await updateUserLinks(userData))
  }

  const redirectTo = async (response: ServerResponse) => {
    window.location.reload();
  }

  useEffect(() => {
    setUserData({ phoneNumber: props.user.phoneNumber, email: props.user.email });
  }, [])

  return (
    <Card className={`${classes.card} m-1`}>
      <Row>
        <Col md='auto'>
          <Card.Img className={classes.cardImage} variant="top" src={'/avatars/' + (props.user.avatar ? props.user.avatar : 'no-avatar.jpg')} />
        </Col>
        <Col>
          <Card.Body className='py-5'>
            <Card.Title className={classes.title}>{props.user.firstName} {props.user.secondName}</Card.Title>
            <Card.Text className={classes.info}><ShieldLock size={18} className={classes.icon} />Отдел: ???</Card.Text>
            <Card.Text className={classes.info}><PersonLinesFill size={18} className={classes.icon} />Должность: ???</Card.Text>
          </Card.Body>
        </Col>
      </Row>
      <Row>
        <InputGroup className="mb-3">
          <InputGroup.Text id="email-input"><Globe /></InputGroup.Text>
          <Form.Control
            placeholder="Email"
            aria-describedby="email-input"
            onChange={handleMailChange} value={userData.email}
          />
        </InputGroup>
      </Row>
      <Row>
        <InputGroup className="mb-3">
          <InputGroup.Text id="phone-input"><TelephoneFill /></InputGroup.Text>
          <Form.Control
            placeholder="Телефон"
            aria-describedby="phone-input"
            onChange={handlePhoneChange} value={userData.phoneNumber}
          />
        </InputGroup>
      </Row>
      <Row>
        <InputGroup>
          <Button
            type="button"
            className={`btn btn-primary w-100 ${classes.saveButton}`}
            variant="contained"
            color="primary"
            onClick={onSave}
          >
            Сохранить
          </Button>
        </InputGroup>
      </Row>
    </Card >
  )
}

export default UserForm
