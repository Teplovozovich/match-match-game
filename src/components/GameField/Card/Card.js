import React, { useState } from 'react';
import s from './Card.module.scss';

const Card = ({ frontImage, backImage, handleCardClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    handleCardClick();
  };

  return (
    <div className={`${s.card} ${isFlipped ? s.flipped : ''}`} onClick={flipCard}>
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
