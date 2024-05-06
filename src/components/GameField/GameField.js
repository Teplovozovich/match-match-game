import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { flipCard, matchCards } from './../../redux//reducers/cardsSlice';
import s from './GameField.module.scss';
import Card from './Card/Card';

const GameField = () => {
  const dispatch = useDispatch();
  const cards = useSelector(state => state.cards);

  const handleCardClick = (id, groupId) => {
    // const flippedCards = cards.filter(card => card.isFlipped && !card.isMatched);
    // if (flippedCards.length < 2) {
    //   dispatch(flipCard({ id })); // Переворачиваем карточку
    //   dispatch(matchCards({ groupId })); // Проверяем совпадение карточек в группе
    // }
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
