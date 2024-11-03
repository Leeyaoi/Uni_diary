import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../shared/stores/store";
import { professionActions } from "../../shared/stores/professionSlice";
import { Button, SelectChangeEvent } from "@mui/material";
import { groupActions } from "../../shared/stores/groupSlice";
import GroupDataGrid from "./GroupDataGrid/GroupDataGrid";
import CreateGroupDialog from "./GroupDialogs/CreateGroupDialog";
import EditGroupDialog from "./GroupDialogs/EditDeleteDialog";
import DeleteGroupDialog from "./GroupDialogs/DeleteGroupDialog";

const ProfessionPage = () => {
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

  const { professionId } = useParams();
  const dispatch = useAppDispatch();
  const fetchedProfession = useAppSelector(
    (state) => state.profession.fetchedProfession
  );
  const groups = useAppSelector((state) => state.group.groups);

  useEffect(() => {
    dispatch(professionActions.getProfessionById(professionId ?? ""));
  }, []);

  useEffect(() => {
    dispatch(
      groupActions.fetchGroups({
        limit: limit,
        page: page,
        professionId: professionId ?? "",
      })
    );
  }, [limit, page, openDelete, openEdit, openCreate]);

  const handleLimitChange = (event: SelectChangeEvent) => {
    setLimit(event.target.value as unknown as number);
    setPage(1);
  };

  return (
    <div id="profession">
      <p>
        {fetchedProfession.code} {fetchedProfession.name}
      </p>
      <Button
        id="add-profession"
        variant="contained"
        onClick={() => {
          handleOpenCreate();
        }}
      >
        Добавить группу
      </Button>
      <GroupDataGrid
        groups={groups}
        limit={limit}
        handleLimitChange={handleLimitChange}
        page={page}
        setPage={setPage}
        handleEdit={handleOpenEdit}
        handleDelete={handleOpenDelete}
      />
      <CreateGroupDialog
        open={openCreate}
        handleClose={handleClose}
        professionId={professionId ?? ""}
      />
      <EditGroupDialog open={openEdit} handleClose={handleClose} id={id} />
      <DeleteGroupDialog open={openDelete} handleClose={handleClose} id={id} />
    </div>
  );
};

export default ProfessionPage;
