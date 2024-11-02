import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HttpRequest } from "../../api/GenericApi";
import { RESTMethod } from "../types/RESTMethodEnum";
import FacultyType from "../types/faculty";

const fetchFaculty = createAsyncThunk("faculty/fetch", async () => {
  try {
    const response = await HttpRequest<FacultyType[]>({
      uri: "/faculty",
      method: RESTMethod.Get,
    });
    if (response.code === "error") {
      return null;
    }
    return response.data;
  } catch (error) {
    return null;
  }
});

interface FacultyState {
  error: string | null;
  loading: boolean;
  faculties: FacultyType[];
  currentFacultyId: string;
}

const initialState: FacultyState = {
  error: null,
  loading: false,
  faculties: [],
  currentFacultyId: "",
};

export const facultySlice = createSlice({
  name: "faculty",
  initialState,
  reducers: {
    setFaculties: (state, action: PayloadAction<FacultyType[]>) => {
      state.faculties = action.payload;
      state.error = null;
    },
    setCUrrentFacultyId: (state, action: PayloadAction<string>) => {
      state.currentFacultyId = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaculty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFaculty.fulfilled, (state, action) => {
        state.loading = false;
        facultySlice.caseReducers.setFaculties(
          state,
          action as PayloadAction<FacultyType[]>
        );
      })
      .addCase(fetchFaculty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default facultySlice.reducer;
export const facultyActions = { ...facultySlice.actions, fetchFaculty };
