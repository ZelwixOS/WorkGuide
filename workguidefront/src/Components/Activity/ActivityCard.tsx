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
  onlyItem: {
    color: '#FFF',
    backgroundColor: '#7749F8'
  },
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
    marginTop: '1rem',
    textAlign: 'left',
    fontSize: '1rem',
  },
  additionalContent: {
    fontSize: '0.75rem',
    color: '#BABABA',
    '&.first': {
      color: '#FFF',
    }
  }
}))

const ActivityCard = (props: IActivityCard) => {
  const { classes, cx } = useStyles();

  const formatDate = (dateOfCreation: string): string => {
    const date = new Date(dateOfCreation);
    const today = new Date();
    const timeDiff = Math.abs(today.getTime() - date.getTime());
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  
    if (dayDiff >= 365) {
      const years = ['год', 'года', 'лет'];
      const yearDiff = Math.floor(dayDiff / 365);
      return `${yearDiff} ${getNoun(yearDiff, years)} назад`;
    }
    
    if (dayDiff >= 30) {
      const months = ['месяц', 'месяца', 'месяцев'];
      const monthDiff = Math.floor(dayDiff / 30);
      return `${monthDiff} ${getNoun(monthDiff, months)} назад`;
    }
    
    if (dayDiff === 1) {
      return 'Вчера';
    }
    
    if (dayDiff === 0) {
      return 'Сегодня';
    }
    
    const days = ['день', 'дня', 'дней'];
    return `${dayDiff} ${getNoun(dayDiff, days)} назад`;
  }

  const getNoun = (number: number, titles: string[]): string => {
    const cases = [2, 0, 1, 1, 1, 2];
    const index =
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[Math.min(number % 10, 5)];
    return titles[index];
  }

  return (
    <Card className={props.first && props.last ? classes.onlyItem : props.first ? classes.firstItem : props.last ? classes.lastItem : classes.item}>
      <Row>
        <Card.Body className="py-2 mx-2">
          <Card.Title className={classes.date}>{formatDate(props.activity.dateOfCreation)}</Card.Title>
          <Card.Title className={classes.title}>{props.activity.title}</Card.Title>
          <Card.Text className={classes.content}>{props.activity.content}</Card.Text>
          <Card.Text className={`${classes.additionalContent} ${props.first ? 'first': ''}`}>{props.activity.additContent}</Card.Text>
        </Card.Body>
      </Row>
    </Card>
  );
}

export default ActivityCard;