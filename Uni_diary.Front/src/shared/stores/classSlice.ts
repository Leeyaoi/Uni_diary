import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HttpRequest } from "../../api/GenericApi";
import { RESTMethod } from "../types/RESTMethodEnum";
import ClassType from "../types/class";
import PaginatedType from "../types/paginatedModel";

const findClass = createAsyncThunk("class/search", async (query: string) => {
  try {
    const response = await HttpRequest<ClassType[]>({
      uri: `/class/query/${query}`,
      method: RESTMethod.Get,
    });
    if (response.code === "error") {
      return [] as ClassType[];
    }
    return response.data;
  } catch (error) {
    return [] as ClassType[];
  }
});

const deleteClass = createAsyncThunk("class/delete", async (id: string) => {
  try {
    const response = await HttpRequest<ClassType>({
      uri: `/class/${id}`,
      method: RESTMethod.Delete,
    });
    if (response.code === "error") {
      return {} as ClassType;
    }
    return response.data;
  } catch (error) {
    return {} as ClassType;
  }
});

const getClassById = createAsyncThunk("class/fetchOne", async (id: string) => {
  try {
    const response = await HttpRequest<ClassType>({
      uri: `/class/${id}`,
      method: RESTMethod.Get,
    });
    if (response.code === "error") {
      return {} as ClassType;
    }
    return response.data;
  } catch (error) {
    return {} as ClassType;
  }
});

const fetchClasss = createAsyncThunk(
  "class/fetch",
  async ({ limit, page }: { limit: number; page: number }) => {
    try {
      const response = await HttpRequest<PaginatedType<ClassType>>({
        uri: `/class/paginate`,
        method: RESTMethod.Post,
        item: { limit: limit, page: page },
      });
      if (response.code === "error") {
        return {} as PaginatedType<ClassType>;
      }
      return response.data;
    } catch (error) {
      return {} as PaginatedType<ClassType>;
    }
  }
);

const updateClass = createAsyncThunk(
  "class/update",
  async (newClass: {
    building: number;
    hall: number;
    fullGroup: boolean;
    firstHalf: boolean;
    number: number;
    teacherId: string;
    courseId: string;
    timetableId: string;
    id: string;
  }) => {
    try {
      const response = await HttpRequest<ClassType>({
        uri: `/class/${newClass.id}`,
        method: RESTMethod.Put,
        item: newClass,
      });
      if (response.code === "error") {
        return {} as ClassType;
      }
      return response.data;
    } catch (error) {
      return {} as ClassType;
    }
  }
);

const createClass = createAsyncThunk(
  "class/create",
  async (newClass: {
    building: number;
    hall: number;
    fullGroup: boolean;
    firstHalf: boolean;
    number: number;
    forBothWeeks: boolean;
    teacherId: string;
    courseId: string;
    timetableId: string;
  }) => {
    try {
      const conflictResponse = await HttpRequest<ClassType[]>({
        uri: `/class/findConflicts`,
        method: RESTMethod.Post,
        item: newClass,
      });
      if (conflictResponse.code === "error") {
        return {} as PaginatedType<ClassType>;
      }
      if (conflictResponse.data.length > 0) {
        return conflictResponse.data;
      }
      const response = await HttpRequest<ClassType>({
        uri: `/class/post`,
        method: RESTMethod.Post,
        item: { ...newClass },
      });
      if (response.code === "error") {
        return {} as PaginatedType<ClassType>;
      }
      return response.data;
    } catch (error) {
      return {} as PaginatedType<ClassType>;
    }
  }
);

interface ClassState {
  error: string | null;
  loading: boolean;
  Classs: PaginatedType<ClassType>;
  foundClasss: ClassType[];
  fetchedClass: ClassType;
}

const initialState: ClassState = {
  error: null,
  loading: false,
  foundClasss: [],
  Classs: {} as PaginatedType<ClassType>,
  fetchedClass: {} as ClassType,
};

export const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchClasss
      .addCase(fetchClasss.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClasss.fulfilled, (state, action) => {
        state.loading = false;
        state.Classs = action.payload;
        state.error = null;
      })
      .addCase(fetchClasss.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //deleteClass
      .addCase(deleteClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //getClassById
      .addCase(getClassById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClassById.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchedClass = action.payload;
        state.error = null;
      })
      .addCase(getClassById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //updateClass
      .addCase(updateClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //createClass
      .addCase(createClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //findClass
      .addCase(findClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findClass.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.foundClasss = action.payload;
      })
      .addCase(findClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default classSlice.reducer;
export const classActions = {
  ...classSlice.actions,
  fetchClasss,
  deleteClass,
  getClassById,
  updateClass,
  createClass,
  findClass,
};
