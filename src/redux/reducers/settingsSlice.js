import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { imagePathsBackSideCard, imagePathsRodent } from './images.js';

const initialState = {
  selectedBack: null,
  selectedFront: null,
  cardCount: '',
  amountButtons: [
    {
      style: '',
      amount: 3,
    },
    {
      style: '',
      amount: 5,
    },
    {
      style: '',
      amount: 10,
    },
    {
      style: '',
      amount: 12,
    },
    {
      style: '',
      amount: 15,
    },
    {
      style: '',
      amount: 20,
    },

  ],
  cardCountFromBtn: false,
};


const cardsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSelectedBack(state, action) {
      state.selectedBack = action.payload
    },
    setSelectedFront(state, action) {
      state.selectedFront = action.payload
      console.log(action.payload);
    },
    setCardCount(state, action) {
      state.cardCount = action.payload
      state.amountButtons = state.amountButtons.map((button) => {
        return { ...button, style: "" };
      });
      if (action.payload === '') {
        state.cardCountFromBtn = false
      } else {
        state.cardCountFromBtn = 0
      }
    },
    setCardCountFromBtn(state, action) {
      state.amountButtons = state.amountButtons.map((button) => {
        if (+action.payload === button.amount) {
          console.log("aboba");
          return { ...button, style: "selected" };
        } else {
          return { ...button, style: "" };
        }
      });
      state.cardCountFromBtn = action.payload;
      state.cardCount = "";
    }
  },
});



export const { setSelectedBack, setCardCount, setCardCountFromBtn, setSelectedFront } = cardsSlice.actions;
export default cardsSlice.reducer;
