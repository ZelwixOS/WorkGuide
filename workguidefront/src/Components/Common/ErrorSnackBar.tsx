import React from 'react'
import { Alert } from 'react-bootstrap'
import { makeStyles } from '../../theme'

interface IErrorSnackBar {
  open: boolean
  setOpen: (b: boolean) => void
  message: string
  errors: string[]
}

const useStyles = makeStyles()((theme) => ({
  main: {
    position: "absolute",
    top: "2rem",
  },
}),
);

const ErrorSnackBar: React.FC<IErrorSnackBar> = (props) => {
  const handleClose = () => {
    props.setOpen(false)
  }

  const { classes, cx } = useStyles()

  return (
    <>
      {props?.open && (
        <Alert variant="warning" className={classes.main} onClose={handleClose}>
          <Alert.Heading>{props?.message}</Alert.Heading>
          <ul>
            {props?.errors.map((er, key) => (
              <li key={key}>{er}</li>
            ))}
          </ul>
        </Alert>
      )}
    </>
  )
}

export default ErrorSnackBar
