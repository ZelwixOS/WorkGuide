import React, { useEffect } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { deleteAchievement } from '../../../Request/DeleteRequests'
import ModalFormDialog from '../../Common/ModalFormDialog'
import { getAllAchievements, getCourses } from '../../../Request/GetRequests'
import NavigationBar from '../Common/NavigationBar'
import { TableStructure } from '../Common/TableStructure'
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import Course from '../../../Types/Course'
import { makeStyles } from 'tss-react/mui'
import CreateAchievement from '../Achievements/CreateAchievement'
import EditAchievement from '../Achievements/EditAchievement'

const useStyles = makeStyles()((theme) => ({
  floating: {
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },
}))

export const AchievementPage = () => {
  const { classes, cx } = useStyles()

  const columns: GridColDef[] = [
    { field: 'id', sortable: false, headerName: 'ID', width: 300 },
    {
      field: 'name',
      headerName: 'Название',
      sortable: false,
      width: 400,
    },
    {
      field: 'description',
      headerName: 'Описание',
      sortable: false,
      width: 700,
    },
  ]

  const getData = async (isMounted: boolean) => {
    const res = await getCourses(1, 100000)
    if (isMounted) {
      setCourses(res.data)
    }
  }

  useEffect(() => {
    refreshData()
  }, [])

  const refreshData = () => {
    let isMounted = true
    getData(isMounted)

    return () => {
      isMounted = false
    }
  }

  const onDelete = async (id: string): Promise<boolean> => {
    const res = await deleteAchievement(id)
    if (res === 0) {
      setError('Не удалось удалить объект. Возможно, существуют зависимости.')
      setOpen(true)
      return false
    }

    return true
  }

  const commonCourseId = 'ccid'
  const [open, setOpen] = React.useState(false)
  const [error, setError] = React.useState('')
  const [courseId, setCourseId] = React.useState<string>(commonCourseId)
  const [createOpen, setCreateOpen] = React.useState(false)
  const [editOpen, setEditOpen] = React.useState(false)
  const [courses, setCourses] = React.useState<Course[]>([])
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

  const currId = [''] as string[]

  const getAchievements = async () => {
    return currId[0] == commonCourseId
      ? await getAllAchievements('')
      : await getAllAchievements(currId[0])
  }

  const handleCourseChange = (event: SelectChangeEvent) => {
    const id = event.target.value as string
    setCourseId(id)
    currId[0] = id
    refreshFunction.refresh()
  }

  return (
    <React.Fragment>
      <NavigationBar />
      <FormControl fullWidth className={classes.floating}>
        <InputLabel id="course-select-label" className={classes.floating}>
          Раздел
        </InputLabel>
        <Select
          labelId="course-select-label"
          id="course-select"
          value={courseId}
          label="Раздел"
          onChange={handleCourseChange}
        >
          <MenuItem value={commonCourseId}>Общие</MenuItem>
          {courses.map((c) => (
            <MenuItem key={c.id} value={c.id}>{`${c.name} ${c.url}`}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableStructure
        name={
          'Достижения: ' +
          (courseId === commonCourseId
            ? 'Общие'
            : courses.find((c) => c.id === courseId)?.name ?? '')
        }
        getData={getAchievements.bind(this)}
        columns={columns}
        pageSize={10}
        refresher={refreshFunction}
        deleteSelected={onDelete}
        editSelected={editSelected}
        createNew={createNew}
        open={open}
        setOpen={setOpen}
        error={error}
      />
      <ModalFormDialog
        name={'Создание достижения'}
        open={createOpen}
        form={
          <CreateAchievement
            setOpen={setCreateOpen}
            courses={courses}
            refresher={refreshFunction}
          />
        }
        setOpen={setCreateOpen}
      />
      <ModalFormDialog
        name={'Изменение курса'}
        open={editOpen}
        form={
          <EditAchievement
            achievementId={selected}
            setOpen={setEditOpen}
            refresher={refreshFunction}
            courses={courses}
          />
        }
        setOpen={setEditOpen}
      />
    </React.Fragment>
  )
}
