import React from 'react'
import { Modal } from 'react-bootstrap'
import { Pencil } from 'react-bootstrap-icons';
import { makeStyles } from '../../theme'
import UserMainInfo from '../../Types/UserMainInfo';
import UserForm from './UserForm';

interface IUserModal {
  user: UserMainInfo;
}

const useStyles = makeStyles()((theme) => ({
  editIcon: {
    marginLeft: '0.75rem',
    color: '#000',
    '&:hover': {
      color: '#A370F780'
    }
  },
  modal: {
    minWidth: '0%',
    maxWidth: '100%',
    width: 'fit-content',
  },
  modalBackground: {
    backgroundColor: '#A370F7',
    borderRadius: '0.375rem'
  }
}))

const UserModal: React.FC<IUserModal> = (props: IUserModal) => {
  const { classes, cx } = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Pencil
        size={18}
        className={classes.editIcon}
        onClick={handleClickOpen}
      />
      <Modal
        dialogClassName={classes.modal}
        show={open}
        onHide={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Modal.Body className={classes.modalBackground} >
          <UserForm user={props.user} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default UserModal
