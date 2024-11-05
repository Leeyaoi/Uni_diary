import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HttpRequest } from "../../api/GenericApi";
import { RESTMethod } from "../types/RESTMethodEnum";
import StudentType from "../types/student";
import PaginatedType from "../types/paginatedModel";

const deleteStudent = createAsyncThunk("student/delete", async (id: string) => {
  try {
    const response = await HttpRequest<StudentType>({
      uri: `/student/${id}`,
      method: RESTMethod.Delete,
    });
    if (response.code === "error") {
      return {} as StudentType;
    }
    return response.data;
  } catch (error) {
    return {} as StudentType;
  }
});

const getStudentById = createAsyncThunk(
  "student/fetchOne",
  async (id: string) => {
    try {
      const response = await HttpRequest<StudentType>({
        uri: `/student/${id}`,
        method: RESTMethod.Get,
      });
      if (response.code === "error") {
        return {} as StudentType;
      }
      return response.data;
    } catch (error) {
      return {} as StudentType;
    }
  }
);

const fetchStudents = createAsyncThunk(
  "student/fetch",
  async ({
    limit,
    page,
    groupId,
  }: {
    limit: number;
    page: number;
    groupId: string;
  }) => {
    try {
      const response = await HttpRequest<PaginatedType<StudentType>>({
        uri: `/student/paginate`,
        method: RESTMethod.Post,
        item: { limit: limit, page: page, groupId: groupId },
      });
      if (response.code === "error") {
        return {} as PaginatedType<StudentType>;
      }
      return response.data;
    } catch (error) {
      return {} as PaginatedType<StudentType>;
    }
  }
);

const updateStudent = createAsyncThunk(
  "student/update",
  async (newStudent: {
    name: string;
    surname: string;
    budget: boolean;
    login: string;
    password: string;
    id: string;
  }) => {
    try {
      const response = await HttpRequest<StudentType>({
        uri: `/student/${newStudent.id}`,
        method: RESTMethod.Put,
        item: newStudent,
      });
      if (response.code === "error") {
        return {} as StudentType;
      }
      return response.data;
    } catch (error) {
      return {} as StudentType;
    }
  }
);

const createStudent = createAsyncThunk(
  "student/create",
  async (newStudent: {
    name: string;
    surname: string;
    budget: boolean;
    login: string;
    password: string;
    groupId: string;
  }) => {
    try {
      const userResponse = await HttpRequest<{ id: string }>({
        uri: `/user/post`,
        method: RESTMethod.Post,
        item: newStudent,
      });
      if (userResponse.code === "error") {
        return {} as PaginatedType<StudentType>;
      }
      const response = await HttpRequest<StudentType>({
        uri: `/student/post`,
        method: RESTMethod.Post,
        item: { ...newStudent, userId: userResponse.data.id },
      });
      if (response.code === "error") {
        return {} as PaginatedType<StudentType>;
      }
      return response.data;
    } catch (error) {
      return {} as PaginatedType<StudentType>;
    }
  }
);

interface StudentState {
  error: string | null;
  loading: boolean;
  students: PaginatedType<StudentType>;
  fetchedStudent: StudentType;
}

const initialState: StudentState = {
  error: null,
  loading: false,
  students: {} as PaginatedType<StudentType>,
  fetchedStudent: {} as StudentType,
};

export const studentSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchStudents
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
        state.error = null;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //deleteStudent
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //getStudentById
      .addCase(getStudentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchedStudent = action.payload;
        state.error = null;
      })
      .addCase(getStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //updateStudent
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //createStudent
      .addCase(createStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default studentSlice.reducer;
export const studentActions = {
  ...studentSlice.actions,
  fetchStudents,
  deleteStudent,
  getStudentById,
  updateStudent,
  createStudent,
};
