import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getLessonByNumber } from '../../Request/GetRequests'
import { makeStyles } from '../../theme'
import Lesson from '../../Types/Lesson'
import Loading from '../Common/Loading'
import CommonLesson from './CommonLesson'
import TestLesson from './TestLesson'

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
  const [maxPage, setMaxPage] = useState<number>(1)
  const [isLoading, setLoading] = useState<boolean>(true)
  const params = useParams()

  let isMounted = true
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
    }

    return () => {
      isMounted = false
    }
  }, [lesson])

  return (
    <>
      {isLoading ? <Loading /> : 
      lesson != null &&
      lesson.theoryPages.length == 0 &&
      lesson.testPages.length > 0 ? (
        <TestLesson loading={isLoading} lesson={lesson} />
      ) : (
        <CommonLesson
          loading={isLoading}
          lesson={lesson}
          maxPage={maxPage}
        />
      )}
    </>
  )
}

export default LessonPage
