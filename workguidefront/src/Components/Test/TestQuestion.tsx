import { ChangeEvent, HTMLAttributes } from 'react'
import { Badge, Card, Col, Form, Row } from 'react-bootstrap'
import { makeStyles } from '../../theme'
import Test from '../../Types/Test'

interface ITestQuestion extends HTMLAttributes<null> {
  test: Test
  onChanged: (testId: string, answerId: string) => void
  wrongAnswer?: boolean
}

const useStyles = makeStyles()((theme) => ({
  primaryFont: {
    marginLeft: '0.5rem',
    textAlign: 'left',
    fontSize: 'calc(0.5rem + 1vw)',
  },
  redBackground: {
    background: '#F88',
  },
  question: {
    display: 'flex',
    justifyContent: 'left',
  },
}))

const TestQuestion = (props: ITestQuestion) => {
  const { classes, cx } = useStyles()
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChanged(props.test.id, event.currentTarget.id)
  }
  
  return (
    <Card
      className={`shadow mb-1 d-flex-row align-items-left ${
        props.wrongAnswer ? classes.redBackground : null
      } ${props.className}`}
    >
      <Card.Header>
        <Row>
          <Col md={1}>
            <Badge pill className={`${classes.primaryFont} mt-1`} bg="success">
              ?
            </Badge>
          </Col>
          <Col>
            <Card.Title className={`${classes.primaryFont} mt-2`}>
              {props.test.content}
            </Card.Title>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Form className="d-flex flex-column">
          {props.test.answers.map((answer) => (
            <Form.Check
              id={answer.id}
              key={answer.id}
              type="radio"
              name={props.test.id}
              label={answer.content}
              className="d-flex justify-content-start"
              onChange={onChange}
            />
          ))}
        </Form>
      </Card.Body>
    </Card>
  )
}

export default TestQuestion
