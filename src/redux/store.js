import { configureStore } from '@reduxjs/toolkit';
import cardsSlice from './reducers/cardsSlice';
import settingsSlice from './reducers/settingsSlice';

export const store = configureStore({
  reducer: {
    cards: cardsSlice,
    settings: settingsSlice
  },
});
