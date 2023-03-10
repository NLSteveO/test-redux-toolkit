import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 1
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value++;
    },
    decrement: (state) => {
      state.value--;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    setValue: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { increment, decrement, incrementByAmount, setValue } = counterSlice.actions;

export default counterSlice.reducer;
