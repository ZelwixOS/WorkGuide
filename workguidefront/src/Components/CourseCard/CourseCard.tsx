import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "../../theme";
import Course from "../../Types/Course";

interface ICourseCard {
  course: Course;
  useAnimation?: boolean;
}

const useStyles = makeStyles()((theme) => ({
  animated: {
    transition: 'backgroundColor 0.5s',
    "&:hover": {
      "backgroundColor": 'lightgray'
    }
  },
  cardImage: {
    width: '100%',
    maxHeight: '100%',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    borderRadius: '0.375rem'
  },
  changeableFont: {
    fontSize: 'calc(0.5rem + 1vw)'
  }
}))

const CourseCard = (props: ICourseCard) => {
  const { classes, cx } = useStyles();
  const navigate = useNavigate();
  const onCardClick = () => {
    navigate(`${props.course.url}`);
  }

  return (
    <Card className={`shadow mb-1 ${props.useAnimation ? classes.animated : null}`} onClick={() => onCardClick()}>
      <Row>
        <Col md={2}>
          <Card.Img className={classes.cardImage} variant="top" src={'/coursePics/' + props.course?.picUrl} /></Col>
        <Col>
          <Card.Body>
            <Card.Title className={classes.changeableFont}>{props.course?.name}</Card.Title>
            <Card.Text className={classes.changeableFont}>
              {props.course?.description}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default CourseCard;