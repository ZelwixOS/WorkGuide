import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getLessonByNumber } from '../../Request/GetRequests'
import { makeStyles } from '../../theme'
import Lesson from '../../Types/Lesson'
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
  const [page, setPage] = useState<number>(0)
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
      setPage(1)
    }

    return () => {
      isMounted = false
    }
  }, [lesson])

  return (
    <>
      {lesson != null &&
      lesson.theoryPages.length == 0 &&
      lesson.testPages.length > 0 ? (
        <TestLesson loading={isLoading} lesson={lesson} />
      ) : (
        <CommonLesson
          loading={isLoading}
          lesson={lesson}
          maxPage={maxPage}
          setPage={setPage}
          page={page}
        />
      )}
    </>
  )
}

export default LessonPage
