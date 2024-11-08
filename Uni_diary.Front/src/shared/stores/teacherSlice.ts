import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HttpRequest } from "../../api/GenericApi";
import { RESTMethod } from "../types/RESTMethodEnum";
import TeacherType from "../types/teacher";
import PaginatedType from "../types/paginatedModel";

const deleteTeacher = createAsyncThunk("teacher/delete", async (id: string) => {
  try {
    const response = await HttpRequest<TeacherType>({
      uri: `/teacher/${id}`,
      method: RESTMethod.Delete,
    });
    if (response.code === "error") {
      return {} as TeacherType;
    }
    return response.data;
  } catch (error) {
    return {} as TeacherType;
  }
});

const getTeacherById = createAsyncThunk(
  "teacher/fetchOne",
  async (id: string) => {
    try {
      const response = await HttpRequest<TeacherType>({
        uri: `/teacher/${id}`,
        method: RESTMethod.Get,
      });
      if (response.code === "error") {
        return {} as TeacherType;
      }
      return response.data;
    } catch (error) {
      return {} as TeacherType;
    }
  }
);

const fetchTeachers = createAsyncThunk(
  "teacher/fetch",
  async ({ limit, page }: { limit: number; page: number }) => {
    try {
      const response = await HttpRequest<PaginatedType<TeacherType>>({
        uri: `/teacher/paginate`,
        method: RESTMethod.Post,
        item: { limit: limit, page: page },
      });
      if (response.code === "error") {
        return {} as PaginatedType<TeacherType>;
      }
      return response.data;
    } catch (error) {
      return {} as PaginatedType<TeacherType>;
    }
  }
);

const updateTeacher = createAsyncThunk(
  "teacher/update",
  async (newTeacher: {
    name: string;
    surname: string;
    jobTitle: string;
    id: string;
    user: { id: string; login: string; password: string };
  }) => {
    try {
      const userResponse = await HttpRequest<TeacherType>({
        uri: `/user/${newTeacher.user.id}`,
        method: RESTMethod.Put,
        item: newTeacher.user,
      });
      if (userResponse.code === "error") {
        return {} as TeacherType;
      }
      const response = await HttpRequest<TeacherType>({
        uri: `/teacher/${newTeacher.id}`,
        method: RESTMethod.Put,
        item: newTeacher,
      });
      if (response.code === "error") {
        return {} as TeacherType;
      }
      return response.data;
    } catch (error) {
      return {} as TeacherType;
    }
  }
);

const createTeacher = createAsyncThunk(
  "teacher/create",
  async (newTeacher: {
    name: string;
    surname: string;
    jobTitle: string;
    login: string;
    password: string;
  }) => {
    try {
      const userResponse = await HttpRequest<{ id: string }>({
        uri: `/user/post`,
        method: RESTMethod.Post,
        item: newTeacher,
      });
      if (userResponse.code === "error") {
        return {} as PaginatedType<TeacherType>;
      }
      const response = await HttpRequest<TeacherType>({
        uri: `/teacher/post`,
        method: RESTMethod.Post,
        item: { ...newTeacher, userId: userResponse.data.id },
      });
      if (response.code === "error") {
        return {} as PaginatedType<TeacherType>;
      }
      return response.data;
    } catch (error) {
      return {} as PaginatedType<TeacherType>;
    }
  }
);

interface TeacherState {
  error: string | null;
  loading: boolean;
  Teachers: PaginatedType<TeacherType>;
  fetchedTeacher: TeacherType;
}

const initialState: TeacherState = {
  error: null,
  loading: false,
  Teachers: {} as PaginatedType<TeacherType>,
  fetchedTeacher: {} as TeacherType,
};

export const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchTeachers
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.Teachers = action.payload;
        state.error = null;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //deleteTeacher
      .addCase(deleteTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //getTeacherById
      .addCase(getTeacherById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeacherById.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchedTeacher = action.payload;
        state.error = null;
      })
      .addCase(getTeacherById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //updateTeacher
      .addCase(updateTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //createTeacher
      .addCase(createTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default teacherSlice.reducer;
export const teacherActions = {
  ...teacherSlice.actions,
  fetchTeachers,
  deleteTeacher,
  getTeacherById,
  updateTeacher,
  createTeacher,
};
