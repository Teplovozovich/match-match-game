import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enableFlipCard, flipCard, matchCards } from './../../redux//reducers/cardsSlice';
import s from './GameField.module.scss';
import Card from './Card/Card';

const GameField = () => {
  const dispatch = useDispatch();
  const cards = useSelector(state => state.cards.cards);
  const isRotationDelay = useSelector(state => state.cards.isRotationDelay);

  useEffect(() => {
    if (isRotationDelay == true) {
      setTimeout(() => {
        dispatch(enableFlipCard())
      }, 1150)
      dispatch(matchCards())
    }
  }, cards)

  const handleCardClick = (id, groupId) => {
    
  };

  return (
    <div className={s.game_field}>
      {cards.map(card => (
        <Card
        key={card.id}
        id={card.id}
        frontImage={card.cardFont}
        backImage={card.cardBack}
        canFlip={card.canFlip}
        isFlipped={card.isFlipped}
        isMatched={card.isMatched}
        handleCardClick={() => handleCardClick(card.id, card.groupId)}
        />
      ))}
    </div>
  );
};

export default GameField;
