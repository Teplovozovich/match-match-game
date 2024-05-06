import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 1, image: 'assets/jpg/pig.jpg', isFlipped: false, isMatched: false, groupId: 1 },
  { id: 2, image: 'assets/jpg/rat.jpg', isFlipped: false, isMatched: false, groupId: 2 },
  { id: 3, image: 'assets/jpg/pig.jpg', isFlipped: false, isMatched: false, groupId: 1 },
  { id: 4, image: 'assets/jpg/rat.jpg', isFlipped: false, isMatched: false, groupId: 2 },
  { id: 5, image: 'assets/jpg/pig.jpg', isFlipped: false, isMatched: false, groupId: 3 },
  { id: 6, image: 'assets/jpg/rat.jpg', isFlipped: false, isMatched: false, groupId: 4 },
  { id: 7, image: 'assets/jpg/rat.jpg', isFlipped: false, isMatched: false, groupId: 4 },
  { id: 8, image: 'assets/jpg/pig.jpg', isFlipped: false, isMatched: false, groupId: 3 },
  // Другие карточки...
];

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    flipCard(state, action) {
      const { id } = action.payload;
      const card = state.find(card => card.id === id);

      if (card && !card.isFlipped && !card.isMatched) {
        card.isFlipped = true;
      }
    },
    matchCards(state, action) {
      const { groupId } = action.payload;
      const flippedCards = state.filter(card => card.isFlipped && card.groupId === groupId);

      if (flippedCards.length === 2) {
        const [firstCard, secondCard] = flippedCards;
        if (firstCard.image === secondCard.image) {
          firstCard.isMatched = true;
          secondCard.isMatched = true;
        } else {
          setTimeout(() => {
            firstCard.isFlipped = false;
            secondCard.isFlipped = false;
          }, 1000); // Задержка перед переворотом обратно
        }
      }
    }
  }
});

export const { flipCard, matchCards } = cardsSlice.actions;
export default cardsSlice.reducer;
