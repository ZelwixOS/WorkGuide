import React, { useEffect } from 'react'
import Button from '@mui/material/Button'
import { makeStyles } from 'tss-react/mui'
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Grid,
  Snackbar,
  TextField,
} from '@mui/material'
import { Alert } from '@mui/material'
import Course from '../../../Types/Course'
import { getLessonById, getSearchedCourses } from '../../../Request/GetRequests'
import { updateLesson } from '../../../Request/PutRequests'

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

interface IEditLesson {
  id: string
  refresher?: IRefresher
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EditLesson: React.FC<IEditLesson> = (props) => {
  const { classes, cx } = useStyles()

  const formatLesson = (
    orderNumber: number,
    name: string,
    isComplexTest: boolean,
    courseId: string,
  ) => {
    return { orderNumber, name, isComplexTest, courseId }
  }

  const [lessonData, setLessonData] = React.useState(
    formatLesson(0, '', false, ''),
  )

  const getCoursesData = async (isMounted: boolean, search = '', courseId: string | null = null) => {
    const res = await getSearchedCourses(1, 30, search)
    
    if (isMounted) {
      const id = courseId ?? lessonData.courseId
      const course = res.data.find(c => c.id == id)

      setAllCourses(res.data)
      if (course) {
        setPickedCourse(course)
      }
    }
  }

  const getLessonData = async (isMounted: boolean) =>
  {
    const res = await getLessonById(props.id)
    if (isMounted) {
      
      setLessonData(
        formatLesson(
          res.orderNumber,
          res.name,
          res.isComplexTest,
          res.courseId,
        ),
      )

      getCoursesData(isMounted, '', res.courseId)
    }
  }

  const refreshData = () => {
    let isMounted = true
    getLessonData(isMounted)

    return () => {
      isMounted = false
    }
  }

  useEffect(() => {
    refreshData()
  }, [])

  const [allCourses, setAllCourses] = React.useState<Course[]>([])
  const [pickedCourse, setPickedCourse] = React.useState<Course | null>(null)

  const [open, setOpen] = React.useState<boolean>(false)
  const [message, setMessage] = React.useState<string>('')

  const handleNumberChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLessonData(
      formatLesson(
        event.target.value as number,
        lessonData.name,
        lessonData.isComplexTest,
        lessonData.courseId,
      ),
    )
  }

  const handleNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLessonData(
      formatLesson(
        lessonData.orderNumber,
        event.target.value as string,
        lessonData.isComplexTest,
        lessonData.courseId,
      ),
    )
  }

  const handleIsComplexTestChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    setLessonData(
      formatLesson(
        lessonData.orderNumber,
        lessonData.name,
        checked,
        lessonData.courseId,
      ),
    )
  }

  const handleCourseIdChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: Course | null,
  ) => {
    if (value) {
      setLessonData(
        formatLesson(
          lessonData.orderNumber,
          lessonData.name,
          lessonData.isComplexTest,
          value.id,
        ),
      )

      setPickedCourse(value)
    }
  }

  const handleCourseSearchChanged = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    let isMounted = true;
    getCoursesData(isMounted, event.target.value as string)

    return () => {
      isMounted = false
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
    if (lessonData.orderNumber < 0) {
      setMessage('Введите корректный номер')
      setOpen(true)
    } else if (lessonData.name.length < 2) {
      setMessage('Введите корректное название')
      setOpen(true)
    } else {
      const res = await updateLesson(
        props.id,
        lessonData.orderNumber,
        lessonData.name,
        lessonData.isComplexTest,
        lessonData.courseId,
      )
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

      <Autocomplete
        id="lesson-course"
        options={allCourses}
        onChange={handleCourseIdChange}
        value={pickedCourse}
        className={classes.spaces}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={handleCourseSearchChanged}
            label="Курс"
            placeholder="Выберите курс"
          />
        )}
      />

      <TextField
        id="LessonName"
        className={classes.spaces}
        value={lessonData.name}
        onChange={handleNameChange}
        label="Название"
        variant="outlined"
      />

      <TextField
        id="LessonNumber"
        className={classes.spaces}
        value={lessonData.orderNumber}
        onChange={handleNumberChange}
        label="Номер"
        type="number"
        variant="outlined"
      />

      <FormControlLabel
        className={classes.spaces}
        control={
          <Checkbox
            checked={lessonData.isComplexTest}
            onChange={handleIsComplexTestChange}
          />
        }
        label="Проверочный тест"
      />

      <Grid container justifyContent="flex-end">
        <Button
          type="submit"
          className={classes.spaces}
          color="primary"
          variant="contained"
          onClick={onClick}
        >
          Обновить
        </Button>
      </Grid>
    </Grid>
  )
}

export default EditLesson
