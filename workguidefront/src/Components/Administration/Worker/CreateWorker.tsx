import React, { useEffect } from 'react'
import Button from '@mui/material/Button'
import { makeStyles } from 'tss-react/mui'
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Card,
  CardContent,
  CardMedia,
  Grid,
  MenuItem,
  Snackbar,
  TextField,
} from '@mui/material'
import { Alert } from '@mui/material'
import { registerWorker } from '../../../Request/PostRequests'
import Position from '../../../Types/Position'
import { getAllPositions, getAllWorkers } from '../../../Request/GetRequests'
import WorkerRegistration from '../../../Types/WorkerRegistration'
import UserInfo from '../../../Types/UserInfo'

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

interface ICreateWorker {
  refresher?: IRefresher
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateWorker: React.FC<ICreateWorker> = (props) => {
  const { classes, cx } = useStyles()

  const formatWorker = (
    login: string,
    password: string,
    email: string,
    phoneNumber: string,
    firstName: string,
    secondName: string,
    positionId: string,
    avatar: File | null,
    mentorId: string | null,
  ) => {
    return {
      login,
      password,
      email,
      phoneNumber,
      firstName,
      secondName,
      positionId,
      avatar,
      mentorId,
    } as WorkerRegistration
  }

  const [workerData, setWorkerData] = React.useState(
    formatWorker('', '', '', '', '', '', '', null, null),
  )

  const getData = async (isMounted: boolean) => {
    const res = await getAllPositions()
    const workers = await getAllWorkers()
    if (isMounted) {
      setAllPositions(res)
      setAllWorkers(workers)
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

  const [allPositions, setAllPositions] = React.useState<Position[]>([])
  const [allWorkers, setAllWorkers] = React.useState<UserInfo[]>([])
  const [picUrl, setPicUrl] = React.useState('')
  const picPlaceholder = '/avatars/NotSet.png'

  const [open, setOpen] = React.useState<boolean>(false)
  const [message, setMessage] = React.useState<string>('')

  const handleLoginChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setWorkerData(
      formatWorker(
        event.target.value as string,
        workerData.password,
        workerData.email,
        workerData.phoneNumber,
        workerData.firstName,
        workerData.secondName,
        workerData.positionId,
        workerData.avatar,
        workerData.mentorId,
      ),
    )
  }

  const handlePasswordChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setWorkerData(
      formatWorker(
        workerData.login,
        event.target.value as string,
        workerData.email,
        workerData.phoneNumber,
        workerData.firstName,
        workerData.secondName,
        workerData.positionId,
        workerData.avatar,
        workerData.mentorId,
      ),
    )
  }

  const handleEmailChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setWorkerData(
      formatWorker(
        workerData.login,
        workerData.password,
        event.target.value as string,
        workerData.phoneNumber,
        workerData.firstName,
        workerData.secondName,
        workerData.positionId,
        workerData.avatar,
        workerData.mentorId,
      ),
    )
  }

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setWorkerData(
      formatWorker(
        workerData.login,
        workerData.password,
        workerData.email,
        event.target.value as string,
        workerData.firstName,
        workerData.secondName,
        workerData.positionId,
        workerData.avatar,
        workerData.mentorId,
      ),
    )
  }

  const handleFirstNameChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setWorkerData(
      formatWorker(
        workerData.login,
        workerData.password,
        workerData.email,
        workerData.phoneNumber,
        event.target.value as string,
        workerData.secondName,
        workerData.positionId,
        workerData.avatar,
        workerData.mentorId,
      ),
    )
  }

  const handleSecondNameChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setWorkerData(
      formatWorker(
        workerData.login,
        workerData.password,
        workerData.email,
        workerData.phoneNumber,
        workerData.firstName,
        event.target.value as string,
        workerData.positionId,
        workerData.avatar,
        workerData.mentorId,
      ),
    )
  }

  const handlePositionIdChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    if (event.target.value as string) {
      setWorkerData(
        formatWorker(
          workerData.login,
          workerData.password,
          workerData.email,
          workerData.phoneNumber,
          workerData.firstName,
          workerData.secondName,
          event.target.value as string,
          workerData.avatar,
          workerData.mentorId,
        ),
      )
    }
  }

  const handlePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      setWorkerData(
        formatWorker(
          workerData.login,
          workerData.password,
          workerData.email,
          workerData.phoneNumber,
          workerData.firstName,
          workerData.secondName,
          workerData.positionId,
          file,
          workerData.mentorId,
        ),
      )

      setPicUrl(URL.createObjectURL(file))
    }
  }

  const handleMentorIdChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    if (event.target.value as string) {
      setWorkerData(
        formatWorker(
          workerData.login,
          workerData.password,
          workerData.email,
          workerData.phoneNumber,
          workerData.firstName,
          workerData.secondName,
          workerData.positionId,
          workerData.avatar,
          event.target.value as string,
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
    if (workerData.login.length < 5) {
      setMessage('Введите корректный логин')
      setOpen(true)
    } else if (workerData.password.length < 6) {
      setMessage('Введите корректный пароль')
      setOpen(true)
    } else if (workerData.email.length < 6) {
      setMessage('Введите корректный e-mail')
      setOpen(true)
    } else {
      const res = await registerWorker(workerData)
      if (res && props.refresher) {
        props.refresher.refresh()
        props.setOpen(false)
      } else {
        setMessage(
          'Не удалось выполнить запрос. Проверьте корректность данных.',
        )
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
        id="WorkerLogin"
        className={classes.spaces}
        value={workerData.login}
        onChange={handleLoginChange}
        label="Логин"
        variant="outlined"
      />

      <TextField
        id="WorkerPassword"
        className={classes.spaces}
        value={workerData.password}
        onChange={handlePasswordChange}
        label="Пароль"
        type="password"
        variant="outlined"
      />

      <TextField
        id="WorkerFirstName"
        className={classes.spaces}
        value={workerData.firstName}
        onChange={handleFirstNameChange}
        label="Имя"
        variant="outlined"
      />

      <TextField
        id="WorkerSecondName"
        className={classes.spaces}
        value={workerData.secondName}
        onChange={handleSecondNameChange}
        label="Фамилия"
        variant="outlined"
      />

      <TextField
        id="WorkerEmail"
        className={classes.spaces}
        value={workerData.email}
        onChange={handleEmailChange}
        label="e-mail"
        type="email"
        variant="outlined"
      />

      <TextField
        id="WorkerPhoneNumber"
        className={classes.spaces}
        value={workerData.phoneNumber}
        onChange={handlePhoneNumberChange}
        label="Телефон"
        type="tel"
        variant="outlined"
      />

      <TextField
        id="WorkerPosition"
        select
        label="Должность"
        className={classes.spaces}
        value={workerData.positionId}
        onChange={handlePositionIdChange}
      >
        {allPositions.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.title}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id="WorkerMentor"
        select
        label="Ментор"
        className={classes.spaces}
        value={workerData.mentorId}
        onChange={handleMentorIdChange}
      >
        {allWorkers.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {`${option.firstName} ${option.secondName} (${option.userName})`}
          </MenuItem>
        ))}
      </TextField>

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
            image={workerData.avatar ? picUrl : picPlaceholder}
            title="Аватар"
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
          Создать
        </Button>
      </Grid>
    </Grid>
  )
}

export default CreateWorker
