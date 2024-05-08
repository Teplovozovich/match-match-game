import React, { useState } from 'react';
import s from './Card.module.scss';
import { flipCard, matchCards } from './../../../redux//reducers/cardsSlice';
import { useDispatch, useSelector } from 'react-redux';

const Card = ({ id, groupId, frontImage, backImage, handleCardClick, canFlip, isFlipped, isMatched }) => {
  const dispatch = useDispatch()

  const handleFlipCard = () => {
    dispatch(flipCard(id))
    handleCardClick();
  };

  return (
    <div
      className={`${s.card} ${isFlipped ? s.flipped : ''}
       ${canFlip ? '' : s.banned_flip}`}
      onClick={handleFlipCard}>
      <div className={isMatched == true ? s.matched : ''}></div>
      <div className={`${s.card_inner}`}>
        <div className={`${s.card_front}`}>
          <img src={backImage} alt="Front" />
        </div>
        <div className={s.card_back}>
          {frontImage ?
            <img src={frontImage} alt="Back" /> :
            <div>
              <img src='assets/jpg/japan-back.jpg' className={s.number_card} />
              <p className={s.number}>{groupId}</p>
            </div>}
        </div>
      </div>
    </div>
  );
};

export default Card;
