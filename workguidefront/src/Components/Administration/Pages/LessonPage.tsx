import React from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { deleteLesson } from '../../../Request/DeleteRequests'
import ModalFormDialog from '../../Common/ModalFormDialog'
import CreateLesson from '../Lesson/CreateLesson'
import EditLesson from '../Lesson/EditLesson'
import { TableBasement } from '../Common/TableBasement'
import { getAllLessons } from '../../../Request/GetRequests'

export const LessonPage = () => {
  const columns: GridColDef[] = [
    { field: 'id', sortable: false, headerName: 'ID', width: 300 },
    {
      field: 'name',
      headerName: 'Название',
      sortable: false,
      width: 400,
    },
    {
      field: 'orderNumber',
      headerName: 'Номер урока',
      sortable: true,
      width: 200,
      type: 'number',
    },
    {
      field: 'courseName',
      headerName: 'Курс',
      filterable: true,
      sortable: false,
      width: 300,
    },
  ]

  const onDelete = async (id: string): Promise<boolean> => {
    const res = await deleteLesson(id)
    if (res === 0) {
      setError('Не удалось удалить объект. Возможно, существуют зависимости.')
      setOpen(true)
      return false
    }

    return true
  }

  const [open, setOpen] = React.useState(false)
  const [error, setError] = React.useState('')
  const [createOpen, setCreateOpen] = React.useState(false)
  const [editOpen, setEditOpen] = React.useState(false)
  const [refreshFunction, setRefrFun] = React.useState({
    refresh: () => console.log(''),
  })
  const [selected, setSelected] = React.useState('')

  const createNew = (refrFun: () => void) => {
    setCreateOpen(true)
    setRefrFun({ refresh: refrFun })
  }

  const editSelected = (selectedId: string, refrFun: () => void) => {
    setSelected(selectedId)
    setEditOpen(true)
    setRefrFun({ refresh: refrFun })
  }

  return (
    <React.Fragment>
      <TableBasement
        name="Уроки"
        getData={getAllLessons}
        columns={columns}
        pageSize={10}
        deleteSelected={onDelete}
        createNew={createNew}
        editSelected={editSelected}
        open={open}
        setOpen={setOpen}
        error={error}
      />
      <ModalFormDialog
        name={'Создание урока'}
        open={createOpen}
        form={
          <CreateLesson setOpen={setCreateOpen} refresher={refreshFunction} />
        }
        setOpen={setCreateOpen}
      />
      <ModalFormDialog
        name={'Изменение урока'}
        open={editOpen}
        form={
          <EditLesson
            id={selected}
            setOpen={setEditOpen}
            refresher={refreshFunction}
          />
        }
        setOpen={setEditOpen}
      />
    </React.Fragment>
  )
}
