// В вашем файле GameField.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCards, enableFlipCard, flipCard, matchCards, shuffleCards } from './../../redux/reducers/cardsSlice';
import s from './GameField.module.scss';
import Card from './Card/Card';

const GameField = () => {
  const dispatch = useDispatch();
  const cards = useSelector(state => state.cards.cards);
  const background = useSelector(state => state.cards.chosenBackground);
  const sumMyMotions = useSelector(state => state.cards.sumMyMotions);
  const sumMyMatched = useSelector(state => state.cards.sumMyMatched);
  const sumComputerMotions = useSelector(state => state.cards.sumComputerMotions);
  const sumComputerMatched = useSelector(state => state.cards.sumComputerMatched);
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
    <div className={s.game_field__page}>
      <div className={s.upper_game_field_block__wrapper}>
        <div className={s.upper_game_field_left__block}>
          <p>Ходов: {sumMyMotions}</p>
          <p>Совпало: {sumMyMatched}</p>
        </div>
        <div className={s.upper_game_field_right_block}>
          <p>Ходов: {sumComputerMotions}</p>
          <p>Совпало: {sumComputerMatched}</p>
        </div>
      </div>
      <div className={s.game_field}>
        {cards.map(card => (
          <Card
            key={card.id}
            id={card.id}
            groupId={card.groupId}
            frontImage={card.cardFont}
            backImage={card.cardBack}
            background={background}
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