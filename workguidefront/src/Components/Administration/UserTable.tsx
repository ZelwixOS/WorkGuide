import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid'
import { makeStyles } from 'tss-react/mui'
import { Fab, Grid, Snackbar, Typography } from '@mui/material'
import { Plus, Pencil, Trash } from 'react-bootstrap-icons'
import { Alert } from '@mui/material'
import NavigationBar from './Common/NavigationBar'

const useStyles = makeStyles()((theme) => ({
  floating: {
    padding: theme.spacing(3),
  },
  fabBlue: {
    color: theme.palette.common.white,
    backgroundColor: '#2979ff',
    '&:hover': {
      backgroundColor: '#5393ff',
    },
  },
  fabRed: {
    color: theme.palette.common.white,
    backgroundColor: '#ff1744',
    '&:hover': {
      backgroundColor: '#b2102f',
    },
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: '#14D100',
    '&:hover': {
      backgroundColor: '#329D27',
    },
  },
  fabViolet: {
    color: theme.palette.common.white,
    backgroundColor: '#673ab7',
    '&:hover': {
      backgroundColor: '#8561c5',
    },
  },
}))

interface IUserType {
  id: string
  banned: boolean
}

interface IUserTable {
  name: string
  getData: () => Promise<IUserType[]>
  columns: GridColDef[]
  pageSize: number
  setSelected?: (id: string) => void
  banSelected?: (id: string) => Promise<boolean>
  unbanSelected?: (id: string) => Promise<boolean>
  editSelected?: (selectedId: string, refrFun: () => void) => void
  createNew?: (update: () => void) => void
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  error?: string
}

export const UserTable = <Type,>(props: IUserTable) => {
  const { classes, cx } = useStyles()

  const getData = async (isMounted: boolean) => {
    const res = await props.getData()
    if (isMounted) {
      setData(res)
      const page = [...res]
      setPage(page)
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

  const { pageSize } = props
  const [data, setData] = useState<IUserType[]>([])
  const [dataPage, setPage] = useState<IUserType[]>([])
  const [pageNum, setPageNum] = useState<number>(0)
  const [selectedItem, setSelectedItem] = useState<string>()

  const onPageChange = (page: number, details?: unknown) => {
    const paged = [...data]
    setPage(paged)
    setPageNum(page)
  }
  const onSelection = (
    selectionModel: GridSelectionModel,
    details?: unknown,
  ) => {
    if (selectionModel.length > 0) {
      setSelectedItem(selectionModel[0] as string)
      if (props.setSelected) {
        props.setSelected(selectionModel[0] as string)
      }
    }
  }

  const onBan = async () => {
    if (selectedItem && props.banSelected) {
      const res = await props.banSelected(selectedItem)
      if (res) {
        refreshData()
      }
    }
  }

  const onUnban = async () => {
    if (selectedItem && props.unbanSelected) {
      const res = await props.unbanSelected(selectedItem)
      if (res) {
        refreshData()
      }
    }
  }

  const onCreate = async () => {
    if (props.createNew) {
      props.createNew(refreshData.bind(this))
    }
  }

  const onEdit = async () => {
    if (selectedItem && props.editSelected) {
      props.editSelected(selectedItem, refreshData.bind(this))
    }
  }

  const handleClose = (event?: Event | React.SyntheticEvent<any, Event>, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    if (props.setOpen) {
      props.setOpen(false)
    }
  }

  return (
    <React.Fragment>
      <NavigationBar />
      {props.setOpen && props.error && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={props.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            {props.error}
          </Alert>
        </Snackbar>
      )}
      <Grid
        direction="column"
        className={classes.floating}
        container
        alignContent="stretch"
      >
        <Typography align="center" variant="h4">
          {props.name}
        </Typography>
        <DataGrid
          style={{ minHeight: 650 }}
          rows={dataPage}
          page={pageNum}
          rowCount={data.length}
          columns={props.columns}
          pageSize={pageSize}
          rowsPerPageOptions={[pageSize]}
          onPageChange={onPageChange}
          onSelectionModelChange={onSelection}
        />
        <Grid
          className={classes.floating}
          direction="row"
          container
          justifyContent="flex-end"
          alignContent="stretch"
        >
          <Grid container justifyContent="center" item xs={12} sm={4}>
            <Fab
              disabled={!props.createNew}
              variant="extended"
              className={classes.fabBlue}
              color="inherit"
              aria-label="add"
              onClick={onCreate}
            >
              <Plus />
              Добавить
            </Fab>
          </Grid>
          <Grid container justifyContent="center" item xs={12} sm={4}>
            <Fab
              disabled={
                !selectedItem || selectedItem === '' || !props.editSelected
              }
              variant="extended"
              className={classes.fabViolet}
              color="inherit"
              aria-label="edit"
              onClick={onEdit}
            >
              <Pencil />
              Изменить
            </Fab>
          </Grid>
          <Grid container justifyContent="center" item xs={12} sm={4}>
            {selectedItem &&
            dataPage?.find((s) => s.id === selectedItem)?.banned ? (
              <Fab
                disabled={
                  !selectedItem || selectedItem === '' || !props.unbanSelected
                }
                variant="extended"
                className={classes.fabGreen}
                color="inherit"
                aria-label="delete"
                onClick={onUnban}
              >
                <Trash />
                Разблокировать
              </Fab>
            ) : (
              <Fab
                disabled={
                  !selectedItem || selectedItem === '' || !props.banSelected
                }
                variant="extended"
                className={classes.fabRed}
                color="inherit"
                aria-label="delete"
                onClick={onBan}
              >
                <Trash />
                Заблокировать
              </Fab>
            )}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
