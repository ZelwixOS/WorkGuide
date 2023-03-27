import { Fab } from '@mui/material'
import { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { ArrowLeft } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
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
  toCoursesButton: {
    position: 'fixed',
    left: '20px',
    bottom: '20px'
  },
  toCoursesButtonArrow: {
    marginRight: '10px'
  }
}))

interface ICommonLesson {
  loading: boolean
  lesson: Lesson | null
  maxPage: number
}

const CommonLesson = (props: ICommonLesson) => {
  const { classes, cx } = useStyles()
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1);
  const [lessonPage, setLessonPage] = useState<any>(null)
  const [isTheory, setTheoryCondition] = useState<boolean>(false)
  const [showWrongAnswer, setShowWrongAnswer] = useState<boolean>(false)
  const [isAnsweredCorrectly, setAnsweredCorrectly] = useState<boolean>(false)
  const [currentAnswers, setCurrentAnswers] = useState<string[][]>([])
  const [currentPage, setCurrentPage] = useState<number>(0)

  const checkAnswerCorrectness = async () => {
    const isCorrect = await checkAnswer(
      (lessonPage as Test).id,
      currentAnswers[page] ? currentAnswers[page] : [],
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
          newPage > page
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
      setPage(newPage)
      setAnsweredCorrectly(true)
    } else if (test) {
      setLessonPage(test)
      setTheoryCondition(false)
      setPage(newPage)
      setAnsweredCorrectly(false)
    }

    setCurrentPage(newPage)
    return true
  }

  const returnToCourses = () => {
    const theory = props.lesson?.theoryPages.find(
      (p) => p.pageNumber === page,
    )
    const test = props.lesson?.testPages.find((p) => p.pageNumber === page)

    if (theory) {
      navigate('./../');
    } else if (test) {
      checkAnswerCorrectness().then((isCorrect: boolean) => {
        if (isCorrect) navigate('./../');
        else setAnsweredCorrectly(false);
      })
    }
  }

  const onTestAnswerChanged = (testId: string, answerId: string, hasManyAnswers: boolean) => {
    const answers = [...currentAnswers]
    if (hasManyAnswers) {
      if (answers[page] && answers[page].find((i: string) => i === answerId)) {
        answers[page] = answers[page].filter((i: string) => i !== answerId);
      } else {
        if (answers[page]) {
          answers[page] = [...answers[page], answerId];
        } else {
          answers[page] = [answerId];
        }
      }
    } else {
      answers[page] = [answerId]
    }

    setCurrentAnswers(answers)
  }

  useEffect(() => {
    getLessonPage(page, true);
  }, [])

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
          pickedAnswers={currentAnswers[page] ? currentAnswers[page] : []}
        />
      )}
      <Row className={classes.paginator}>
        {page > 0 && !showWrongAnswer ? (
          <Paginate
            initialPage={page}
            maxPage={props.maxPage}
            onPageChange={getLessonPage}
            loading={props.loading || showWrongAnswer}
          />
        ) : (
          <></>
        )}
        {page === props.maxPage ? <Fab color="primary" className={classes.toCoursesButton} variant="extended" onClick={returnToCourses}>
          <ArrowLeft className={classes.toCoursesButtonArrow} />
          К урокам
        </Fab> : null}
      </Row>
    </Container>
  )
}

export default CommonLesson
