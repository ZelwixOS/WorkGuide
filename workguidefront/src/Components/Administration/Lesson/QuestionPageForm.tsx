import { Col, Container, Row } from 'react-bootstrap'
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  TextField,
} from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { useEffect, useState } from 'react'
import Test from '../../../Types/Test'
import TestAnswer from '../../../Types/TestAnswer'
import { X } from 'react-bootstrap-icons'
import TestValidAnswers from '../../../Types/TestValidAnswers'

interface IQuestionPageForm {
  save: (
    hasManyAnswers: boolean,
    content: string,
    answers: TestAnswer[],
  ) => void
  question?: Test | null,
  answers?: TestAnswer[]
}

const useStyles = makeStyles()((theme) => ({
  spaces: {
    marginTop: theme.spacing(2),
  },
}))

const QuestionPageForm: React.FC<IQuestionPageForm> = (props) => {

  const { classes, cx } = useStyles()

  const onSave = async () => {
    props.save(hasManyAnswers, content, answers)
  }

  const [hasManyAnswers, setHasManyAnswers] = useState(
    props.question?.isManyAnswer ?? false,
  )
  const [content, setContent] = useState(props.question?.content ?? '')
  const [answers, setAnswers] = useState<TestAnswer[]>(props.answers ?? [])
  const [answer, setAnswer] = useState('')

  const handleContentChanged = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value as string)
  }

  const handleHasManyAnswersChanged = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    checked: boolean,
  ) => {
    setHasManyAnswers(checked)

    if (answers.length > 0) {
      const newAnswers = [...answers]
      for (const answ of newAnswers) {
        answ.isValid = false
      }

      setAnswers(newAnswers)
    }
  }

  const handleAnswerChanged = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setAnswer(event.target.value as string)
  }

  const handleAnswerClick = () => {
    if (!answers.find((y) => y.content === answer)) {
      setAnswers([...answers, { content: answer, isValid: false }])
    }
  }

  const handleDeleteAnswer = (content: string) => {
    const newAnswers = answers.filter(a => a.content !== content);

    setAnswers(newAnswers)
  }

  const handleRadioChanged = (
    event: React.SyntheticEvent<Element, Event>,
    checked: boolean,
  ) => {
    const newAnswers = [...answers]
    for (const answ of newAnswers) {
      answ.isValid = answ.content === (event.target as any).id
    }

    setAnswers(newAnswers)
  }

  const handleCheckBoxChanged = (
    content: string,
    checked: boolean,
  ) => {
    const newAnswers = [...answers]
    const id = newAnswers.findIndex(
      (t) => t.content === content,
    )
    newAnswers[id].isValid = checked
    setAnswers(newAnswers)
  }

  return (
    <>
      <Container>
        <FormControlLabel
          className={classes.spaces}
          control={
            <Checkbox
              checked={hasManyAnswers}
              value={hasManyAnswers}
              onChange={handleHasManyAnswersChanged}
            />
          }
          label="Множественный выбор"
        />
        <TextField
          fullWidth
          className={classes.spaces}
          id="question-content"
          label="Вопрос"
          variant="outlined"
          value={content}
          onChange={handleContentChanged}
        />
        <Grid direction="column" className={classes.spaces} container justifyContent="center">
          {answers.map((item, key) =>
            <Row>
              <Col className='d-flex justify-content-start align-items-center'>
                {hasManyAnswers ? (
                  <FormControlLabel
                    checked={item.isValid || false}
                    key={key}
                    control={<Checkbox value={item.isValid || false} />}
                    id={item.content}
                    onChange={(e, checked) => handleCheckBoxChanged(item.content, checked)}
                    label={item.content}
                  />
                ) : (
                  <FormControlLabel
                    key={key}
                    control={
                      <Radio
                        id={item.content}
                        checked={item.isValid || false}
                        value={item.isValid || false}
                        onChange={handleRadioChanged}
                        name="radio-buttons"
                      />
                    }
                    label={item.content}
                  />
                )}
              </Col>
              <Col key={'b-' + key} md='auto' className='d-flex align-items-center'>
                <X size={32} onClick={() => handleDeleteAnswer(item.content)}/>
              </Col>
            </Row>
          )}
        </Grid>
        <TextField
          fullWidth
          className={classes.spaces}
          id="question-content"
          label="Ответ"
          variant="outlined"
          value={answer}
          onChange={handleAnswerChanged}
        />
        <Button className={classes.spaces} variant="contained" onClick={handleAnswerClick}>
          Добавить ответ
        </Button>
      </Container>
      <Container className={classes.spaces}>
        <div style={{ borderTop: '1px solid lightgray', width: '100%' }}></div>
        <Button style={{ width: '100%' }} onClick={onSave}>
          Сохранить
        </Button>
      </Container>
    </>
  )
}
export default QuestionPageForm
