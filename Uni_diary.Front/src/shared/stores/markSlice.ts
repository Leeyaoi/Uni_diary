import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HttpRequest } from "../../api/GenericApi";
import { RESTMethod } from "../types/RESTMethodEnum";
import { Dayjs } from "dayjs";
import MarkType from "../types/mark";
import StudentType from "../types/student";

const postMark = createAsyncThunk(
  "Mark/post",
  async ({
    dateWhen,
    students,
    courseId,
  }: {
    dateWhen: Dayjs;
    students: MarkType[];
    courseId: string;
  }) => {
    const date = dateWhen.toDate().toISOString().split("T")[0];
    try {
      const res = await HttpRequest({
        uri: `/Mark/group/${date}/${courseId}`,
        method: RESTMethod.Delete,
      });
      students.forEach(async (student) => {
        const response = await HttpRequest({
          uri: `/Mark/post`,
          method: RESTMethod.Post,
          item: {
            dateWhen: date,
            studentId: student.studentId,
            mark: student.mark,
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

const getMark = createAsyncThunk(
  "Mark/get",
  async ({ dateWhen, courseId }: { dateWhen: Dayjs; courseId: string }) => {
    const date = dateWhen.toDate().toISOString().split("T")[0];
    try {
      const response = await HttpRequest({
        uri: `/Mark/group/${date}/${courseId}`,
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

const getMarkByCourse = createAsyncThunk(
  "Mark/getByCourse",
  async ({ groupId, courseId }: { groupId: string; courseId: string }) => {
    try {
      const response = await HttpRequest({
        uri: `/Mark//course/${courseId}/group/${groupId}`,
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

interface MarkState {
  error: string | null;
  loading: boolean;
  fetchedMarks: MarkType[];
  studentsWithMarks: StudentType[];
}

const initialState: MarkState = {
  error: null,
  loading: false,
  fetchedMarks: [],
  studentsWithMarks: [],
};

export const MarkSlice = createSlice({
  name: "Mark",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //postMark
      .addCase(postMark.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postMark.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(postMark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //getMark
      .addCase(getMark.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMark.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.fetchedMarks = action.payload as MarkType[];
      })
      .addCase(getMark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //getMarkByCourse
      .addCase(getMarkByCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMarkByCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.studentsWithMarks = action.payload as StudentType[];
      })
      .addCase(getMarkByCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default MarkSlice.reducer;
export const MarkActions = {
  ...MarkSlice.actions,
  postMark,
  getMark,
  getMarkByCourse,
};
