import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: [],
  isRotationDelay: false
};


const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    flipCard(state, action) {
      state.cards[action.payload - 1].isFlipped = !state.cards[action.payload - 1].isFlipped;
      state.cards[action.payload - 1].canFlip = !state.cards[action.payload - 1].canFlip;
      const currentCoupleFlippedCards = state.cards.filter(card => card.isFlipped && !card.isMatched);
      if (currentCoupleFlippedCards.length === 2) {
        state.cards.forEach((card) => {
          card.canFlip = false;
        });
        state.isRotationDelay = true;
      }
    },
    enableFlipCard(state, action) {
      state.cards.forEach((card) => {
        if (card.isMatched === true) {

        } else {

          card.canFlip = true;
          card.isFlipped = false;
        }
      });
      state.isRotationDelay = false;
    },
    matchCards(state, action) {
      const flippedCards = state.cards.filter(card => card.isFlipped && !card.isMatched);

      if (flippedCards.length === 2) {
        const [firstCard, secondCard] = flippedCards;
        if (firstCard.groupId === secondCard.groupId && firstCard.isMatched === false) {
          firstCard.isMatched = true;
          secondCard.isMatched = true;
          console.log("aboba");
        } else {

        }
      }
    },
    setCards(state, action) {
      state.cards = action.payload
    }
  },
});

export const getCounterThunk = (personalAccount) => async (dispatch) => {
  console.log('aboba');
};

export const { setCards, flipCard, matchCards, enableFlipCard } = cardsSlice.actions;
export default cardsSlice.reducer;
