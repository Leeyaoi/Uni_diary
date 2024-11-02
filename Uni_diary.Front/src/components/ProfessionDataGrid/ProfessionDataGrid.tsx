import React from "react";
import "./ProfessionDataGrid.scss";
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
import ProfessionType from "../../shared/types/profession";
import PaginatedType from "../../shared/types/paginatedModel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  professions: PaginatedType<ProfessionType>;
  limit: number;
  handleLimitChange: (event: SelectChangeEvent) => void;
  page: number;
  setPage: (value: number) => void;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const ProfessionDataGrid = ({
  professions,
  limit,
  handleLimitChange,
  page,
  setPage,
  handleEdit,
  handleDelete,
}: Props) => {
  const columns: GridColDef<ProfessionType[][number]>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 300,
      editable: false,
    },
    {
      field: "name",
      headerName: "Название",
      width: 130,
      editable: false,
    },
    {
      field: "code",
      headerName: "Код специальности",
      width: 150,
      editable: false,
    },
    {
      field: "jobTitle",
      headerName: "Профессия при выпуске",
      width: 200,
      editable: false,
    },
    {
      field: "actions",
      headerName: "Действия",
      width: 240,
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
          rows={professions ? professions.items : []}
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
            {professions == ({} as PaginatedType<ProfessionType>)
              ? 0
              : professions.pageNum}{" "}
            из{" "}
            {professions == ({} as PaginatedType<ProfessionType>)
              ? 0
              : professions.pageCount}
          </p>
          <Button
            variant="contained"
            onClick={() => {
              if (page + 1 > professions.pageCount) {
                setPage(professions.pageCount);
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
              setPage(professions.pageCount);
            }}
          >
            <KeyboardDoubleArrowRightIcon />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProfessionDataGrid;
