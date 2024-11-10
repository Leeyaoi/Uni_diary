import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HttpRequest } from "../../api/GenericApi";
import { RESTMethod } from "../types/RESTMethodEnum";
import GroupCourseType from "../types/groupCourse";
import PaginatedType from "../types/paginatedModel";

const deleteGroupCourse = createAsyncThunk(
  "groupCourse/delete",
  async (id: string) => {
    try {
      const response = await HttpRequest<GroupCourseType>({
        uri: `/groupCourse/${id}`,
        method: RESTMethod.Delete,
      });
      if (response.code === "error") {
        return {} as GroupCourseType;
      }
      return response.data;
    } catch (error) {
      return {} as GroupCourseType;
    }
  }
);

const getGroupCourseById = createAsyncThunk(
  "groupCourse/fetchOne",
  async (id: string) => {
    try {
      const response = await HttpRequest<GroupCourseType>({
        uri: `/groupCourse/${id}`,
        method: RESTMethod.Get,
      });
      if (response.code === "error") {
        return {} as GroupCourseType;
      }
      return response.data;
    } catch (error) {
      return {} as GroupCourseType;
    }
  }
);

const fetchGroupCourses = createAsyncThunk(
  "groupCourse/fetch",
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
      const response = await HttpRequest<PaginatedType<GroupCourseType>>({
        uri: `/groupCourse/paginate`,
        method: RESTMethod.Post,
        item: { limit: limit, page: page, courseId: courseId },
      });
      if (response.code === "error") {
        return {} as PaginatedType<GroupCourseType>;
      }
      return response.data;
    } catch (error) {
      return {} as PaginatedType<GroupCourseType>;
    }
  }
);

const updateGroupCourse = createAsyncThunk(
  "groupCourse/update",
  async (newGroupCourse: {
    id: string;
    groupId: string;
    courseId: string;
    hours: number;
  }) => {
    try {
      const response = await HttpRequest<GroupCourseType>({
        uri: `/groupCourse/${newGroupCourse.id}`,
        method: RESTMethod.Put,
        item: newGroupCourse,
      });
      if (response.code === "error") {
        return {} as GroupCourseType;
      }
      return response.data;
    } catch (error) {
      return {} as GroupCourseType;
    }
  }
);

const createGroupCourse = createAsyncThunk(
  "groupCourse/create",
  async (newGroupCourse: {
    groupId: string;
    courseId: string;
    hours: number;
  }) => {
    try {
      const response = await HttpRequest<GroupCourseType>({
        uri: `/groupCourse/post`,
        method: RESTMethod.Post,
        item: newGroupCourse,
      });
      if (response.code === "error") {
        return {} as PaginatedType<GroupCourseType>;
      }
      return response.data;
    } catch (error) {
      return {} as PaginatedType<GroupCourseType>;
    }
  }
);

interface GroupCourseState {
  error: string | null;
  loading: boolean;
  GroupCourses: PaginatedType<GroupCourseType>;
  fetchedGroupCourse: GroupCourseType;
}

const initialState: GroupCourseState = {
  error: null,
  loading: false,
  GroupCourses: {} as PaginatedType<GroupCourseType>,
  fetchedGroupCourse: {} as GroupCourseType,
};

export const groupCourseSlice = createSlice({
  name: "groupCourse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchGroupCourses
      .addCase(fetchGroupCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroupCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.GroupCourses = action.payload;
        state.error = null;
      })
      .addCase(fetchGroupCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //deleteGroupCourse
      .addCase(deleteGroupCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGroupCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteGroupCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //getGroupCourseById
      .addCase(getGroupCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGroupCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchedGroupCourse = action.payload;
        state.error = null;
      })
      .addCase(getGroupCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //updateGroupCourse
      .addCase(updateGroupCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGroupCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateGroupCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //createGroupCourse
      .addCase(createGroupCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGroupCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createGroupCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default groupCourseSlice.reducer;
export const GroupCourseActions = {
  ...groupCourseSlice.actions,
  fetchGroupCourses,
  deleteGroupCourse,
  getGroupCourseById,
  updateGroupCourse,
  createGroupCourse,
};
