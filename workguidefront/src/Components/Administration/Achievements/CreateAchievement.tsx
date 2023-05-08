import React from 'react'
import Button from '@mui/material/Button'
import { makeStyles } from 'tss-react/mui'
import {
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
} from '@mui/material'
import { Alert } from '@mui/material'
import { createAchievement } from '../../../Request/PostRequests'
import Course from '../../../Types/Course'

interface IRefresher {
  refresh: () => void
}

const useStyles = makeStyles()((theme) => ({
  spaces: {
    margin: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
  pic: {
    height: 243,
    width: 432,
  },
}))

interface ICreateAchievement {
  refresher?: IRefresher
  courses: Course[]
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateAchievement: React.FC<ICreateAchievement> = (props) => {
  const { classes, cx } = useStyles()

  const formatAchievement = (
    name: string,
    picFile: string,
    description: string,
    type: number,
    testScore: number,
    courseId: string,
    count: number | null,
  ) => {
    return { name, picFile, description, type, testScore, courseId, count }
  }

  const commonCourseId = 'ccid'
  const [achievementData, setAchievementData] = React.useState(
    formatAchievement('', '', '', 0, 0, commonCourseId, 0),
  )

  const [open, setOpen] = React.useState<boolean>(false)
  const [message, setMessage] = React.useState<string>('')
  const [pic, setPic] = React.useState<File>()
  const picPlaceholder = '/achievementPics/NotSet.png'

  const handleNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAchievementData(
      formatAchievement(
        event.target.value as string,
        achievementData.picFile,
        achievementData.description,
        achievementData.type,
        achievementData.testScore,
        achievementData.courseId,
        achievementData.count,
      ),
    )
  }

  const handleDescriptionChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setAchievementData(
      formatAchievement(
        achievementData.name,
        achievementData.picFile,
        event.target.value as string,
        achievementData.type,
        achievementData.testScore,
        achievementData.courseId,
        achievementData.count,
      ),
    )
  }

  const handlePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      setPic(file)
      setAchievementData(
        formatAchievement(
          achievementData.name,
          URL.createObjectURL(file),
          achievementData.description,
          achievementData.type,
          achievementData.testScore,
          achievementData.courseId,
          achievementData.count,
        ),
      )
    }
  }

  const handleCourseChange = (event: SelectChangeEvent) => {
    const id = event.target.value as string
    setAchievementData(
      formatAchievement(
        achievementData.name,
        achievementData.picFile,
        achievementData.description,
        achievementData.type,
        achievementData.testScore,
        id,
        achievementData.count,
      ),
    )
  }

  const handleTypeChange = (event: SelectChangeEvent) => {
    const type = event.target.value as string
    setAchievementData(
      formatAchievement(
        achievementData.name,
        achievementData.picFile,
        achievementData.description,
        +type,
        achievementData.testScore,
        achievementData.courseId,
        achievementData.count,
      ),
    )
  }

  const handleScoreChange = (event: SelectChangeEvent) => {
    const score = event.target.value as string
    setAchievementData(
      formatAchievement(
        achievementData.name,
        achievementData.picFile,
        achievementData.description,
        achievementData.type,
        +score,
        achievementData.courseId,
        achievementData.count,
      ),
    )
  }
  
  const handleCountChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    const val = +(event.target.value as string)
    if (val >= 0) {
      setAchievementData(
        formatAchievement(
          achievementData.name,
          achievementData.picFile,
          achievementData.description,
          achievementData.type,
          achievementData.testScore,
          achievementData.courseId,
          val,
        ),
      )
    }
  }

  const handleClose = (
    event?: Event | React.SyntheticEvent<any, Event>,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const onClick = async () => {
    if (achievementData.name.length < 2) {
      setMessage('Введите корректное название')
      setOpen(true)
    } else if (achievementData.description.length < 5) {
      setMessage('Введите корректное описание')
      setOpen(true)
    } else {
      const res = await createAchievement({
        name: achievementData.name,
        picFile: pic ?? null,
        description: achievementData.description,
        type: achievementData.type,
        testScore: achievementData.testScore,
        courseId:
          achievementData.courseId !== commonCourseId
            ? achievementData.courseId
            : null,
        count: achievementData.count,
      })
      if (res && props.refresher) {
        props.refresher.refresh()
        props.setOpen(false)
      } else {
        setMessage('Не удалось выполнить запрос')
        setOpen(true)
      }
    }
  }

  return (
    <Grid container direction="column" justifyContent="center">
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning">
          {message}
        </Alert>
      </Snackbar>
      <FormControl fullWidth className={classes.spaces}>
        <InputLabel id="course-select-label">
          Раздел
        </InputLabel>
        <Select
          labelId="course-select-label"
          id="course-select"
          value={achievementData.courseId}
          label="Раздел"
          onChange={handleCourseChange}
        >
          <MenuItem value={commonCourseId}>Общие</MenuItem>
          {props.courses.map((c) => (
            <MenuItem key={c.id} value={c.id}>{`${c.name} ${c.url}`}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        id="AchievementName"
        className={classes.spaces}
        value={achievementData.name}
        onChange={handleNameChange}
        label="Название"
        variant="outlined"
      />
      <TextField
        id="AchievementDescription"
        className={classes.spaces}
        value={achievementData.description}
        onChange={handleDescriptionChange}
        label="Описание"
        variant="outlined"
      />
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={handlePicChange}
      />
      <Card className={classes.spaces} variant="outlined">
        <Grid container justifyContent="center">
          <CardMedia
            className={classes.pic}
            image={pic ? achievementData.picFile : picPlaceholder}
            title="Выбранное изображение"
          />
        </Grid>
        <CardContent>
          <Grid container justifyContent="center">
            <label htmlFor="contained-button-file" className={classes.spaces}>
              <Button variant="contained" color="primary" component="span">
                Выбрать изображение
              </Button>
            </label>
          </Grid>
        </CardContent>
      </Card>

      <FormControl fullWidth className={classes.spaces}>
        <InputLabel id="ach-type-select-label">
          Тип достижения
        </InputLabel>
        <Select
          labelId="ach-type-select-label"
          id="ach-type-select"
          value={achievementData.type.toString()}
          label="Тип достижения"
          onChange={handleTypeChange}
        >
          <MenuItem value="0">Завершение курса</MenuItem>
          <MenuItem value="1">Завершение курсов</MenuItem>
          <MenuItem value="2">Завершение тестов</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth className={classes.spaces}>
        <InputLabel id="ach-ts-select-label">
          Оценка
        </InputLabel>
        <Select
          labelId="ach-ts-select-label"
          id="ach-ts-select"
          value={achievementData.testScore.toString()}
          label="Оценка"
          onChange={handleScoreChange}
        >
          <MenuItem value="0">Любая</MenuItem>
          <MenuItem value="1">Без правильных ответов</MenuItem>
          <MenuItem value="2">Плохая и выше</MenuItem>
          <MenuItem value="3">Средняя и выше</MenuItem>
          <MenuItem value="4">Хорошая</MenuItem>
          <MenuItem value="5">Все ответы правильные</MenuItem>
        </Select>
      </FormControl>

      {achievementData.type > 0 && (
        <TextField
          id="AchievementCount"
          type={"number"}
          className={classes.spaces}
          value={achievementData.count ?? ''}
          onChange={handleCountChange}
          label="Количество"
          variant="outlined"
        />
      )}

      <Grid container justifyContent="flex-end">
        <Button
          type="submit"
          className={classes.spaces}
          color="primary"
          variant="contained"
          onClick={onClick}
        >
          Создать
        </Button>
      </Grid>
    </Grid>
  )
}

export default CreateAchievement
