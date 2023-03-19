import { useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { checkComplexTest } from '../../Request/PostRequests'
import { makeStyles } from '../../theme'
import Lesson from '../../Types/Lesson'
import Loading from '../Common/Loading'
import LessonCard from '../Lesson/LessonCard'
import TestQuestion from './TestQuestion'
import TestResults from './TestResults'

const useStyles = makeStyles()((theme) => ({
  paginator: {
    marginTop: 'auto',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  questions: {
    marginTop: '1rem',
  },
}))

interface ITestLesson {
  loading: boolean
  lesson: Lesson | null
}

const TestLesson = (props: ITestLesson) => {
  const { classes, cx } = useStyles()

  const [currentAnswers, setCurrentAnswers] = useState<any>({})
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)

  const onTestAnswerChanged = (testId: string, answerId: string, hasManyAnswers: boolean) => {
    const answers = JSON.parse(JSON.stringify(currentAnswers))
    if(hasManyAnswers) {
      if(answers[testId] && answers[testId].find((i: string) => i === answerId)) {
        answers[testId] = answers[testId].filter((i: string) => i !== answerId);
      } else {
        if(answers[testId]) {
          answers[testId] = [...answers[testId], answerId];
        } else {
          answers[testId] = [answerId];
        }
      }
    } else {
      answers[testId] = [answerId]
    }
    setCurrentAnswers(answers)
  }

  const checkTest = async () => {
    const res = await checkComplexTest(props.lesson!.id, currentAnswers)
    if (res != null) {
      setCorrectAnswers(res.correctAnswers)
      setTotalQuestions(res.totalAnswers)
    }
  }

  const onTestFinished = () => {
    checkTest()
  }

  return (
    <Container className={classes.container}>
      {props.loading || !props.lesson ? (
        <Loading />
      ) : (
        <LessonCard lesson={props.lesson} hideCompletion dontGoTo />
      )}
      {!props.loading && props.lesson && totalQuestions < 1 ? (
        props.lesson.testPages.map((test) => (
          <TestQuestion
            key={test.id}
            test={test}
            className={classes.questions}
            onChanged={onTestAnswerChanged}
            pickedAnswers={currentAnswers[test.id] ? currentAnswers[test.id] as string[] : []}
          />
        ))
      ) : (
        <TestResults
          score={correctAnswers}
          total={totalQuestions}
          courseUrl={props.lesson!.courseUrl}
        />
      )}
      {totalQuestions < 1 && (
        <Row className={classes.paginator}>
          <Button onClick={onTestFinished}>Завершить тест</Button>
        </Row>
      )}
    </Container>
  )
}

export default TestLesson
