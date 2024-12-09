import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: '', 
};

const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { changeFilter } = slice.actions;

export default slice.reducer;