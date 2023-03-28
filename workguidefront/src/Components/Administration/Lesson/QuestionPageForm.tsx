import { Container } from 'react-bootstrap'
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  TextField,
} from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { useState } from 'react'
import Test from '../../../Types/Test'
import TestAnswer from '../../../Types/TestAnswer'

interface IQuestionPageForm {
  save: (
    hasManyAnswers: boolean,
    content: string,
    answers: TestAnswer[],
  ) => void
  question?: Test
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
  const [answers, setAnswers] = useState<TestAnswer[]>(
    (props.question?.answers as TestAnswer[]) ?? [],
  )
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
    if (!answers.find((y) => y.content == answer)) {
      setAnswers([...answers, { content: answer, isValid: false }])
    }
  }

  const handleRadioChanged = (
    event: React.SyntheticEvent<Element, Event>,
    checked: boolean,
  ) => {
    const newAnswers = [...answers]
    for (const answ of newAnswers) {
      answ.isValid = answ.content == (event.target as any).id
    }

    setAnswers(newAnswers)
  }

  const handleCheckBoxChanged = (
    event: React.SyntheticEvent<Element, Event>,
    checked: boolean,
  ) => {
    const newAnswers = [...answers]
    const id = newAnswers.findIndex(
      (t) => t.content == (event.target as any).id,
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
            hasManyAnswers ? (
              <FormControlLabel
                key={key}
                control={<Checkbox value={item.isValid} />}
                id={item.content}
                onChange={handleCheckBoxChanged}
                label={item.content}
              />
            ) : (
              <FormControlLabel
              key={key}
                control={
                  <Radio
                    id={item.content}
                    checked={item.isValid}
                    value={item.isValid}
                    onChange={handleRadioChanged}
                    name="radio-buttons"
                  />
                }
                label={item.content}
              />
            ),
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
