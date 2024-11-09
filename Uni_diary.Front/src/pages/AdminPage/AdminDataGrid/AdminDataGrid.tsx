import React from "react";
import "./AdminDataGrid.scss";
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
import AdminType from "../../../shared/types/admin";
import { useAppSelector } from "../../../shared/stores/store";

interface Props {
  admins: PaginatedType<AdminType>;
  limit: number;
  handleLimitChange: (event: SelectChangeEvent) => void;
  page: number;
  setPage: (value: number) => void;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const AdminDataGrid = ({
  admins,
  limit,
  handleLimitChange,
  page,
  setPage,
  handleEdit,
  handleDelete,
}: Props) => {
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const columns: GridColDef<AdminType[][number]>[] = [
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
            disabled={currentUser!.id == params.id}
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
          rows={admins ? admins.items : []}
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
          {admins == ({} as PaginatedType<AdminType>) ? 0 : admins.total}
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
            {admins == ({} as PaginatedType<AdminType>) ? 0 : admins.pageNum} ..{" "}
            {admins == ({} as PaginatedType<AdminType>) ? 0 : admins.pageCount}
          </p>
          <Button
            variant="contained"
            onClick={() => {
              if (page + 1 > admins.pageCount) {
                setPage(admins.pageCount);
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
              setPage(admins.pageCount);
            }}
          >
            <KeyboardDoubleArrowRightIcon />
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdminDataGrid;
