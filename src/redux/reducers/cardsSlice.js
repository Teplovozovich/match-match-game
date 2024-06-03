import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  imagePathsBackSideCard, imagePathsBackgrounds,
  imagePathsRodent, imagePathsFood,
} from './images.js';

const initialState = {
  flippedCards: [],
  isGameWithComputer: true,
  isComputerMotion: false,
  isComputerFirstMotion: true,
  sumComputerMotions: 0,
  sumComputerMatched: 0,
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
  sumMyMotions: 0,
  sumMyMatched: 0,
};

function importAll(r) {
  return r.keys().map(r);
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    flipCard(state, action) {
      const payload = action.payload - 1;
      if (state.isGameWithComputer) {

        if (state.isComputerMotion) {

          const matchedPair = state.flippedCards.find(card1 => {
            return state.flippedCards.some(card2 => {
              return card1.id !== card2.id && 
                     card1.groupId === card2.groupId && 
                     state.cards[card1.id].isMatched === false && 
                     state.cards[card2.id].isMatched === false;
            });
          });
          if (matchedPair) {
            debugger
            console.log(matchedPair);
          }
          const random = Math.floor(Math.random() * state.cards.length)
          state.cards[random].isFlipped = true
          if (!state.flippedCards.some(card => card.id === random)) {
            state.flippedCards = [...state.flippedCards, { id: random, groupId: state.cards[random].groupId, isMatched: state.cards[random].isMatched}]
          }

          
          const currentCoupleFlippedCards = state.cards.filter(card => card.isFlipped && !card.isMatched);
          if (currentCoupleFlippedCards.length === 2) {
            state.cards.forEach((card) => {
              card.canFlip = false;
            });
            state.isRotationDelay = true;
          }
          state.sumComputerMotions += 1








        } else {
          state.cards[payload].isFlipped = !state.cards[payload].isFlipped;
          state.cards[payload].canFlip = !state.cards[payload].canFlip;

          if (!state.flippedCards.some(card => card.id === payload)) {
            state.flippedCards = [...state.flippedCards, { id: payload, groupId: state.cards[payload].groupId, isMatched: state.cards[payload].isMatched}]
          }

          const currentCoupleFlippedCards = state.cards.filter(card => card.isFlipped && !card.isMatched);
          if (currentCoupleFlippedCards.length === 2) {
            state.cards.forEach((card) => {
              card.canFlip = false;
            });
            state.isRotationDelay = true;
          }
          state.sumMyMotions += 1
        }




      } else {
        state.cards[payload].isFlipped = !state.cards[payload].isFlipped;
        state.cards[payload].canFlip = !state.cards[payload].canFlip;
        const currentCoupleFlippedCards = state.cards.filter(card => card.isFlipped && !card.isMatched);

        if (currentCoupleFlippedCards.length === 2) {
          state.cards.forEach((card) => {
            card.canFlip = false;
          });
          state.isRotationDelay = true;
        }
        state.sumMyMotions += 1
      }


      if (state.chosenBackCardSide !== null) {

      } else {
        state.chosenBackCardSide = state.cards[0].cardBack
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
      if (state.isGameWithComputer === true) {
        state.isComputerMotion = !state.isComputerMotion
      }
      state.isRotationDelay = false;
    },
    matchCards(state, action) {
      const flippedCards = state.cards.filter(card => card.isFlipped && !card.isMatched);

      if (flippedCards.length === 2) {
        const [firstCard, secondCard] = flippedCards;
        if (firstCard.groupId === secondCard.groupId && firstCard.isMatched === false) {
          firstCard.isMatched = true;
          secondCard.isMatched = true;
          if (state.isComputerMotion) {
            state.sumComputerMatched += 1;
          } else {
            state.sumMyMatched += 1;
          }
        } else {
          // state.isComputerMotion = !state.isComputerMotion
        }
      }
    },
    setCards(state, action) {
      state.cards = action.payload
    },
    setIsComputerMotion(state) {
      state.isComputerMotion = !state.isComputerMotion
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
    setGameWithComputer(state) {
      console.log("aboba");
      state.isGameWithComputer = !state.isGameWithComputer;
    },
    setFrontSideCard(state, action) {
      state.chosenFrontCardSide = action.payload;
    },
    shuffleCards: (state) => {
      state.sumMyMatched = 0;
      state.sumComputerMatched = 0;
      state.sumMyMotions = 0;
      state.sumComputerMotions = 0;
      state.isGameGoingOn = true;
      state.flippedCards = [];

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
  setBackSideCard, setSumCards, setFrontSideCard, setSelectedBackgroundSideCard,
  setGameWithComputer, setIsComputerMotion } = cardsSlice.actions;
export default cardsSlice.reducer;
