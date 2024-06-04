import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  imagePathsBackSideCard, imagePathsBackgrounds,
  imagePathsRodent, imagePathsFood,
} from './images.js';

const initialState = {
  test: null,
  currentFlipCard: '',
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
  isGameGoingOn: null,
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
        if (state.isGameGoingOn == true) {
          
        }
        const matchedPairs = [];
        state.flippedCards.forEach((card1, index1) => {
          state.flippedCards.forEach((card2, index2) => {
            if (index1 < index2 && // Ensure card1 comes before card2 to avoid duplicates
              card1.groupId === card2.groupId &&
              state.cards[card1.id].isMatched === false &&
              state.cards[card2.id].isMatched === false) {
              matchedPairs.push([card1, card2]);
            }
          });
        });
        state.test = matchedPairs
        if (state.isComputerMotion) {
          // Логика бота
          if (state.test.length != 0) {
            // Искать и переворачивать совпавшую
            const [firstCard, secondCard] = state.test[0];
            // Проверяем, не перевернута ли уже первая карта
            if (!state.cards[firstCard.id].isFlipped) {
              state.cards[firstCard.id].isFlipped = true;
              state.currentFlipCard = firstCard.id; // Запоминаем перевернутую карту
              state.flippedCards = [...state.flippedCards, firstCard];
            } else {
              // Переворачиваем вторую карту, если она не перевернута
              state.cards[secondCard.id].isFlipped = true;
              state.flippedCards = [...state.flippedCards, secondCard];
              state.test.shift(); // Удаляем пару из test
            }
          } else {
            // Выбрать карточку на рандом
            let random;
            do {
              random = Math.floor(Math.random() * state.cards.length);
            } while (
              // Не должна быть уже перевернута и не должна быть в flippedCards с isMatched = false
              state.cards[random].isFlipped ||
              state.flippedCards.some(
                (card) => card.id === random && state.cards[random].isMatched == false
              )
            );
            state.cards[random].isFlipped = true
            if (!state.flippedCards.some(card => card.id === random)) {
              state.flippedCards = [...state.flippedCards, { id: random, groupId: state.cards[random].groupId }]
            }

          }

          // если перевернуто 2 то запретить переворачивание и сменить сторону
          const currentCoupleFlippedCards = state.cards.filter(card => card.isFlipped && !card.isMatched);
          if (currentCoupleFlippedCards.length === 2) {
            state.cards.forEach((card) => {
              card.canFlip = false;
            });
            state.isRotationDelay = true;
          } else {
            // установить перевернувшуюся карту на данный момент, чтобы в следующем ходу перевернуть его пару, если есть)
            const currentFlipCard = state.cards.filter(card => card.isFlipped && card.isMatched == false)
            if (currentFlipCard.length == 0) {
              state.currentFlipCard = "aboba"
            } else {
              state.currentFlipCard = currentFlipCard[0].id

            }
          }
          // создать и добавить в стейт массив одинаковых пар
          const matchedPairs = [];
          state.flippedCards.forEach((card1, index1) => {
            state.flippedCards.forEach((card2, index2) => {
              if (index1 < index2 && // Ensure card1 comes before card2 to avoid duplicates
                card1.groupId === card2.groupId &&
                state.cards[card1.id].isMatched === false &&
                state.cards[card2.id].isMatched === false) {
                matchedPairs.push([card1, card2]);
              }
            });
          });
          state.test = matchedPairs

          state.sumComputerMotions += 1








        } else {
          state.cards[payload].isFlipped = !state.cards[payload].isFlipped;
          state.cards[payload].canFlip = !state.cards[payload].canFlip;

          if (!state.flippedCards.some(card => card.id === payload)) {
            state.flippedCards = [...state.flippedCards, { id: payload, groupId: state.cards[payload].groupId }]
          }

          const currentCoupleFlippedCards = state.cards.filter(card => card.isFlipped && !card.isMatched);
          if (currentCoupleFlippedCards.length === 2) {
            state.cards.forEach((card) => {
              card.canFlip = false;
            });
            state.isRotationDelay = true;
            state.currentFlipCard = ''
          }
          // создать и добавить в стейт массив одинаковых пар
          const matchedPairs = [];
          state.flippedCards.forEach((card1, index1) => {
            state.flippedCards.forEach((card2, index2) => {
              if (index1 < index2 && // Ensure card1 comes before card2 to avoid duplicates
                card1.groupId === card2.groupId &&
                state.cards[card1.id].isMatched === false &&
                state.cards[card2.id].isMatched === false) {
                matchedPairs.push([card1, card2]);
              }
            });
          });
          state.test = matchedPairs

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
      state.test = []

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
