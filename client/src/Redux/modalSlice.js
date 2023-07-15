import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
  },
  reducers: {
   handleOpen: (state) => {
      state.isOpen=true
    },
    handleClose: (state) => {
     state.isOpen=false
    },
  },
});

export default modalSlice

