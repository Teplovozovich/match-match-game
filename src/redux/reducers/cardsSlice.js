import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: [{ id: 1, cardFont: 'assets/jpg/pig.jpg', cardBack: 'assets/jpg/back.jpg', canFlip: true, isFlipped: false, isMatched: false, groupId: 1 },
  { id: 2, cardFont: 'assets/jpg/rat.jpg', cardBack: 'assets/jpg/back.jpg', canFlip: true, isFlipped: false, isMatched: false, groupId: 2 },
  { id: 3, cardFont: 'assets/jpg/pig.jpg', cardBack: 'assets/jpg/back.jpg', canFlip: true, isFlipped: false, isMatched: false, groupId: 1 },
  { id: 4, cardFont: 'assets/jpg/rat.jpg', cardBack: 'assets/jpg/back.jpg', canFlip: true, isFlipped: false, isMatched: false, groupId: 2 },
  { id: 5, cardFont: 'assets/jpg/bobr-kurwa.jpg', cardBack: 'assets/jpg/back.jpg', canFlip: true, isFlipped: false, isMatched: false, groupId: 3 },
  { id: 6, cardFont: 'assets/jpg/belochka.jpg', cardBack: 'assets/jpg/back.jpg', canFlip: true, isFlipped: false, isMatched: false, groupId: 4 },
  { id: 7, cardFont: 'assets/jpg/belochka.jpg', cardBack: 'assets/jpg/back.jpg', canFlip: true, isFlipped: false, isMatched: false, groupId: 4 },
  { id: 8, cardFont: 'assets/jpg/bobr-kurwa.jpg', cardBack: 'assets/jpg/back.jpg', canFlip: true, isFlipped: false, isMatched: false, groupId: 3 },],
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

      // const { groupId } = action.payload;
      const flippedCards = state.cards.filter(card => card.isFlipped && !card.isMatched);

      if (flippedCards.length === 2) {
        // console.log(flippedCards.map(card => card.id)); // Выводит массив идентификаторов карт

        const [firstCard, secondCard] = flippedCards;
        if (firstCard.groupId === secondCard.groupId && firstCard.isMatched === false) {
          firstCard.isMatched = true;
          secondCard.isMatched = true;
          console.log("aboba");
        } else {

        }
      }
    }
  },
});

export const getCounterThunk = (personalAccount) => async (dispatch) => {
  console.log('aboba');
};

export const { flipCard, matchCards, enableFlipCard } = cardsSlice.actions;
export default cardsSlice.reducer;
