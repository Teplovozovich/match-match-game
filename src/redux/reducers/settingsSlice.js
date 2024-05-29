import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { imagePathsBackSideCard, imagePathsRodent } from './images.js';

const initialState = {
  selectedBack: null,
  selectedBackground: null,
  selectedFront: null,
  selectedShuffleAll: null,
  selectedOnlyNumbers: null,
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
    setSelectedBackground(state, action) {
      state.selectedBackground = action.payload
    },
    setSelectedFront(state, action) {
      state.selectedFront = action.payload
      state.selectedOnlyNumbers = null
      state.selectedShuffleAll = null
    },
    setSelectedShuffleAll(state, action) {
      state.selectedShuffleAll = action.payload
      state.selectedOnlyNumbers = null
      state.selectedFront = null
    },
    setSelectedOnlyNumbers(state, action) {
      state.selectedOnlyNumbers = action.payload
      state.selectedShuffleAll = null
      state.selectedFront = null
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



export const { setSelectedBack, setCardCount, setCardCountFromBtn, setSelectedFront, setSelectedBackground,
  setSelectedShuffleAll, setSelectedOnlyNumbers
 } = cardsSlice.actions;
export default cardsSlice.reducer;
