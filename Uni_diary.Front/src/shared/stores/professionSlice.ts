import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HttpRequest } from "../../api/GenericApi";
import { RESTMethod } from "../types/RESTMethodEnum";
import ProfessionType from "../types/profession";
import PaginatedType from "../types/paginatedModel";

const deleteProfession = createAsyncThunk(
  "profession/delete",
  async (id: string) => {
    try {
      const response = await HttpRequest<ProfessionType>({
        uri: `/profession/${id}`,
        method: RESTMethod.Delete,
      });
      if (response.code === "error") {
        return {} as ProfessionType;
      }
      return response.data;
    } catch (error) {
      return {} as ProfessionType;
    }
  }
);

const getProfessionById = createAsyncThunk(
  "profession/fetchOne",
  async (id: string) => {
    try {
      const response = await HttpRequest<ProfessionType>({
        uri: `/profession/${id}`,
        method: RESTMethod.Get,
      });
      if (response.code === "error") {
        return {} as ProfessionType;
      }
      return response.data;
    } catch (error) {
      return {} as ProfessionType;
    }
  }
);

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
    try {
      const response = await HttpRequest<PaginatedType<ProfessionType>>({
        uri: `/profession/paginate`,
        method: RESTMethod.Post,
        item: { limit: limit, page: page, facultyId: facultyId },
      });
      if (response.code === "error") {
        return {} as PaginatedType<ProfessionType>;
      }
      return response.data;
    } catch (error) {
      return {} as PaginatedType<ProfessionType>;
    }
  }
);

const updateProfession = createAsyncThunk(
  "profession/update",
  async (newProfession: {
    id: string;
    name: string;
    code: string;
    jobTitle: string;
  }) => {
    try {
      const response = await HttpRequest<ProfessionType>({
        uri: `/profession/${newProfession.id}`,
        method: RESTMethod.Put,
        item: newProfession,
      });
      if (response.code === "error") {
        return {} as ProfessionType;
      }
      return response.data;
    } catch (error) {
      return {} as ProfessionType;
    }
  }
);

const createProfession = createAsyncThunk(
  "profession/create",
  async (newProfession: {
    facultyId: string;
    name: string;
    code: string;
    jobTitle: string;
  }) => {
    try {
      const response = await HttpRequest<ProfessionType>({
        uri: `/profession/post`,
        method: RESTMethod.Post,
        item: newProfession,
      });
      if (response.code === "error") {
        return {} as PaginatedType<ProfessionType>;
      }
      return response.data;
    } catch (error) {
      return {} as PaginatedType<ProfessionType>;
    }
  }
);

interface ProfessionState {
  error: string | null;
  loading: boolean;
  professions: PaginatedType<ProfessionType>;
  fetchedProfession: ProfessionType;
}

const initialState: ProfessionState = {
  error: null,
  loading: false,
  professions: {} as PaginatedType<ProfessionType>,
  fetchedProfession: {} as ProfessionType,
};

export const professionSlice = createSlice({
  name: "profession",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchProfession
      .addCase(fetchProfession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfession.fulfilled, (state, action) => {
        state.loading = false;
        state.professions = action.payload;
        state.error = null;
      })
      .addCase(fetchProfession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //deleteProfession
      .addCase(deleteProfession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProfession.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteProfession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //getProfessionById
      .addCase(getProfessionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfessionById.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchedProfession = action.payload;
        state.error = null;
      })
      .addCase(getProfessionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //updateProfession
      .addCase(updateProfession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfession.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProfession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //createProfession
      .addCase(createProfession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProfession.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createProfession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default professionSlice.reducer;
export const professionActions = {
  ...professionSlice.actions,
  fetchProfession,
  deleteProfession,
  getProfessionById,
  updateProfession,
  createProfession,
};
