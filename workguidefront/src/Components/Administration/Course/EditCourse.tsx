import React, { useEffect } from 'react'
import Button from '@mui/material/Button'
import { makeStyles } from 'tss-react/mui'
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Snackbar,
  TextField,
} from '@mui/material'
import { Alert } from '@mui/material'
import { getCourseById } from '../../../Request/GetRequests'
import { updateCourse } from '../../../Request/PutRequests'

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

interface IEditCourse {
  id: string
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  refresher?: IRefresher
}

const EditCourse: React.FC<IEditCourse> = (props) => {
  const { classes, cx } = useStyles()

  const formatCourse = (url: string, name: string, description: string) => {
    return {
      url: url,
      name: name,
      description: description,
    }
  }

  const getData = async (isMounted: boolean) => {
    const res = await getCourseById(props.id)
    if (isMounted) {
      setCourseData(formatCourse(res.url, res.name, res.description))

      setPicUrl(`/coursePics/${res.picUrl}`)
    }
  }

  const refreshData = () => {
    let isMounted = true
    getData(isMounted)

    return () => {
      isMounted = false
    }
  }

  useEffect(() => {
    refreshData()
  }, [])

  const [courseData, setCourseData] = React.useState(formatCourse('', '', ''))

  const [open, setOpen] = React.useState<boolean>(false)
  const [message, setMessage] = React.useState<string>('')
  const [pic, setPic] = React.useState<File>()
  const [picUrl, setPicUrl] = React.useState('')

  const handleUrlChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCourseData(
      formatCourse(
        event.target.value as string,
        courseData.name,
        courseData.description,
      ),
    )
  }

  const handleNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCourseData(
      formatCourse(
        courseData.url,
        event.target.value as string,
        courseData.description,
      ),
    )
  }

  const handleDescriptionChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setCourseData(
      formatCourse(
        courseData.url,
        courseData.name,
        event.target.value as string,
      ),
    )
  }

  const handlePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      setPic(file)
      setPicUrl(URL.createObjectURL(file))
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
    if (courseData.url.length < 3) {
      setMessage('Введите корректный url')
      setOpen(true)
    } else if (courseData.name.length < 2) {
      setMessage('Введите корректное название')
      setOpen(true)
    } else if (courseData.description.length < 5) {
      setMessage('Введите корректное описание')
      setOpen(true)
    } else {
      const res = await updateCourse(
        props.id,
        courseData.url,
        courseData.name,
        courseData.description,
        pic ?? null,
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
      <TextField
        id="CourseUrl"
        className={classes.spaces}
        value={courseData.url}
        onChange={handleUrlChange}
        label="URL"
        variant="outlined"
      />
      <TextField
        id="CourseName"
        className={classes.spaces}
        value={courseData.name}
        onChange={handleNameChange}
        label="Название"
        variant="outlined"
      />
      <TextField
        id="CourseDescription"
        className={classes.spaces}
        value={courseData.description}
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
            image={picUrl}
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

export default EditCourse
