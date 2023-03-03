import {  Container } from 'react-bootstrap'
import { makeStyles } from '../../theme'
import Test from '../../Types/Test'
import LessonCard from '../Lesson/LessonCard'
import TestQuestion from './TestQuestion'

interface ITestPage {
  test: Test
  onChanged: (testId: string, answerId: string) => void
  isWrongAnswer: boolean
}

const useStyles = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  questionCard: {
    marginTop: '1rem',
  },
}))

const TestPage = (props: ITestPage) => {
  const { classes, cx } = useStyles()

  return (
    <Container className={classes.container}>
      <LessonCard
        lesson={{
          id: '',
          name: props.test.lessonName,
          orderNumber: props.test.lessonNumber,
          courseUrl: props.test.courseUrl,
          courseName: '',
          theoryPages: [],
          testPages: [],
        }}
        hideCompletion
      />
      <TestQuestion
        test={props.test}
        className={classes.questionCard}
        onChanged={props.onChanged}
        wrongAnswer={props.isWrongAnswer}
      />
    </Container>
  )
}

export default TestPage
