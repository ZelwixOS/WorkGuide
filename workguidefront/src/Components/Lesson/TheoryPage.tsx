import { Card, Carousel, Col, Container, Row } from "react-bootstrap";
import CustomFile from "../../Types/CustomFile";
import Theory from "../../Types/Theory";
import { makeStyles } from '../../theme'
import parse from 'html-react-parser';
import { Link, useNavigate } from "react-router-dom";

interface ITheoryPage {
  theory: Theory;
}

const useStyles = makeStyles()((theme) => ({
  carousel: {
    height: '250px',
    margin: 'auto'
  },
  image: {
    height: '250px'
  },
  link: {
    textDecoration: 'none'
  },
  card: {
    color: 'black',
    width: '200px',
    height: '200px',
    boxShadow: '0px 0px 5px gray',
  },
  cardheader: {
    textDecoration: 'none',
    textOverflow: 'ellipsis',
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: '170px',
    height: '20px',
  },
  cardBody: {
    fontSize: '30px',
    fontWeight: 'bold'
  }
}))

const TheoryPage = (props: ITheoryPage) => {
  const { classes, cx } = useStyles()
  const navigate = useNavigate();

  const fileCardList = (files: CustomFile[], index: number) => {
    let temp = [];
    for(let i = index; i < index + 3; i++) {
      if (i < files.length) {
        temp.push(files[i]);
      }
    }

    return temp.map((file, i) => <Col key={index + i} className="d-flex align-items-center justify-content-center">
      <Link className={classes.link} to={`/lessonsContent/${file.url}`} target="_blank" download>
        <Card className={classes.card} >
          <Card.Header><span className={classes.cardheader}>{file.name}</span></Card.Header>
          <Card.Body className="d-flex align-items-center justify-content-center">
            <Card.Text className={classes.cardBody}>{file.format}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>)
  }

  return <Container>
    <Row>{parse(props.theory.content)}</Row>
    {props.theory.files.length > 0 ? <Row><Carousel variant="dark" className={classes.carousel}>
      { props.theory.files.map((_: CustomFile, i: number) =>
        {return i % 3 === 0 ? <Carousel.Item key={'ci' + i.toString()}>
          <img
          className={"d-block w-100 " + classes.carousel}
          src="/lessonFileBackground.png"
          alt="First slide"
          />
          <Carousel.Caption>
            <Row>{fileCardList(props.theory.files, i)}</Row>
          </Carousel.Caption>
        </Carousel.Item> : null})
      }</Carousel></Row> : null}
  </Container>;
}

export default TheoryPage;