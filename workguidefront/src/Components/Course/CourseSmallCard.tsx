import { Card, Col, Row } from "react-bootstrap";
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
    }
  },
  cardImage: {
    width: '40px',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    borderRadius: '0.375rem',
    marginRight: '1rem'
  },
  title: {
    border: 'none',
    borderBottom: '1px solid #BABABA',
    paddingBottom: '0.5rem'
  },
  body: {
    color: '#5227CC'
  },
  changeableFont: {
    textAlign: 'left',
    fontSize: '1rem'
  }
}))

const CourseSmallCard = (props: ICourseCard) => {
  const { classes, cx } = useStyles();
  const navigate = useNavigate();
  const onCardClick = () => {
    if (props.listItem) {
      navigate(`/courses/${props.course.url}`);
    }
  }

  return (
    <Card className={classes.listItem} onClick={() => onCardClick()}>
      <Row >
        <Card.Body className="py-2">
          <Card.Title className={classes.changeableFont + ' ' + classes.title}><Card.Img className={classes.cardImage} variant="top" src={'/coursePics/' + props.course?.picUrl} />{props.course?.name}</Card.Title>
          <Card.Text className={classes.changeableFont + ' ' + classes.body}>{props.course?.description}</Card.Text>
        </Card.Body>
      </Row>
    </Card>
  );
}

export default CourseSmallCard;