import { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getLessonByNumber } from '../../Request/GetRequests'
import { checkAnswer } from '../../Request/PostRequests'
import { makeStyles } from '../../theme'
import Lesson from '../../Types/Lesson'
import Test from '../../Types/Test'
import Loading from '../Common/Loading'
import Paginate from '../Common/Paginate'
import LessonCard from '../Lesson/LessonCard'
import TestPage from '../Test/TestPage'
import TestQuestion from '../Test/TestQuestion'
import TheoryPage from '../Theory/TheoryPage'

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

const LessonPage = () => {
  const { classes, cx } = useStyles()
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [page, setPage] = useState<number>(1)
  const [maxPage, setMaxPage] = useState<number>(1)
  const [lessonPage, setLessonPage] = useState<any>(null)
  const [isTheory, setTheoryCondition] = useState<boolean>(false)
  const [showWrongAnswer, setShowWrongAnswer] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isAnsweredCorrectly, setAnsweredCorrectly] = useState<boolean>(false)
  const params = useParams()
  let isMounted = true
  let currentAnswer = ''

  const getLesson = async (
    isMounted: boolean,
    url: string,
    lessonNumber: string,
  ) => {
    const res = await getLessonByNumber(url, lessonNumber)
    if (isMounted) {
      setLesson(res)
      setLoading(false)
    }
  }

  const checkAnswerCorrectness = async () => {
    const isCorrect = await checkAnswer((lessonPage as Test).id, currentAnswer)
    setAnsweredCorrectly(isCorrect)
    if (!isCorrect) {
      setShowWrongAnswer(true)
      setTimeout(() => {
        setShowWrongAnswer(false)
      }, 1000)
    }
  }

  const getLessonPage = (newPage: number) => {
    if (showWrongAnswer) return

    if (!isAnsweredCorrectly && lessonPage && !isTheory && newPage > page) {
      checkAnswerCorrectness()
      if (!isAnsweredCorrectly) return
    }

    const theory = lesson?.theoryPages.find((p) => p.pageNumber === newPage)
    const test = lesson?.testPages.find((p) => p.pageNumber === newPage)

    if (theory) {
      setLessonPage(theory)
      setTheoryCondition(true)
      setPage(newPage)
      setAnsweredCorrectly(true)
    } else if (test) {
      setLessonPage(test)
      setTheoryCondition(false)
      setPage(newPage)
      setAnsweredCorrectly(false)
    }
  }

  useEffect(() => {
    getLesson(isMounted, params?.url as string, params?.lessonNumber as string)

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (lesson) {
      setMaxPage(
        Math.max(lesson.testPages.length + lesson.theoryPages.length, 1),
      )
      getLessonPage(1)
    }

    return () => {
      isMounted = false
    }
  }, [lesson])

  const onTestAnswerChanged = (testId: string, answerId: string) => {
    currentAnswer = answerId
  }

  return (
    <Container className={classes.container}>
      {isLoading || !lesson ? (
        <Loading />
      ) : (
        <LessonCard lesson={lesson} hideCompletion dontGoTo />
      )}
      {isLoading || !lesson || !lessonPage ? null : isTheory ? (
        <TheoryPage theory={lessonPage} />
      ) : (
        <TestQuestion
          test={lessonPage}
          wrongAnswer={showWrongAnswer}
          onChanged={onTestAnswerChanged}
        />
      )}
      <Row className={classes.paginator}>
        <Paginate
          initialPage={page}
          maxPage={maxPage}
          onPageChange={getLessonPage}
          loading={isLoading}
        />
      </Row>
    </Container>
  )
}

export default LessonPage
