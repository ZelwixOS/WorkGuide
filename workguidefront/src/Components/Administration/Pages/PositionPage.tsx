import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { deletePosition } from '../../../Request/DeleteRequests';
import ModalFormDialog from '../../Common/ModalFormDialog';
import CreatePosition from '../Position/CreatePosition';
import EditPosition from '../Position/EditPosition';
import { TableBasement } from '../Common/TableBasement';
import { getAllPositions } from '../../../Request/GetRequests';

export const PositionPage = () => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 300 },
    {
      field: 'title',
      headerName: 'Название',
      width: 500,
    },
  ];

  const onDelete = async (id: string): Promise<boolean> => {
    const res = await deletePosition(id);
    if (res === 0) {
      setError('Не удалось удалить объект. Возможно, существуют зависимости.');
      setOpen(true);
      return false;
    }

    return true;
  };

  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState('');
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [refreshFunction, setRefrFun] = React.useState({ refresh: () => console.log('') });
  const [selected, setSelected] = React.useState('');

  const createNew = (refrFun: () => void) => {
    setCreateOpen(true);
    setRefrFun({ refresh: refrFun });
  };

  const editSelected = (selectedId: string, refrFun: () => void) => {
    setSelected(selectedId);
    setEditOpen(true);
    setRefrFun({ refresh: refrFun });
  };

  return (
    <React.Fragment>
      <TableBasement
        name="Должности"
        getData={getAllPositions}
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
        name={'Создание должности'}
        open={createOpen}
        form={<CreatePosition setOpen={setCreateOpen} refresher={refreshFunction} />}
        setOpen={setCreateOpen}
      />
      <ModalFormDialog
        name={'Изменение должности'}
        open={editOpen}
        form={<EditPosition id={selected} setOpen={setEditOpen} refresher={refreshFunction} />}
        setOpen={setEditOpen}
      />
    </React.Fragment>
  );
};
