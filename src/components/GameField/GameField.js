// В вашем файле GameField.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCards, enableFlipCard, flipCard, matchCards } from './../../redux/reducers/cardsSlice';
import s from './GameField.module.scss';
import Card from './Card/Card';

const GameField = () => {
  const dispatch = useDispatch();
  const cards = useSelector(state => state.cards.cards);
  const isRotationDelay = useSelector(state => state.cards.isRotationDelay);

  useEffect(() => {
    if (isRotationDelay) {
      setTimeout(() => {
        dispatch(enableFlipCard());
      }, 800);
      dispatch(matchCards());
    }
  }, [isRotationDelay]);

  const handleCardClick = (id, groupId) => {
    console.log("aaboba");
  };

  const handleShuffleClick = () => {
    // Генерация случайных пар карточек
    const shuffledPairs = generateRandomPairs(15); // Генерация 10 случайных пар

    // Создание нового состояния для карточек
    const newCardsState = shuffledPairs.map((pair, index) => ({
      id: index + 1,
      cardFont: pair.frontImage,
      cardBack: 'assets/jpg/back.jpg',
      canFlip: true,
      isFlipped: false,
      isMatched: false,
      groupId: pair.groupId,
    }));

    // Обновление состояния Redux
    dispatch(setCards(newCardsState));
  };

  return (
    <div>
      <button onClick={handleShuffleClick}>Перемешать</button>
      <div className={s.game_field}>
        {cards.map(card => (
          <Card
            key={card.id}
            id={card.id}
            groupId={card.groupId}
            frontImage={card.cardFont}
            backImage={card.cardBack}
            canFlip={card.canFlip}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            handleCardClick={() => handleCardClick(card.id, card.groupId)}
          />
        ))}
      </div>
    </div>
  );
};

// Функция для генерации случайных пар карточек
const generateRandomPairs = (numPairs) => {
  const images = ['./assets/jpg/pig.jpg', './assets/jpg/rat.jpg', './assets/jpg/bobr-kurwa.jpg', './assets/jpg/belochka.jpg'];
  const pairs = [];

  for (let i = 0; i < numPairs; i++) {
    const randomIndex = Math.floor(Math.random() * images.length);
    const frontImage = images.splice(randomIndex, 1)[0];
    pairs.push({ frontImage, groupId: i + 1 });
    pairs.push({ frontImage, groupId: i + 1 });
  }

  return shuffleArray(pairs);
};

// Функция для перемешивания массива
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default GameField;