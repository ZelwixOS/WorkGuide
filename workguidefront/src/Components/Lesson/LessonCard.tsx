import { Badge, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "../../theme";
import Lesson from "../../Types/Lesson";

interface ILessonCard {
  lesson: Lesson;
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
  primaryFont: {
    fontSize: 'calc(0.5rem + 1vw)'
  },
  secondaryFont: {
    fontSize: 'calc(0.5rem + 1vw)',
    color: 'white',
    fontWeight: 'bold'
  },
  numberContainer: {
    backgroundColor: 'lightgray',
    textAlign: 'center',
    borderRadius: '0.375rem'
  },
  completionContainer: {
    borderRadius: '0.375rem',
    position: 'absolute',
    right: '0',
    width: '5px',
    height: '100%'
  },
  complete: {
    backgroundColor: 'green'
  },
  incomplete: {
    backgroundColor: 'red'
  }
}))

const LessonCard = (props: ILessonCard) => {
  const { classes, cx } = useStyles();
  const navigate = useNavigate();
  const onLessonClick = () => {
    navigate(`/lesson/url/${props.lesson.courseUrl}/${props.lesson.orderNumber}`);
  }

  return (
    <Card className={`shadow mb-1 ${props.useAnimation ? classes.animated : null}`} onClick={() => onLessonClick()}>
      <Row>
        <Col md={1}>
          <div className={`${classes.secondaryFont} ${classes.numberContainer}`}>
            {props.lesson.orderNumber}
          </div>
        </Col>
        <Col md={1}></Col>
        <Col>
          <Card.Title className={classes.primaryFont}>{props.lesson?.name}</Card.Title>
        </Col>
      </Row>
        <div className={`${classes.completionContainer} ${props.lesson.orderNumber % 2 == 0 ? classes.complete : classes.incomplete}`}></div>
    </Card>
  );
}

export default LessonCard;