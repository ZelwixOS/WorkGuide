import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import {Fab, Grid, Snackbar, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui'
import { Plus, Pencil, Trash } from 'react-bootstrap-icons'
import { Alert } from '@mui/material';

const useStyles =  makeStyles()((theme) => ({
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
    fabViolet: {
      color: theme.palette.common.white,
      backgroundColor: '#673ab7',
      '&:hover': {
        backgroundColor: '#8561c5',
      },
    },
  }),
);

interface ITableStructure<Type> {
  name: string;
  getData: () => Promise<Type[]>;
  columns: GridColDef[];
  pageSize: number;
  setSelected?: (id: string) => void;
  deleteSelected?: (id: string) => Promise<boolean>;
  editSelected?: (selectedId: string, refrFun: () => void) => void;
  createNew?: (update: () => void) => void;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  error?: string;
  compact?: boolean;
}

export const TableStructure = <Type,>(props: ITableStructure<Type>) => {
  const { classes, cx } = useStyles()

  const getData = async (isMounted: boolean) => {
    const res = await props.getData();
    if (isMounted) {
      setData(res);
      const page = [...res];
      setPage(page);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    let isMounted = true;
    getData(isMounted);

    return () => {
      isMounted = false;
    };
  };

  const { pageSize } = props;
  const [data, setData] = useState<Type[]>([]);
  const [dataPage, setPage] = useState<Type[]>([]);
  const [pageNum, setPageNum] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<string>();

  const onPageChange = (page: number, details?: unknown) => {
    const paged = [...data];
    setPage(paged);
    setPageNum(page);
  };

  const onSelection = (selectionModel: GridSelectionModel, details?: unknown) => {
    if (selectionModel.length > 0) {
      setSelectedItem(selectionModel[0] as string);
      if (props.setSelected) {
        props.setSelected(selectionModel[0] as string);
      }
    }
  };

  const onDelete = async () => {
    if (selectedItem && props.deleteSelected) {
      const res = await props.deleteSelected(selectedItem);
      if (res) {
        refreshData();
      }
    }
  };

  const onCreate = async () => {
    if (props.createNew) {
      props.createNew(refreshData.bind(this));
    }
  };

  const onEdit = async () => {
    if (selectedItem && props.editSelected) {
      props.editSelected(selectedItem, refreshData.bind(this));
    }
  };

  const handleClose = (event?: Event | React.SyntheticEvent<any, Event>, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    if (props.setOpen) {
      props.setOpen(false);
    }
  };

  return (
    <React.Fragment>
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
      <Grid direction="column" className={classes.floating} container alignContent="stretch">
        <Typography align="center" variant={props.compact ? 'h6' : 'h4'}>
          {props.name}
        </Typography>
        <DataGrid
          style={props.compact ? { minHeight: 350 } : { minHeight: 650 }}
          rows={dataPage}
          page={pageNum}
          rowCount={data.length}
          columns={props.columns}
          pageSize={pageSize}
          rowsPerPageOptions={[pageSize]}
          onPageChange={onPageChange}
          onSelectionModelChange={onSelection}
        />
        <Grid className={classes.floating} direction="row" container justifyContent="flex-end" alignContent="stretch">
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
              disabled={!selectedItem || selectedItem === '' || !props.editSelected}
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
            <Fab
              disabled={!selectedItem || selectedItem === '' || !props.deleteSelected}
              variant="extended"
              className={classes.fabRed}
              color="inherit"
              aria-label="delete"
              onClick={onDelete}
            >
              <Trash />
              Удалить
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
