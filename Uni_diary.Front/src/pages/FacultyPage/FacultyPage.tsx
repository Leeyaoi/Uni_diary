import {
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./FacultyPage.scss";
import { useAppDispatch, useAppSelector } from "../../shared/stores/store";
import { facultyActions } from "../../shared/stores/facultySlice";
import { professionActions } from "../../shared/stores/professionSlice";
import CreateProfessionDialog from "./ProfessionDialogs/CreateProfessionDialog";
import ProfessionDataGrid from "./ProfessionDataGrid/ProfessionDataGrid";
import EditProfessionDialog from "./ProfessionDialogs/EditProfessionDialog";
import DeleteProfessionDialog from "./ProfessionDialogs/DeleteProfessionDialog";

const FacultyPage = () => {
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

  const dispatch = useAppDispatch();
  const faculties = useAppSelector((state) => state.faculty.faculties);
  const facultyId = useAppSelector((state) => state.faculty.currentFacultyId);
  const professions = useAppSelector((state) => state.profession.professions);

  useEffect(() => {
    dispatch(facultyActions.fetchFaculty());
  }, []);

  useEffect(() => {
    dispatch(
      professionActions.fetchProfession({
        limit: limit,
        page: page,
        facultyId: facultyId,
      })
    );
  }, [facultyId, limit, page, openDelete, openEdit, openCreate]);

  const handleLimitChange = (event: SelectChangeEvent) => {
    setLimit(event.target.value as unknown as number);
    setPage(1);
  };

  const handleFacultyChange = (event: SelectChangeEvent) => {
    dispatch(facultyActions.setCUrrentFacultyId(event.target.value));
  };

  const renderFaculties = () => {
    const items: any[] = [];
    for (let i in faculties) {
      let value = faculties[i];
      if (value == null) {
        continue;
      }
      items.push(
        <MenuItem
          key={`${value.id}`}
          value={value.id}
        >{`${value.name}`}</MenuItem>
      );
    }
    return items;
  };

  return (
    <div id="profession">
      <div id="facultySelect">
        <p>Факультет:</p>
        <FormControl fullWidth variant="standard">
          <Select
            className="text-input"
            value={facultyId}
            onChange={handleFacultyChange}
          >
            {renderFaculties()}
          </Select>
        </FormControl>
      </div>
      <Button
        id="add-profession"
        variant="contained"
        onClick={() => {
          handleOpenCreate();
        }}
      >
        Добавить специальность
      </Button>
      <ProfessionDataGrid
        professions={professions}
        limit={limit}
        handleLimitChange={handleLimitChange}
        page={page}
        setPage={setPage}
        handleEdit={handleOpenEdit}
        handleDelete={handleOpenDelete}
      />
      <CreateProfessionDialog
        open={openCreate}
        handleClose={handleClose}
        facultyId={facultyId}
      />
      <EditProfessionDialog open={openEdit} handleClose={handleClose} id={id} />
      <DeleteProfessionDialog
        open={openDelete}
        handleClose={handleClose}
        id={id}
      />
    </div>
  );
};

export default FacultyPage;
