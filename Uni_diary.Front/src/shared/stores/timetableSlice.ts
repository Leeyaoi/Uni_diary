import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HttpRequest } from "../../api/GenericApi";
import { RESTMethod } from "../types/RESTMethodEnum";
import TimetableType from "../types/timetable";

const fetchTimetables = createAsyncThunk(
  "timetable/fetch",
  async ({ groupId }: { groupId: string }) => {
    try {
      if (groupId == "") {
        return [];
      }
      const responseUp = await HttpRequest<TimetableType[]>({
        uri: `/timetable/group/${groupId}/false`,
        method: RESTMethod.Get,
      });
      const responseBottom = await HttpRequest<TimetableType[]>({
        uri: `/timetable/group/${groupId}/true`,
        method: RESTMethod.Get,
      });
      if (responseUp.code === "error" || responseBottom.code === "error") {
        return [];
      }
      return [responseUp.data, responseBottom.data];
    } catch (error) {
      return [];
    }
  }
);

interface TimetableState {
  error: string | null;
  loading: boolean;
  upTimetables: TimetableType[];
  bottomTimetables: TimetableType[];
}

const initialState: TimetableState = {
  error: null,
  loading: false,
  upTimetables: [],
  bottomTimetables: [],
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
        [state.upTimetables, state.bottomTimetables] = action.payload;
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
