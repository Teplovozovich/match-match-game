import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { imagePathsBackSideCard, imagePathsRodent } from './images.js';

const initialState = {
  selectedBack: null,
  cardCount: '',
  cardCountFromBtn: 0,
};


const cardsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSelectedBack(state, action) {
      state.selectedBack = action.payload
    },
    setCardCount(state, action) {
      state.cardCount = action.payload
      state.cardCountFromBtn = 0
    },
    setCardCountFromBtn(state, action) {
      state.cardCountFromBtn = action.payload
      state.cardCount = ''
    },
  },
});



export const { setSelectedBack, setCardCount, setCardCountFromBtn } = cardsSlice.actions;
export default cardsSlice.reducer;
