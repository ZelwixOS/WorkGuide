import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getLessonByNumber } from "../../Request/GetRequests";
import { makeStyles } from "../../theme";
import Lesson from "../../Types/Lesson";
import Loading from "../Common/Loading";
import Paginate from "../Common/Paginate";
import LessonCard from "../Lesson/LessonCard";
import TheoryPage from "../Theory/TheoryPage";

const useStyles = makeStyles()((theme) => ({
  paginator: {
    marginTop: 'auto'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
}))

const LessonPage = () => {
  const { classes, cx } = useStyles();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [lessonPage, setLessonPage] = useState<any>(null);
  const [isTheory, setTheoryCondition] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const params = useParams();
  let isMounted = true;

  const getLesson = async (isMounted: boolean, url: string, lessonNumber: string) => {
    const res = await getLessonByNumber(
      url,
      lessonNumber
    )
    if (isMounted) {
      setLesson(res);
      setLoading(false);
    }
  }

  const getLessonPage = (page: number) => {
    const theory = lesson?.theoryPages.find(p => p.pageNumber === page);
    if (theory) {
      setLessonPage(theory);
      setTheoryCondition(true);
      setPage(page);
    } else {
      setLessonPage('Test should be here');
      setTheoryCondition(false);
      setPage(page);
    }
  }

  useEffect(() => {
    getLesson(isMounted, params?.url as string, params?.lessonNumber as string);

    return () => {
      isMounted = false
    }
  }, []);

  useEffect(() => {
    if(lesson) {
      setMaxPage(Math.max(lesson.testPages.length + lesson.theoryPages.length, 1));
      getLessonPage(1);
    }

    return () => {
      isMounted = false
    }
  }, [lesson]);

  return (
    <Container className={classes.container}>
      {isLoading || !lesson ? <Loading /> : <LessonCard lesson={lesson} />}
      {isLoading || !lesson || !lessonPage ? null : (isTheory ? <TheoryPage theory={lessonPage} /> : <p>test</p>)}
      <Row className={classes.paginator}>
        <Paginate initialPage={page} maxPage={maxPage} onPageChange={getLessonPage} loading={isLoading}/>
      </Row>
    </Container>
  );
}

export default LessonPage;