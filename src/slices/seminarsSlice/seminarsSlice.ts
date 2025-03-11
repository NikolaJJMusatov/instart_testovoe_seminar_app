import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getSeminarsApi,
  deleteSeminarApi,
  editSeminarApi
} from '../../utils/seminars-api/seminars-api';
import {
  TDeleteSeminarData,
  TSeminar,
  TEditSeminarData
} from '../../types/types';

interface ISeminarsState {
  seminars: TSeminar[];
  isLoading: boolean;
  error: string | undefined;
}

export const fetchSeminars = createAsyncThunk(
  'seminars/fetchSeminars',
  async () => getSeminarsApi()
);

export const fetchDeleteSeminar = createAsyncThunk(
  'seminars/fetchDeleteSeminar',
  async (data: TDeleteSeminarData) => {
    const result = await deleteSeminarApi(data);
    return result;
  }
);

export const fetchEditSeminar = createAsyncThunk(
  'seminars/fetchEditSeminar',
  async (data: TEditSeminarData) => {
    const result = await editSeminarApi(data);
    return result;
  }
);

export const initialState: ISeminarsState = {
  seminars: [],
  isLoading: false,
  error: undefined
};

const seminarsSlice = createSlice({
  name: 'seminars',
  initialState,
  reducers: {
    clearErrorState: (sliceState) => {
      sliceState.error = undefined;
    },
  },

  selectors: {
    selectSeminars: (sliceState) => sliceState.seminars,
    selectSeminarsIsLoading: (sliceState) => sliceState.isLoading,
    selectSeminarsError: (sliceState) => sliceState.error,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSeminars.pending, (sliceState) => {
        sliceState.isLoading = true;
      })
      .addCase(fetchSeminars.rejected, (sliceState, action) => {
        sliceState.isLoading = false;
        sliceState.error = action.error.message;
      })
      .addCase(fetchSeminars.fulfilled, (sliceState, action) => {
        sliceState.isLoading = false;
        sliceState.seminars = action.payload;
      })
      .addCase(fetchDeleteSeminar.pending, (sliceState) => {
        sliceState.isLoading = true;
      })
      .addCase(fetchDeleteSeminar.rejected, (sliceState, action) => {
        sliceState.isLoading = false;
        sliceState.error = action.error.message;
      })
      .addCase(fetchDeleteSeminar.fulfilled, (sliceState, action) => {
        sliceState.isLoading = false;
        sliceState.seminars = sliceState.seminars.filter(seminar => seminar.id !== action.payload.id)
      })
      .addCase(fetchEditSeminar.pending, (sliceState) => {
        sliceState.isLoading = true;
      })
      .addCase(fetchEditSeminar.rejected, (sliceState, action) => {
        sliceState.isLoading = false;
        sliceState.error = action.error.message;
      })
      .addCase(fetchEditSeminar.fulfilled, (sliceState, action) => {
        sliceState.isLoading = false;
        const index = sliceState.seminars.findIndex(seminar => seminar.id === action.payload.id);
        if (index !== -1) {
          sliceState.seminars[index] = action.payload;
        }
      })
  }
});

export const {
  selectSeminars,
  selectSeminarsIsLoading,
  selectSeminarsError
} =
seminarsSlice.selectors;

export const { clearErrorState } = seminarsSlice.actions;

export default seminarsSlice.reducer;
