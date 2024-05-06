import { configureStore } from '@reduxjs/toolkit';
import cardsSlice from './reducers/cardsSlice';

export const store = configureStore({
  reducer: {
    cards: cardsSlice,
  },
});
