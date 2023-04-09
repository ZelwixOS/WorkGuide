import { Card, Col, ProgressBar, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "../../theme";
import Course from "../../Types/Course";

interface ICourseCard {
  course: Course;
  listItem?: boolean;
}

const useStyles = makeStyles()((theme) => ({
  listItem: {
    transition: 'background-color 0.5s',
    "&:hover": {
      "backgroundColor": 'lightgray'
    },
    "&.success": {
      'border': '2px solid rgb(25,135,84) !important'
    },
    "&.danger": {
      'border': '2px solid rgb(220,53,69) !important'
    },
    "&.warning": {
      'border': '2px solid rgb(255,193,7) !important'
    }
  },
  title: {
    border: 'none'
  },
  cardImage: {
    height: '175px',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    borderRadius: '0.375rem'
  },
  changeableFont: {
    textAlign: 'left',
    fontSize: 'calc(0.5rem + 1vw)'
  }
}))

const CourseCard = (props: ICourseCard) => {
  const { classes, cx } = useStyles();
  const navigate = useNavigate();
  const onCardClick = () => {
    if(props.listItem) {
      navigate(`${props.course.url}`);
    }
  }
  const getProgressColor = (value: number) => {
    if (value === 0) 
      return 'danger';

    if(value === 100)
      return 'success';

    return 'warning';
  }

  return (
    <Card
      className={`${props.listItem ? ('shadow ' + classes.listItem + ' mb-1 ' + getProgressColor(props.course.totalTests === 0 ? 100 : props.course.completedTests / props.course.totalTests * 100)) : (classes.title + ' mb-4 mt-1')}`} onClick={() => onCardClick()}>
      <Row>
        <Col md='auto'>
          <Card.Img className={classes.cardImage} variant="top" src={'/coursePics/' + props.course?.picUrl} /></Col>
        <Col>
          <Card.Body>
            <Card.Title className={classes.changeableFont}>{props.course?.name}</Card.Title>
            <Card.Text className={classes.changeableFont}>{props.course?.description}</Card.Text>
            {props.listItem ? <ProgressBar
              variant={getProgressColor(props.course.totalTests === 0 ? 100 : props.course.completedTests / props.course.totalTests * 100)}
              now={100} 
              label={`${props.course.completedTests} / ${props.course.totalTests}`} /> : null}
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default CourseCard;