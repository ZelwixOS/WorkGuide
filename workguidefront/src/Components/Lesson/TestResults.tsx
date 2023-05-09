import { Button, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { makeStyles } from '../../theme'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Achievement from '../../Types/Achievement'

const useStyles = makeStyles()((theme) => ({
  paginator: {
    marginTop: 'auto',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
  },
  circle: {
    borderRadius: '50%',
    marginLeft: '25rem',
    marginRight: '25rem',
    aspectRatio: '1 / 1',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(12rem + 1vw)',
    fontWeight: 550,
    marginTop: '4rem',
  },
  achievements: {
    padding: '1rem',
  },
  success: {
    backgroundColor: '#AFA',
  },
  medium: {
    backgroundColor: '#FFA',
  },
  bad: {
    backgroundColor: '#FAA',
  },
}))

interface ITestResults {
  score: number
  total: number
  courseUrl: string
  achievements: Achievement[]
  setAchievemetns: React.Dispatch<React.SetStateAction<Achievement[]>>
}

const TestResults = (props: ITestResults) => {
  const { classes, cx } = useStyles()
  const navigate = useNavigate()

  const evaluation = [
    'В следующий раз будьте внимательней!',
    'Неплохой результат, но вы можете лучше!',
    'Это хороший результат!',
  ]

  const colorStyle = [classes.bad, classes.medium, classes.success]

  const onReturnToCourse = () => {
    navigate(`/courses/${props.courseUrl}`)
  }

  const getRightIndex = () => {
    const real = (props.score / props.total) * (evaluation.length - 1)
    return Math.round(real)
  }

  const handleAchievementClosed = (e?: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> | undefined) => {
    const id = (e?.target as Element)?.id
    console.log(id)
    if (id) {
      const newAchs = [...props.achievements]
      const ind = newAchs.findIndex(a => a.id === id)
      if (ind > -1) {
        newAchs.splice(ind, 1)
        props.setAchievemetns(newAchs)
      }
    }
  }

  return (
    <>
      <Row className={`d-flex justify-content-center ${classes.title}`}>
        Тест завершён!
      </Row>
      <Row
        className={`d-flex justify-content-center ${classes.circle} ${
          colorStyle[getRightIndex()]
        }`}
      >
        {props.score}/{props.total}
      </Row>
      <Row className={`d-flex justify-content-center ${classes.title}`}>
        {evaluation[getRightIndex()]}
      </Row>
      <Row className={classes.paginator}>
        <Button onClick={onReturnToCourse}>К курсу</Button>
      </Row>
      <ToastContainer position="bottom-end" className={classes.achievements}>
        {props.achievements &&
          props.achievements.map((a) => (
            <Toast key={a.id} id={a.id} onClose={handleAchievementClosed}>
              <Toast.Header>
                <img src={a.iconUrl} className="rounded me-2" alt="" />
                <strong className="me-auto">{a.name}</strong>
              </Toast.Header>
              <Toast.Body>{a.description}</Toast.Body>
            </Toast>
          ))}
      </ToastContainer>
    </>
  )
}

export default TestResults
