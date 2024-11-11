import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HttpRequest } from "../../api/GenericApi";
import { RESTMethod } from "../types/RESTMethodEnum";
import TeacherCourseType from "../types/teacherCourse";
import PaginatedType from "../types/paginatedModel";

const deleteTeacherCourse = createAsyncThunk(
  "teacherCourse/delete",
  async (id: string) => {
    try {
      const response = await HttpRequest<TeacherCourseType>({
        uri: `/teacherCourse/${id}`,
        method: RESTMethod.Delete,
      });
      if (response.code === "error") {
        return {} as TeacherCourseType;
      }
      return response.data;
    } catch (error) {
      return {} as TeacherCourseType;
    }
  }
);

const getTeacherCourseById = createAsyncThunk(
  "teacherCourse/fetchOne",
  async (id: string) => {
    try {
      const response = await HttpRequest<TeacherCourseType>({
        uri: `/teacherCourse/${id}`,
        method: RESTMethod.Get,
      });
      if (response.code === "error") {
        return {} as TeacherCourseType;
      }
      return response.data;
    } catch (error) {
      return {} as TeacherCourseType;
    }
  }
);

const fetchTeacherCourses = createAsyncThunk(
  "teacherCourse/fetch",
  async ({
    limit,
    page,
    courseId,
  }: {
    limit: number;
    page: number;
    courseId: string;
  }) => {
    try {
      if (courseId == "") {
        return {} as PaginatedType<TeacherCourseType>;
      }
      const response = await HttpRequest<PaginatedType<TeacherCourseType>>({
        uri: `/teacherCourse/paginate`,
        method: RESTMethod.Post,
        item: { limit: limit, page: page, courseId: courseId },
      });
      if (response.code === "error") {
        return {} as PaginatedType<TeacherCourseType>;
      }
      return response.data;
    } catch (error) {
      return {} as PaginatedType<TeacherCourseType>;
    }
  }
);

const updateTeacherCourse = createAsyncThunk(
  "teacherCourse/update",
  async (newTeacherCourse: {
    id: string;
    teacherId: string;
    courseId: string;
    hours: number;
  }) => {
    try {
      const response = await HttpRequest<TeacherCourseType>({
        uri: `/teacherCourse/${newTeacherCourse.id}`,
        method: RESTMethod.Put,
        item: newTeacherCourse,
      });
      if (response.code === "error") {
        return {} as TeacherCourseType;
      }
      return response.data;
    } catch (error) {
      return {} as TeacherCourseType;
    }
  }
);

const createTeacherCourse = createAsyncThunk(
  "teacherCourse/create",
  async (newTeacherCourse: {
    teacherId: string;
    courseId: string;
    hours: number;
  }) => {
    try {
      if (!newTeacherCourse.teacherId || !newTeacherCourse.courseId) {
        return {} as PaginatedType<TeacherCourseType>;
      }
      const response = await HttpRequest<TeacherCourseType>({
        uri: `/teacherCourse/post`,
        method: RESTMethod.Post,
        item: newTeacherCourse,
      });
      if (response.code === "error") {
        return {} as PaginatedType<TeacherCourseType>;
      }
      return response.data;
    } catch (error) {
      return {} as PaginatedType<TeacherCourseType>;
    }
  }
);

interface TeacherCourseState {
  error: string | null;
  loading: boolean;
  TeacherCourses: PaginatedType<TeacherCourseType>;
  fetchedTeacherCourse: TeacherCourseType;
}

const initialState: TeacherCourseState = {
  error: null,
  loading: false,
  TeacherCourses: {} as PaginatedType<TeacherCourseType>,
  fetchedTeacherCourse: {} as TeacherCourseType,
};

export const teacherCourseSlice = createSlice({
  name: "teacherCourse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchTeacherCourses
      .addCase(fetchTeacherCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeacherCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.TeacherCourses = action.payload;
        state.error = null;
      })
      .addCase(fetchTeacherCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //deleteTeacherCourse
      .addCase(deleteTeacherCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeacherCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteTeacherCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //getTeacherCourseById
      .addCase(getTeacherCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeacherCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchedTeacherCourse = action.payload;
        state.error = null;
      })
      .addCase(getTeacherCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //updateTeacherCourse
      .addCase(updateTeacherCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeacherCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateTeacherCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //createTeacherCourse
      .addCase(createTeacherCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeacherCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createTeacherCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default teacherCourseSlice.reducer;
export const TeacherCourseActions = {
  ...teacherCourseSlice.actions,
  fetchTeacherCourses,
  deleteTeacherCourse,
  getTeacherCourseById,
  updateTeacherCourse,
  createTeacherCourse,
};
