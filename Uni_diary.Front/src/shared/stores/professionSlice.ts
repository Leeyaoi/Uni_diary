import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HttpRequest } from "../../api/GenericApi";
import { RESTMethod } from "../types/RESTMethodEnum";
import ProfessionType from "../types/profession";

const fetchProfession = createAsyncThunk(
  "profession/fetch",
  async ({
    limit,
    page,
    facultyId,
  }: {
    limit: number;
    page: number;
    facultyId: string;
  }) => {
    if (facultyId == "") {
      return;
    }
    try {
      const response = await HttpRequest<[]>({
        uri: `/profession/paginate`,
        method: RESTMethod.Post,
        item: { limit: limit, page: page, facultyId: facultyId },
      });
      if (response.code === "error") {
        return null;
      }
      return response.data;
    } catch (error) {
      return null;
    }
  }
);

interface ProfessionState {
  error: string | null;
  loading: boolean;
  professions: ProfessionType[];
}

const initialState: ProfessionState = {
  error: null,
  loading: false,
  professions: [],
};

export const professionSlice = createSlice({
  name: "profession",
  initialState,
  reducers: {
    setProfessions: (state, action: PayloadAction<ProfessionType[]>) => {
      state.professions = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfession.fulfilled, (state, action) => {
        state.loading = false;
        professionSlice.caseReducers.setProfessions(
          state,
          action as PayloadAction<ProfessionType[]>
        );
      })
      .addCase(fetchProfession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default professionSlice.reducer;
export const professionActions = {
  ...professionSlice.actions,
  fetchProfession,
};
