import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { imagePathsBackSideCard, imagePathsRodent } from './images.js';

const initialState = {
  selectedBack: null,
  cardCount: '',
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
    },
  },
});



export const { setSelectedBack, setCardCount } = cardsSlice.actions;
export default cardsSlice.reducer;
