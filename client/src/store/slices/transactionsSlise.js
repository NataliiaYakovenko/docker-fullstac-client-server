import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';

const TRANSACTUINS_SLICE_NAME = 'transactions';

const initialState = {
  transactions: [],
  isFeatching: false,
  error: null,
};

export const getTransactions = createAsyncThunk(
  `${TRANSACTUINS_SLICE_NAME}/get`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await restController.getTransactions();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const transactionsSlice = createSlice({
  name: TRANSACTUINS_SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTransactions.pending,(state,{payload})=>{
      state.isFeatching = true
      state.error = null
    })
    builder.addCase(getTransactions.fulfilled,(state,{payload})=>{
      state.isFeatching = false
      state.transactions = [...payload]
    })
    builder.addCase(getTransactions.rejected,(state,{payload})=>{
      state.isFeatching = false
      state.error = payload
    })
  },
});

const { reducer } = transactionsSlice;

export default reducer;
