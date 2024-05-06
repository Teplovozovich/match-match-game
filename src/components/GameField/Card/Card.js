import React, { useState } from 'react';
import s from './Card.module.scss';
import { flipCard, matchCards } from './../../../redux//reducers/cardsSlice';
import { useDispatch, useSelector } from 'react-redux';

const Card = ({ id, frontImage, backImage, handleCardClick, canFlip, isFlipped }) => {
  const dispatch = useDispatch()

  const handleFlipCard = () => {
    dispatch(flipCard(id))
    handleCardClick();
  };

  return (
    <div className={`${s.card} ${isFlipped ? s.flipped : ''} ${canFlip ? '' : s.banned_flip  }`} onClick={handleFlipCard}>
      <div className={s.card_inner}>
        <div className={s.card_front}>
          <img src={backImage} alt="Front" />
        </div>
        <div className={s.card_back}>
          <img src={frontImage} alt="Back" />
        </div>
      </div>
    </div>
  );
};

export default Card;
