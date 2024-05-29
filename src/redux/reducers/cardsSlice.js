import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  imagePathsBackSideCard, imagePathsBackgrounds,
  imagePathsRodent, imagePathsFood,
} from './images.js';

const initialState = {
  cards: [{
    id: null,
    cardFont: null,
    cardBack: null,
    canFlip: null,
    isFlipped: null,
    isMatched: null,
    groupId: null,
  }
  ],
  imagesGroups: [imagePathsRodent, imagePathsFood,],
  chosenFrontCardSide: null,
  backsCardSide: [],
  chosenBackCardSide: null,
  backgrounds: imagePathsBackgrounds,
  chosenBackground: null,
  isRotationDelay: false,
  isGameGoingOn: false,
  sumCards: 10,
  sumMotions: 0,
  sumMatched: 0,
};

function importAll(r) {
  return r.keys().map(r);
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    firstRender(state) {
      if (state.chosenBackCardSide !== null) {

      } else {
        state.chosenBackCardSide = state.cards[0].cardBack
      }
    },
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
      console.log(state.cards[0].cardBack);
      if (state.chosenBackCardSide !== null) {

      } else {
        state.chosenBackCardSide = state.cards[0].cardBack
      }

      state.sumMotions += 1
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
          state.sumMatched += 1;
        } else {

        }
      }
    },
    setCards(state, action) {
      state.cards = action.payload
    },
    setSumCards(state, action) {
      state.sumCards = action.payload
    },
    setBackSideCard(state, action) {
      state.chosenBackCardSide = action.payload;
      state.cards = state.cards.map((card) => ({
        ...card,
        cardBack: action.payload,
      }));
    },
    setSelectedBackgroundSideCard(state, action) {
      state.chosenBackground = action.payload;
    },
    setFrontSideCard(state, action) {
      state.chosenFrontCardSide = action.payload;
    },
    shuffleCards: (state) => {
      state.sumMatched = 0;
      state.sumMotions = 0;
      state.isGameGoingOn = true;

      const backCardSide = state.chosenBackCardSide || state.backsCardSide[Math.floor(Math.random() * state.backsCardSide.length)];
      state.backsCardSide = imagePathsBackSideCard;

      let chosenFrontCardSide = state.chosenFrontCardSide;
      if (state.chosenFrontCardSide === null) {
        chosenFrontCardSide = state.imagesGroups[Math.floor(Math.random() * state.imagesGroups.length)]
      }
      
      if (state.chosenBackground === null) {
        state.chosenBackground = state.backgrounds[Math.floor(Math.random() * state.backgrounds.length)]
      }

      const shuffledPairs = generateRandomPairs(state.sumCards, chosenFrontCardSide);
      state.cards = shuffledPairs.map((pair, index) => ({
        id: index + 1,
        cardFont: pair.frontImage,
        cardBack: backCardSide,
        canFlip: true,
        isFlipped: false,
        isMatched: false,
        groupId: pair.groupId,
      }));
    },
  },
});

const generateRandomPairs = (numPairs = 10, images) => {
  const pairs = [];
  // const imagePaths = imagePathsRodent.slice();
  const imagePaths = images.slice();

  for (let i = 0; i < numPairs; i++) {
    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    const frontImage = imagePaths.splice(randomIndex, 1)[0]; // Удаляем элемент из копии
    pairs.push({ frontImage, groupId: i + 1 });
    pairs.push({ frontImage, groupId: i + 1 });
  }

  return shuffleArray(pairs);
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getCounterThunk = (personalAccount) => async (dispatch) => {
  console.log('aboba');
};

export const { setCards, flipCard, matchCards, enableFlipCard, shuffleCards,
  setBackSideCard, setSumCards, setFrontSideCard, setSelectedBackgroundSideCard} = cardsSlice.actions;
export default cardsSlice.reducer;
