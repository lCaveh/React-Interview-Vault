import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Application } from './types';

export const initialState: Application = {
  showAppLoader: false,
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setShowAppLoader(state, action: PayloadAction<boolean>): any {
      state.showAppLoader = action.payload;
    },
  },
});

export const { setShowAppLoader } = applicationSlice.actions;
export default applicationSlice.reducer;
