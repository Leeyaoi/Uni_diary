import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HttpRequest } from "../../api/GenericApi";
import { RESTMethod } from "../types/RESTMethodEnum";
import TimetableType from "../types/timetable";

const fetchTimetables = createAsyncThunk(
  "timetable/fetch",
  async ({ groupId, bottomWeek }: { groupId: string; bottomWeek: boolean }) => {
    try {
      if (groupId == "") {
        return [];
      }
      const response = await HttpRequest<TimetableType[]>({
        uri: `/timetable/group/${groupId}/${bottomWeek}`,
        method: RESTMethod.Get,
      });
      if (response.code === "error") {
        return [];
      }
      return response.data;
    } catch (error) {
      return [];
    }
  }
);

interface TimetableState {
  error: string | null;
  loading: boolean;
  Timetables: TimetableType[];
}

const initialState: TimetableState = {
  error: null,
  loading: false,
  Timetables: [],
};

export const timetableSlice = createSlice({
  name: "timetable",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchTimetables
      .addCase(fetchTimetables.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTimetables.fulfilled, (state, action) => {
        state.loading = false;
        state.Timetables = action.payload;
        state.error = null;
      })
      .addCase(fetchTimetables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default timetableSlice.reducer;
export const timetableActions = {
  ...timetableSlice.actions,
  fetchTimetables,
};
