import { Button, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { makeStyles } from '../../theme'

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
    const real = props.score / props.total * (evaluation.length - 1)
    return Math.round(real)
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
    </>
  )
}

export default TestResults
