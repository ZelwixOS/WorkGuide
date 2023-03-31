import { Card, Col, Row } from "react-bootstrap";
import { First } from "react-bootstrap/esm/PageItem";
import { makeStyles } from "../../theme";
import Activity from "../../Types/Activity";

interface IActivityCard {
  activity: Activity;
  first?: boolean;
  last?: boolean;
}

const useStyles = makeStyles()((theme) => ({
  firstItem: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    color: '#FFF',
    backgroundColor: '#7749F8'
  },
  lastItem: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  item: {
    borderRadius: 0,
    borderTop: 'none',
    borderBottom: 'none',
  },
  title: {
    textAlign: 'left',
    fontSize: '1.25rem',
  },
  date: {
    fontSize: '0.75rem',
    textAlign: 'right'
  },
  content: {
    textAlign: 'left',
    fontSize: '1rem',
  },
  action: {
    fontSize: '0.75rem',
    color: '#BABABA',
    '&.first': {
      color: '#FFF',
    }
  }
}))

const ActivityCard = (props: IActivityCard) => {
  const { classes, cx } = useStyles();

  return (
    <Card className={props.first ? classes.firstItem : props.last ? classes.lastItem : classes.item}>
      <Row>
        <Card.Body className="py-2">
          <Row>
            <Col>
              <Card.Title className={classes.title}>{props.activity.title}</Card.Title>
            </Col>
            <Col>
              <Card.Title className={classes.date + ' pt-1'}>{props.activity.date}</Card.Title>
            </Col>
          </Row>
          <Card.Text className={classes.content}>{props.activity.content}</Card.Text>
          <Card.Text className={`${classes.action} ${props.first ? 'first': ''}`}>{props.activity.action}</Card.Text>
        </Card.Body>
      </Row>
    </Card>
  );
}

export default ActivityCard;