import React from 'react'
import Button from '@mui/material/Button'
import { makeStyles } from 'tss-react/mui'
import { Grid, MenuItem, MenuList } from '@mui/material'
import Theory from '../../../Types/Theory'
import Test from '../../../Types/Test'
import { useNavigate } from 'react-router-dom'
import { deleteTest, deleteTheory } from '../../../Request/DeleteRequests'

const useStyles = makeStyles()((theme) => ({
  spaces: {
    marginTop: theme.spacing(2),
  },
  deleteBt: {
    justifyContent: 'space-between',
  },
  bordered: {
    border: '1px solid #ee82ee',
    padding: theme.spacing(1),
  },
  itemField: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
}))

interface IPageList {
  theoryPages: Theory[]
  testPages: Test[]
  lessonId: string
  isComplex: boolean
  refresh: () => void
}

const PageList: React.FC<IPageList> = (props) => {
  const { classes, cx } = useStyles()
  const navigate = useNavigate()

  const onDeletedClick = (id: string) => {
    const method = props.testPages.find((p) => p.id == id)
      ? deleteTest
      : deleteTheory

    method(id).then(() => props.refresh())
  }

  const onAddClick = () => {
    navigate(
      `/admin/lessons/${props.lessonId}/${
        1 + (props.testPages?.length ?? 0) + (props.theoryPages?.length ?? 0)
      }`,
    )
  }

  const onEditClick = (number: number, id: string, type: string) => {
      navigate(`/admin/lessons/${props.lessonId}/${number}?id=${id}&type=${type}`)
  }

  const mergeSort = (theories: Theory[], tests: Test[]): (Test | Theory)[] => {
    const all = [...theories, ...tests] as (Test | Theory)[]
    return all.sort((a, b) => (a.pageNumber > b.pageNumber ? 1 : -1))
  }

  return (
    <Grid
      className={classes.bordered}
      container
      direction="column"
      justifyContent="stretch"
    >
      <MenuList>
        {mergeSort(props.theoryPages, props.testPages).map((item) => (
          <MenuItem
            key={item.id}
            className={classes.deleteBt}
            
          >
            <div className={classes.itemField} onClick={() => onEditClick(item.pageNumber, item.id, props.testPages.find((p) => p.id == item.id) ? 'test' : 'theory')}></div>
            {`${item.pageNumber}. `}
            {props.testPages.find((p) => p.id == item.id) ? 'Вопрос' : 'Теория'}
            <Button onClick={() => onDeletedClick(item.id)}>X</Button>
          </MenuItem>
        ))}
      </MenuList>
      <Button
        className={classes.spaces}
        variant="outlined"
        onClick={onAddClick}
      >
        Добавить
      </Button>
    </Grid>
  )
}

export default PageList
