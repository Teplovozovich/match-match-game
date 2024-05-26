// В вашем файле GameField.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCards, enableFlipCard, flipCard, matchCards, shuffleCards } from './../../redux/reducers/cardsSlice';
import s from './GameField.module.scss';
import Card from './Card/Card';

const GameField = () => {
  const dispatch = useDispatch();
  const cards = useSelector(state => state.cards.cards);
  const sumMotions = useSelector(state => state.cards.sumMotions);
  const sumMatched = useSelector(state => state.cards.sumMatched);
  const isRotationDelay = useSelector(state => state.cards.isRotationDelay);

  useEffect(() => {
    if (isRotationDelay) {
      setTimeout(() => {
        dispatch(enableFlipCard());
      }, 800);
      dispatch(matchCards());
    }
  }, [isRotationDelay]);

  return (
    <div>
      <p>Переворачиваний: {sumMotions}</p>
      <p>Совпало: {sumMatched}</p>
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
          />
        ))}
      </div>
    </div>
  );
};

export default GameField;