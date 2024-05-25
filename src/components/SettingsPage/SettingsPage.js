import React, { useEffect, useState } from 'react';
import s from './SettingsPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setBackSideCard, setSumCards } from '../../redux/reducers/cardsSlice';

const SettingsPage = () => {
  const backs = useSelector((state) => state.cards.backsCardSide);
  let sumCards = useSelector((state) => state.cards.sumCards);
  const dispatch = useDispatch();
  console.log(backs);

  const handleBackSideCardClick = (e) => {
    const chosenBack = e.target.getAttribute('src');
    dispatch(setBackSideCard(chosenBack));
  }

  const [cardCount, setCardCount] = useState('');

  const handleInputChange = (e) => {
    const count = e.target.value;
    setCardCount(count);
  }

  const handleClick = (e) => {
    console.log('Количество карточек:', cardCount);
    dispatch(setSumCards(cardCount))
  }

  return (
    <div>
      {backs.map(back => (
        <img key={back} className={s.back_side_card} src={back} onClick={handleBackSideCardClick} />
      ))}
      <p>Введите количество карточек:</p>
      <input type="number" value={cardCount} onChange={handleInputChange} />
      <button onClick={handleClick}>выбрать</button>
    </div>
  )
};

export default SettingsPage;
