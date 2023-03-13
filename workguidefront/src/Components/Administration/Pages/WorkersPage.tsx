import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { UserTable } from '../UserTable';
import { getAllWorkers } from '../../../Request/GetRequests';
import { banUser, unbanUser } from '../../../Request/PostRequests';

export const WorkersPage = () => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 300 },
    {
      field: 'userName',
      headerName: 'Логин',
      width: 200,
    },
    {
      field: 'firstName',
      headerName: 'Имя',
      width: 200,
    },
    {
      field: 'secondName',
      headerName: 'Фамилия',
      width: 200,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 230,
    },
    {
      field: 'phoneNumber',
      headerName: 'Телефон',
      width: 150,
    },
    {
      field: 'banned',
      headerName: 'Бан',
      width: 120,
      type: 'boolean',
    },
  ];

  const onBan = async (id: string): Promise<boolean> => {
    const res = await banUser(id);
    if (res === 0) {
      return false;
    }

    return true;
  };

  const onUnban = async (id: string): Promise<boolean> => {
    const res = await unbanUser(id);
    if (res === 0) {
      return false;
    }

    return true;
  };

  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState('');

  return (
    <React.Fragment>
      <UserTable
        name="Работники"
        getData={getAllWorkers}
        columns={columns}
        pageSize={10}
        banSelected={onBan}
        unbanSelected={onUnban}
        open={open}
        setOpen={setOpen}
        error={error}
      />
    </React.Fragment>
  );
};
