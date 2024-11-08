import React from "react";
import "./TeacherDataGrid.scss";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import PaginatedType from "../../../shared/types/paginatedModel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import TeacherType from "../../../shared/types/teacher";

interface Props {
  teachers: PaginatedType<TeacherType>;
  limit: number;
  handleLimitChange: (event: SelectChangeEvent) => void;
  page: number;
  setPage: (value: number) => void;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const TeacherDataGrid = ({
  teachers,
  limit,
  handleLimitChange,
  page,
  setPage,
  handleEdit,
  handleDelete,
}: Props) => {
  const columns: GridColDef<TeacherType[][number]>[] = [
    {
      field: "login",
      headerName: "Логин",
      width: 130,
      editable: false,
      renderCell: (params) => {
        return <>{params.row.user.login}</>;
      },
    },
    {
      field: "password",
      headerName: "Пароль",
      width: 130,
      editable: false,
      renderCell: (params) => {
        return <>{params.row.user.password}</>;
      },
    },
    {
      field: "name",
      headerName: "Имя",
      width: 150,
      editable: false,
    },
    {
      field: "surname",
      headerName: "Фамилия",
      width: 150,
      editable: false,
    },
    {
      field: "jobTitle",
      headerName: "Должность",
      width: 200,
      editable: false,
    },
    {
      field: "actions",
      headerName: "Действия",
      width: 300,
      renderCell: (params) => (
        <>
          <Button
            color="success"
            variant="contained"
            id="actionButton"
            onClick={() => {
              handleEdit(params.id as string);
            }}
          >
            <EditIcon />
          </Button>
          <Button
            color="error"
            onClick={() => {
              handleDelete(params.id as string);
            }}
            variant="contained"
            id="actionButton"
          >
            <DeleteIcon />
          </Button>
        </>
      ),
    },
  ];
  return (
    <>
      <div>
        <DataGrid
          rows={teachers ? teachers.items : []}
          columns={columns}
          disableRowSelectionOnClick
          hideFooter={true}
        />
      </div>
      <div id="pagination-size-control">
        <p>Размер страницы:</p>
        <FormControl variant="standard">
          <Select
            className="text-input"
            value={limit.toString()}
            onChange={handleLimitChange}
          >
            <MenuItem key={5} value={5}>
              5
            </MenuItem>
            <MenuItem key={10} value={10}>
              10
            </MenuItem>
          </Select>
        </FormControl>
        <p id="total_data">
          Всего записей:{" "}
          {teachers == ({} as PaginatedType<TeacherType>) ? 0 : teachers.total}
        </p>
        <div id="pagination-control">
          <Button
            variant="contained"
            onClick={() => {
              setPage(1);
            }}
          >
            <KeyboardDoubleArrowLeftIcon />
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (page - 1 <= 0) {
                setPage(1);
              } else {
                setPage(page - 1);
              }
            }}
          >
            <KeyboardArrowLeftIcon />
          </Button>
          <p>
            {teachers == ({} as PaginatedType<TeacherType>)
              ? 0
              : teachers.pageNum}{" "}
            ..{" "}
            {teachers == ({} as PaginatedType<TeacherType>)
              ? 0
              : teachers.pageCount}
          </p>
          <Button
            variant="contained"
            onClick={() => {
              if (page + 1 > teachers.pageCount) {
                setPage(teachers.pageCount);
              } else {
                setPage(page + 1);
              }
            }}
          >
            <KeyboardArrowRightIcon />
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setPage(teachers.pageCount);
            }}
          >
            <KeyboardDoubleArrowRightIcon />
          </Button>
        </div>
      </div>
    </>
  );
};

export default TeacherDataGrid;
