import React, { useEffect, useState } from "react";
import "./ProfessionPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../shared/stores/store";
import { professionActions } from "../../shared/stores/professionSlice";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { groupActions } from "../../shared/stores/groupSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StudentDataGrid from "./StudentDataGrid/StudentDataGrid";
import CreateGroupDialog from "./GroupDialogs/CreateGroupDialog";
import EditGroupDialog from "./GroupDialogs/EditGroupDialog";
import DeleteGroupDialog from "./GroupDialogs/DeleteGroupDialog";
import { studentActions } from "../../shared/stores/studentSlice";
import CreateStudentDialog from "./StudentDialogs/CreateStudentDialog";
import EditStudentDialog from "./StudentDialogs/EditStudentDialog";
import DeleteStudentDialog from "./StudentDialogs/DeleteStudentDialog";

const ProfessionPage = () => {
  const navigate = useNavigate();

  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [id, setId] = useState("");
  const [groupId, setGropId] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openStudentCreate, setOpenStudentCreate] = useState(false);
  const [openStudentDelete, setOpenStudentDelete] = useState(false);
  const [openStudentEdit, setOpenStudentEdit] = useState(false);

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleOpenStudentCreate = () => {
    setOpenStudentCreate(true);
  };

  const handleOpenStudentDelete = (id: string) => {
    setOpenStudentDelete(true);
    setId(id);
  };

  const handleOpenStudentEdit = (id: string) => {
    setOpenStudentEdit(true);
    setId(id);
  };

  const handleClose = () => {
    if (openDelete) {
      setGropId("");
    }
    setOpenCreate(false);
    setOpenDelete(false);
    setOpenEdit(false);
    setOpenStudentCreate(false);
    setOpenStudentDelete(false);
    setOpenStudentEdit(false);
  };

  const { professionId } = useParams();
  const dispatch = useAppDispatch();
  const fetchedProfession = useAppSelector(
    (state) => state.profession.fetchedProfession
  );
  const students = useAppSelector((state) => state.student.students);

  useEffect(() => {
    dispatch(professionActions.getProfessionById(professionId ?? ""));
  }, [openDelete, openEdit, openCreate]);

  useEffect(() => {
    dispatch(
      studentActions.fetchStudents({
        limit: limit,
        page: page,
        groupId: groupId,
      })
    );
  }, [
    limit,
    page,
    groupId,
    openDelete,
    openStudentCreate,
    openStudentDelete,
    openStudentEdit,
  ]);

  const handleLimitChange = (event: SelectChangeEvent) => {
    setLimit(event.target.value as unknown as number);
    setPage(1);
  };

  const handleGropIdChange = (event: SelectChangeEvent) => {
    setGropId(event.target.value);
  };

  const renderGroups = () => {
    const items: any[] = [];
    for (let i in fetchedProfession.groups) {
      let value = fetchedProfession.groups[i];
      if (value == null) {
        continue;
      }
      items.push(
        <MenuItem key={`${value.id}`} value={value.id}>
          {value.year % 100}
          {value.num}
        </MenuItem>
      );
    }
    return items;
  };

  return (
    <div id="profession">
      <Button
        id="return_button"
        variant="contained"
        onClick={() => {
          navigate("/professions");
        }}
      >
        <ArrowBackIcon />
      </Button>
      <div id="group-select">
        {fetchedProfession.code} {fetchedProfession.name}-
        <FormControl variant="standard">
          <Select
            className="text-input"
            value={groupId}
            onChange={handleGropIdChange}
          >
            {renderGroups()}
          </Select>
        </FormControl>
      </div>
      <div>
        <Button
          id="add-profession"
          variant="contained"
          onClick={() => {
            handleOpenCreate();
          }}
        >
          Добавить группу
        </Button>
        <Button
          disabled={groupId == ""}
          id="add-profession"
          variant="contained"
          onClick={() => {
            handleOpenEdit();
          }}
        >
          Изменить группу
        </Button>
        <Button
          disabled={groupId == ""}
          id="add-profession"
          variant="contained"
          color="error"
          onClick={() => {
            handleOpenDelete();
          }}
        >
          Удалить группу
        </Button>
      </div>
      <Button
        disabled={groupId == ""}
        id="add-student"
        variant="contained"
        onClick={() => {
          handleOpenStudentCreate();
        }}
      >
        Добавить студента
      </Button>
      <StudentDataGrid
        students={students}
        limit={limit}
        handleLimitChange={handleLimitChange}
        page={page}
        setPage={setPage}
        handleEdit={handleOpenStudentEdit}
        handleDelete={handleOpenStudentDelete}
      />
      <CreateGroupDialog
        open={openCreate}
        handleClose={handleClose}
        professionId={professionId ?? ""}
      />
      <EditGroupDialog open={openEdit} handleClose={handleClose} id={groupId} />
      <DeleteGroupDialog
        open={openDelete}
        handleClose={handleClose}
        id={groupId}
      />
      <CreateStudentDialog
        open={openStudentCreate}
        handleClose={handleClose}
        groupId={groupId}
      />
      <EditStudentDialog
        open={openStudentEdit}
        handleClose={handleClose}
        id={id}
      />
      <DeleteStudentDialog
        open={openStudentDelete}
        handleClose={handleClose}
        id={id}
      />
    </div>
  );
};

export default ProfessionPage;
