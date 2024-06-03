import React, { useState } from 'react';
import s from './Card.module.scss';
import { flipCard, matchCards } from './../../../redux//reducers/cardsSlice';
import { useDispatch, useSelector } from 'react-redux';

const Card = ({ id, groupId, frontImage, backImage, canFlip, isFlipped, isMatched, background, isComputerMotion }) => {
  const dispatch = useDispatch()

  const handleFlipCard = () => {
    if (!isComputerMotion) { 
      dispatch(flipCard(id))
    }
  };

  return (
    <div
      className={`${s.card} ${isFlipped ? s.flipped : ''}
       ${canFlip ? '' : s.banned_flip}`}
      onClick={handleFlipCard}>
      <div className={isMatched == true ? s.matched : ''}></div>
      <div className={`${s.card_inner}`}>
        <div className={`${s.card_front}`}>
          <img src={backImage} alt="Рубашка" />
        </div>
        <div className={s.card_back}>
          {frontImage ?
            <img src={frontImage} alt={groupId} /> :
            <div className={s.number_card}>
              <img src={background}/>
              <p className={s.number}>{groupId}</p>
            </div>}
        </div>
      </div>
    </div>
  );
};

export default Card;
