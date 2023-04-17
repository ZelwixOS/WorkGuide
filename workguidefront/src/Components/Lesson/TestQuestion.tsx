import { ChangeEvent, HTMLAttributes } from 'react'
import { Badge, Card, Col, Form, Row } from 'react-bootstrap'
import { makeStyles } from '../../theme'
import Test from '../../Types/Test'

interface ITestQuestion extends HTMLAttributes<null> {
  test: Test
  onChanged: (testId: string, answerId: string, hasManyAnswers: boolean) => void
  wrongAnswer?: boolean
  pickedAnswers: string[]
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
    props.onChanged(props.test.id, event.currentTarget.id, false)
  }

  const onChangeMulti = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChanged(props.test.id, event.currentTarget.id, true)
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
        <Form>
          {props.test.answers.map((answer) => (
            props.test.isManyAnswer ? 
            <div className="d-flex justify-content-start">
              <Form.Check
                id={answer.id}
                key={answer.id}
                checked={props.pickedAnswers.find(i => i === answer.id) !== undefined}
                type="checkbox"
                name={props.test.id}
                onChange={onChangeMulti}
              />
              <label className="mx-2">{answer.content}</label>
            </div>
            :
            <div className="d-flex justify-content-start">
              <Form.Check
                id={answer.id}
                key={answer.id}
                checked={props.pickedAnswers.find(i => i === answer.id) !== undefined}
                type="radio"
                name={props.test.id}
                onChange={onChange}
              />
              <label className="mx-2">{answer.content}</label>
            </div>
          ))}
        </Form>
      </Card.Body>
    </Card>
  )
}

export default TestQuestion
