import { Badge, Card, Col, Row } from 'react-bootstrap'
import { PatchCheck, PatchCheckFill } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { makeStyles } from '../../theme'
import Lesson from '../../Types/Lesson'

interface ILessonCard {
  lesson: Lesson
  useAnimation?: boolean
  hideCompletion?: boolean
}

const useStyles = makeStyles()((theme) => ({
  animated: {
    transition: 'backgroundColor 0.5s',
    '&:hover': {
      backgroundColor: 'lightgray',
    },
  },
  cardImage: {
    width: '100%',
    maxHeight: '100%',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    borderRadius: '0.375rem',
  },
  primaryFont: {
    marginLeft: '0.5rem',
    textAlign: 'left',
    fontSize: 'calc(0.5rem + 1vw)',
  },
}))

const LessonCard = (props: ILessonCard) => {
  const { classes, cx } = useStyles()
  const navigate = useNavigate()
  const onLessonClick = () => {
    navigate(`${props.lesson.orderNumber}`)
  }

  return (
    <Card
      className={`shadow mb-1 ${
        props.useAnimation ? classes.animated : null
      } d-flex-row align-items-left`}
      onClick={() => onLessonClick()}
    >
      <Row className="my-3">
        <Col md={1}>
          <Badge pill className={`${classes.primaryFont} mt-1`} bg="success">
            {props.lesson?.orderNumber}
          </Badge>
        </Col>
        <Col>
          <Card.Title className={`${classes.primaryFont} mt-2`}>
            {props.lesson?.name}
          </Card.Title>
        </Col>
        {props.hideCompletion ? (
          <></>
        ) : (
          <Col md={1}>
            {props.lesson.orderNumber % 2 === 0 ? (
              <PatchCheckFill color="green" size={42} />
            ) : (
              <PatchCheckFill color="#BABABA" size={42} />
            )}
          </Col>
        )}
      </Row>
    </Card>
  )
}

export default LessonCard
