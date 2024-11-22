import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HttpRequest } from "../../api/GenericApi";
import { RESTMethod } from "../types/RESTMethodEnum";
import ClassType from "../types/class";
import PaginatedType from "../types/paginatedModel";

const fetchTeachersClasses = createAsyncThunk(
  "class/teacher",
  async ({
    teacherId,
    bottomWeek,
  }: {
    teacherId: string;
    bottomWeek: boolean;
  }) => {
    try {
      const response = await HttpRequest<ClassType[][]>({
        uri: `/class/teacher/${teacherId}/${bottomWeek}`,
        method: RESTMethod.Get,
      });
      if (response.code === "error") {
        return [] as ClassType[][];
      }
      return response.data;
    } catch (error) {
      return [] as ClassType[][];
    }
  }
);

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
      const conflictResponse = await HttpRequest<ClassType[] | null>({
        uri: `/class/findConflicts`,
        method: RESTMethod.Post,
        item: newClass,
      });
      if (conflictResponse.code === "error") {
        return [];
      }
      if (
        Array.isArray(conflictResponse.data) &&
        (conflictResponse.data[0] != null || conflictResponse.data[1] != null)
      ) {
        return conflictResponse.data;
      }
      const response = await HttpRequest<ClassType>({
        uri: `/class/post`,
        method: RESTMethod.Post,
        item: { ...newClass },
      });
      if (response.code === "error") {
        return [];
      }
      return conflictResponse.data;
    } catch (error) {
      return [];
    }
  }
);

interface ClassState {
  error: string | null;
  loading: boolean;
  teachersClasses: ClassType[][];
  fetchedClass: ClassType;
  selectedClass: ClassType;
  conflicts: (ClassType | null)[];
}

const initialState: ClassState = {
  error: null,
  loading: false,
  teachersClasses: [],
  fetchedClass: {} as ClassType,
  selectedClass: {} as ClassType,
  conflicts: [],
};

export const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    setClass: (state, action: PayloadAction<ClassType>) => {
      state.selectedClass = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
        state.conflicts = action.payload as (ClassType | null)[];
        state.error = null;
      })
      .addCase(createClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //fetchTeachersClasses
      .addCase(fetchTeachersClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeachersClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.teachersClasses = action.payload;
      })
      .addCase(fetchTeachersClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default classSlice.reducer;
export const classActions = {
  ...classSlice.actions,
  deleteClass,
  getClassById,
  updateClass,
  createClass,
  fetchTeachersClasses,
};
