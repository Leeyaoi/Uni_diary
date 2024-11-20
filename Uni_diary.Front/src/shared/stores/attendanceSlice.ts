import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HttpRequest } from "../../api/GenericApi";
import { RESTMethod } from "../types/RESTMethodEnum";
import { Dayjs } from "dayjs";
import StudentType from "../types/student";

const postAttendance = createAsyncThunk(
  "attendance/post",
  async ({
    dateWhen,
    students,
    courseId,
  }: {
    dateWhen: Dayjs;
    students: StudentType[];
    courseId: string;
  }) => {
    const date = dateWhen.toDate().toISOString().split("T")[0];
    try {
      const res = await HttpRequest({
        uri: `/attendance/group/${date}/${courseId}`,
        method: RESTMethod.Delete,
      });
      students.forEach(async (student) => {
        const response = await HttpRequest({
          uri: `/attendance/post`,
          method: RESTMethod.Post,
          item: {
            dateWhen: date,
            studentId: student.id,
            courseId,
          },
        });
        if (response.code === "error") {
          return [];
        }
      });
      return [];
    } catch (error) {
      return [];
    }
  }
);

const getAttendance = createAsyncThunk(
  "attendance/get",
  async ({ dateWhen, courseId }: { dateWhen: Dayjs; courseId: string }) => {
    const date = dateWhen.toDate().toISOString().split("T")[0];
    try {
      const response = await HttpRequest({
        uri: `/attendance/group/${date}/${courseId}`,
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

interface AttendanceState {
  error: string | null;
  loading: boolean;
  AttendedStudents: StudentType[];
}

const initialState: AttendanceState = {
  error: null,
  loading: false,
  AttendedStudents: [],
};

export const AttendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //postAttendance
      .addCase(postAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(postAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //getAttendance
      .addCase(getAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.AttendedStudents = action.payload as StudentType[];
      })
      .addCase(getAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default AttendanceSlice.reducer;
export const attendanceActions = {
  ...AttendanceSlice.actions,
  postAttendance,
  getAttendance,
};
