import React from 'react';
import { deleteCourse } from '../../../Request/DeleteRequests';
import ModalFormDialog from '../../Common/ModalFormDialog';
import { CourseTable } from '../Course/CourseTable';
import CreateCourse from '../Course/CreateCourse';
import EditCourse from '../Course/EditCourse';

export const CoursePage = () => {
  const onDelete = async (id: string): Promise<boolean> => {
    const res = await deleteCourse(id);
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
      <CourseTable
        createNew={createNew}
        editSelected={editSelected}
        setSelected={setSelected}
        deleteSelected={onDelete}
        open={open}
        setOpen={setOpen}
        error={error}
      />
      <ModalFormDialog
        name={'Создание курса'}
        open={createOpen}
        form={<CreateCourse setOpen={setCreateOpen} refresher={refreshFunction} />}
        setOpen={setCreateOpen}
      />
      <ModalFormDialog
        name={'Изменение курса'}
        open={editOpen}
        form={<EditCourse id={selected} setOpen={setEditOpen} refresher={refreshFunction} />}
        setOpen={setEditOpen}
      />
    </React.Fragment>
  );
};
