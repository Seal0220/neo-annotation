// menuSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: true,      // 控制 Menu 是否顯示
  isFullScreen: false,  // 控制是否全屏顯示
  isScrollBarInfo: true, // 控制是否顯示滾動資訊
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setVisibility(state, action) {
      state.isVisible = action.payload;
    },
    setFullScreen(state, action) {
      state.isFullScreen = action.payload;
    },
    setIsScrollBarInfo(state, action) {
      state.isScrollBarInfo = action.payload;
    },
  },
});

export const { setVisibility, setFullScreen, setIsScrollBarInfo } = menuSlice.actions;
export default menuSlice.reducer;
