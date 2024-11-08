import React, { useEffect, useState } from "react";
import "./TeacherPage.scss";
import { useAppDispatch, useAppSelector } from "../../shared/stores/store";
import TeacherDataGrid from "./TeacherDataGrid/TeacherDataGrid";
import { Button, SelectChangeEvent } from "@mui/material";
import { teacherActions } from "../../shared/stores/teacherSlice";
import CreateTeacherDialog from "./TeacherDialogs/CreateTeacherDialog";
import EditTeacherDialog from "./TeacherDialogs/EditTeacherDialog";
import DeleteTeacherDialog from "./TeacherDialogs/DeleteTeacherDialog";

const TeacherPage = () => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [id, setId] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleOpenDelete = (id: string) => {
    setOpenDelete(true);
    setId(id);
  };

  const handleOpenEdit = (id: string) => {
    setOpenEdit(true);
    setId(id);
  };

  const handleClose = () => {
    setOpenCreate(false);
    setOpenDelete(false);
    setOpenEdit(false);
  };

  const handleLimitChange = (event: SelectChangeEvent) => {
    setLimit(event.target.value as unknown as number);
    setPage(1);
  };

  useEffect(() => {
    dispatch(
      teacherActions.fetchTeachers({
        limit: limit,
        page: page,
      })
    );
  }, [limit, page, openDelete, openEdit, openCreate]);

  const dispatch = useAppDispatch();
  const teachers = useAppSelector((state) => state.teacher.Teachers);
  return (
    <div id="teachers">
      <Button
        id="add-profession"
        variant="contained"
        onClick={() => {
          handleOpenCreate();
        }}
      >
        Добавить преподавателя
      </Button>
      <TeacherDataGrid
        teachers={teachers}
        limit={limit}
        handleLimitChange={handleLimitChange}
        page={page}
        setPage={setPage}
        handleEdit={handleOpenEdit}
        handleDelete={handleOpenDelete}
      />

      <CreateTeacherDialog open={openCreate} handleClose={handleClose} />
      <EditTeacherDialog open={openEdit} handleClose={handleClose} id={id} />
      <DeleteTeacherDialog
        open={openDelete}
        handleClose={handleClose}
        id={id}
      />
    </div>
  );
};

export default TeacherPage;
