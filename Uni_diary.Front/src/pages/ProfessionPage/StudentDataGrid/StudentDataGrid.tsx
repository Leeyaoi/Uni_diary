import React from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import StudentType from "../../../shared/types/student";

interface Props {
  students: PaginatedType<StudentType>;
  limit: number;
  handleLimitChange: (event: SelectChangeEvent) => void;
  page: number;
  setPage: (value: number) => void;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const StudentDataGrid = ({
  students,
  limit,
  handleLimitChange,
  page,
  setPage,
  handleEdit,
  handleDelete,
}: Props) => {
  const navigate = useNavigate();

  const columns: GridColDef<StudentType[][number]>[] = [
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
      field: "budget",
      headerName: "Бюджет",
      width: 100,
      editable: false,
      renderCell: (params) => {
        return <>{params.row.budget ? <CheckIcon /> : <CloseIcon />}</>;
      },
      cellClassName: "budgetCell",
    },
    {
      field: "actions",
      headerName: "Действия",
      width: 200,
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
          rows={students ? students.items : []}
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
          {students == ({} as PaginatedType<StudentType>) ? 0 : students.total}
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
            {students == ({} as PaginatedType<StudentType>)
              ? 0
              : students.pageNum}{" "}
            ..{" "}
            {students == ({} as PaginatedType<StudentType>)
              ? 0
              : students.pageCount}
          </p>
          <Button
            variant="contained"
            onClick={() => {
              if (page + 1 > students.pageCount) {
                setPage(students.pageCount);
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
              setPage(students.pageCount);
            }}
          >
            <KeyboardDoubleArrowRightIcon />
          </Button>
        </div>
      </div>
    </>
  );
};

export default StudentDataGrid;
