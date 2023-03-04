import { useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { checkAnswer } from '../../Request/PostRequests'
import { makeStyles } from '../../theme'
import Lesson from '../../Types/Lesson'
import Test from '../../Types/Test'
import Loading from '../Common/Loading'
import Paginate from '../Common/Paginate'
import LessonCard from '../Lesson/LessonCard'
import TestQuestion from './TestQuestion'
import TheoryPage from './TheoryPage'

const useStyles = makeStyles()((theme) => ({
  paginator: {
    marginTop: 'auto',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}))

interface ICommonLesson {
  loading: boolean
  lesson: Lesson | null
  maxPage: number
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const CommonLesson = (props: ICommonLesson) => {
  const { classes, cx } = useStyles()

  const [lessonPage, setLessonPage] = useState<any>(null)
  const [isTheory, setTheoryCondition] = useState<boolean>(false)
  const [showWrongAnswer, setShowWrongAnswer] = useState<boolean>(false)
  const [isAnsweredCorrectly, setAnsweredCorrectly] = useState<boolean>(false)
  const [currentAnswers, setCurrentAnswers] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState<number>(0)

  const checkAnswerCorrectness = async () => {
    const isCorrect = await checkAnswer(
      (lessonPage as Test).id,
      currentAnswers[props.page],
    )

    setAnsweredCorrectly(isCorrect)
    if (!isCorrect) {
      setShowWrongAnswer(true)
      setTimeout(() => {
        setShowWrongAnswer(false)
      }, 1000)
    }
    return isCorrect
  }

  const getLessonPage = (newPage: number, forced = false) => {
    if (!forced) {
      if (newPage === currentPage || newPage < 1) return false

      if (newPage > 1) {
        if (
          !isAnsweredCorrectly &&
          lessonPage &&
          !isTheory &&
          newPage > props.page
        ) {
          checkAnswerCorrectness().then((isCorrect: boolean) => {
            if (isCorrect) getLessonPage(newPage, true)
          })
          return false
        }
      }
    }

    const theory = props.lesson?.theoryPages.find(
      (p) => p.pageNumber === newPage,
    )
    const test = props.lesson?.testPages.find((p) => p.pageNumber === newPage)

    if (theory) {
      setLessonPage(theory)
      setTheoryCondition(true)
      props.setPage(newPage)
      setAnsweredCorrectly(true)
    } else if (test) {
      setLessonPage(test)
      setTheoryCondition(false)
      props.setPage(newPage)
      setAnsweredCorrectly(false)
    }

    setCurrentPage(newPage)
    return true
  }

  const onTestAnswerChanged = (testId: string, answerId: string) => {
    const answers = [...currentAnswers]
    answers[props.page] = answerId
    setCurrentAnswers(answers)
  }

  return (
    <Container className={classes.container}>
      {props.loading || !props.lesson ? (
        <Loading />
      ) : (
        <LessonCard lesson={props.lesson} hideCompletion dontGoTo />
      )}
      {props.loading || !props.lesson || !lessonPage ? null : isTheory ? (
        <TheoryPage theory={lessonPage} />
      ) : (
        <TestQuestion
          test={lessonPage}
          wrongAnswer={showWrongAnswer}
          onChanged={onTestAnswerChanged}
          pickedAnswer={currentAnswers[props.page]}
        />
      )}
      {getLessonPage(props.page) ? <></> : <></>}
      <Row className={classes.paginator}>
        {props.page > 0 ? (
          <Paginate
            currentPage={props.page}
            initialPage={props.page}
            maxPage={props.maxPage}
            onPageChange={getLessonPage}
            loading={props.loading}
          />
        ) : (
          <></>
        )}
      </Row>
    </Container>
  )
}

export default CommonLesson
