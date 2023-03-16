import React from 'react'
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
import { createPosition } from '../../../Request/PostRequests'

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

interface ICreatePosition {
  refresher?: IRefresher
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreatePosition: React.FC<ICreatePosition> = (props) => {
  const { classes, cx } = useStyles()

  const [positionTitle, setPositionTitle] = React.useState('')
  const [open, setOpen] = React.useState<boolean>(false)
  const [message, setMessage] = React.useState<string>('')

  const handleNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPositionTitle(event.target.value as string)
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
    if (positionTitle.length < 3) {
      setMessage('Введите корректное название')
      setOpen(true)
    } else {
      const res = await createPosition(positionTitle)
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
        id="PositionName"
        className={classes.spaces}
        value={positionTitle}
        onChange={handleNameChange}
        label="Название"
        variant="outlined"
      />
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

export default CreatePosition
