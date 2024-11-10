import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HttpRequest } from "../../api/GenericApi";
import { RESTMethod } from "../types/RESTMethodEnum";
import CourseType from "../types/course";
import PaginatedType from "../types/paginatedModel";

const deleteCourse = createAsyncThunk("course/delete", async (id: string) => {
  try {
    const response = await HttpRequest<CourseType>({
      uri: `/course/${id}`,
      method: RESTMethod.Delete,
    });
    if (response.code === "error") {
      return {} as CourseType;
    }
    return response.data;
  } catch (error) {
    return {} as CourseType;
  }
});

const getCourseById = createAsyncThunk(
  "course/fetchOne",
  async (id: string) => {
    try {
      const response = await HttpRequest<CourseType>({
        uri: `/course/${id}`,
        method: RESTMethod.Get,
      });
      if (response.code === "error") {
        return {} as CourseType;
      }
      return response.data;
    } catch (error) {
      return {} as CourseType;
    }
  }
);

const fetchCourses = createAsyncThunk("course/fetch", async (query: string) => {
  try {
    const response = await HttpRequest<PaginatedType<CourseType>>({
      uri: `/course/query/${query}`,
      method: RESTMethod.Get,
    });
    if (response.code === "error") {
      return {} as PaginatedType<CourseType>;
    }
    return response.data;
  } catch (error) {
    return {} as PaginatedType<CourseType>;
  }
});

const updateCourse = createAsyncThunk(
  "course/update",
  async (newCourse: { id: string; name: string }) => {
    try {
      const response = await HttpRequest<CourseType>({
        uri: `/course/${newCourse.id}`,
        method: RESTMethod.Put,
        item: newCourse,
      });
      if (response.code === "error") {
        return {} as CourseType;
      }
      return response.data;
    } catch (error) {
      return {} as CourseType;
    }
  }
);

const createCourse = createAsyncThunk(
  "course/create",
  async (newCourse: { name: string }) => {
    try {
      const response = await HttpRequest<CourseType>({
        uri: `/course/post`,
        method: RESTMethod.Post,
        item: { ...newCourse },
      });
      if (response.code === "error") {
        return {} as PaginatedType<CourseType>;
      }
      return response.data;
    } catch (error) {
      return {} as PaginatedType<CourseType>;
    }
  }
);

interface CourseState {
  error: string | null;
  loading: boolean;
  Courses: PaginatedType<CourseType>;
  fetchedCourse: CourseType;
}

const initialState: CourseState = {
  error: null,
  loading: false,
  Courses: {} as PaginatedType<CourseType>,
  fetchedCourse: {} as CourseType,
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchCourses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.Courses = action.payload;
        state.error = null;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //deleteCourse
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //getCourseById
      .addCase(getCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchedCourse = action.payload;
        state.error = null;
      })
      .addCase(getCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //updateCourse
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //createCourse
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default courseSlice.reducer;
export const CourseActions = {
  ...courseSlice.actions,
  fetchCourses,
  deleteCourse,
  getCourseById,
  updateCourse,
  createCourse,
};
