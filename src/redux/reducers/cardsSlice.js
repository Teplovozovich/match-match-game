import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 1, cardFont: 'assets/jpg/pig.jpg', cardBack: 'assets/jpg/back.jpg', canFlip: true, isFlipped: false, isMatched: false, groupId: 1 },
  { id: 2, cardFont: 'assets/jpg/rat.jpg', cardBack: 'assets/jpg/back.jpg', canFlip: true, isFlipped: false, isMatched: false, groupId: 2 },
  { id: 3, cardFont: 'assets/jpg/pig.jpg', cardBack: 'assets/jpg/back.jpg', canFlip: true, isFlipped: false, isMatched: false, groupId: 1 },
  { id: 4, cardFont: 'assets/jpg/rat.jpg', cardBack: 'assets/jpg/back.jpg', canFlip: true, isFlipped: false, isMatched: false, groupId: 2 },
  { id: 5, cardFont: 'assets/jpg/pig.jpg', cardBack: 'assets/jpg/back.jpg', canFlip: true, isFlipped: false, isMatched: false, groupId: 3 },
  { id: 6, cardFont: 'assets/jpg/rat.jpg', cardBack: 'assets/jpg/back.jpg', canFlip: true, isFlipped: false, isMatched: false, groupId: 4 },
  { id: 7, cardFont: 'assets/jpg/rat.jpg', cardBack: 'assets/jpg/back.jpg', canFlip: true, isFlipped: false, isMatched: false, groupId: 4 },
  { id: 8, cardFont: 'assets/jpg/pig.jpg', cardBack: 'assets/jpg/back.jpg', canFlip: true, isFlipped: false, isMatched: false, groupId: 3 },
  // Другие карточки...
];

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    flipCard(state, action) {
      state[action.payload - 1].isFlipped = !state[action.payload - 1].isFlipped
      // const { id } = action.payload;
      // const card = state.find(card => card.id === id);

      // if (card && !card.isFlipped && !card.isMatched) {
      //   card.isFlipped = true;
      // }
    },
    matchCards(state, action) {
      // const { groupId } = action.payload;
      // const flippedCards = state.filter(card => card.isFlipped);
      // console.log(state[0].isMatched);

      // if (flippedCards.length === 2) {
      //   console.log("aboba");
      //   const [firstCard, secondCard] = flippedCards;
      //   if (firstCard.image === secondCard.image) {
      //     firstCard.isMatched = true;
      //     secondCard.isMatched = true;
      //   } else {
      //     setTimeout(() => {
      //       firstCard.isFlipped = false;
      //       secondCard.isFlipped = false;
      //     }, 1000); // Задержка перед переворотом обратно
      //   }
      // }
    }
  }
});

export const { flipCard, matchCards } = cardsSlice.actions;
export default cardsSlice.reducer;
