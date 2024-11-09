import React, { useEffect, useState } from "react";
import "./AdminPage.scss";
import { useAppDispatch, useAppSelector } from "../../shared/stores/store";
import AdminDataGrid from "./AdminDataGrid/AdminDataGrid";
import { Button, SelectChangeEvent } from "@mui/material";
import { AdminActions } from "../../shared/stores/adminSlice";
import CreateAdminDialog from "./AdminDialogs/CreateAdminDialog";
import EditAdminDialog from "./AdminDialogs/EditAdminDialog";
import DeleteAdminDialog from "./AdminDialogs/DeleteAdminDialog";

const AdminPage = () => {
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
      AdminActions.fetchAdmins({
        limit: limit,
        page: page,
      })
    );
  }, [limit, page, openDelete, openEdit, openCreate]);

  const dispatch = useAppDispatch();
  const admins = useAppSelector((state) => state.admin.Admins);
  return (
    <div id="admins">
      <Button
        id="add-profession"
        variant="contained"
        onClick={() => {
          handleOpenCreate();
        }}
      >
        Добавить администратора
      </Button>
      <AdminDataGrid
        admins={admins}
        limit={limit}
        handleLimitChange={handleLimitChange}
        page={page}
        setPage={setPage}
        handleEdit={handleOpenEdit}
        handleDelete={handleOpenDelete}
      />

      <CreateAdminDialog open={openCreate} handleClose={handleClose} />
      <EditAdminDialog open={openEdit} handleClose={handleClose} id={id} />
      <DeleteAdminDialog open={openDelete} handleClose={handleClose} id={id} />
    </div>
  );
};

export default AdminPage;
