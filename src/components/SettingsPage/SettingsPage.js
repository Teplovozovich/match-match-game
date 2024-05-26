import React, { useEffect, useState } from 'react';
import s from './SettingsPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setBackSideCard, setSumCards } from '../../redux/reducers/cardsSlice';
import "./Settings.css"

const SettingsPage = () => {
  const backs = useSelector((state) => state.cards.backsCardSide);
  const [cardCount, setCardCount] = useState('');
  const dispatch = useDispatch();

  const handleBackSideCardClick = (e) => {
    const chosenBack = e.target.getAttribute('src');
    dispatch(setBackSideCard(chosenBack));
  }

  const handleInputChange = (e) => {
    const count = e.target.value;
    setCardCount(count);
  }

  const handleButtinClick = (e) => {
    console.log('Количество карточек:', cardCount);
    if (cardCount > 4999 || cardCount < 2) {
      alert("Вы ввели неправильное колличество")
    } else {
      dispatch(setSumCards(cardCount))

    }
  }

  return (
    <div className={s.settings}>
      <div className={s.back_side_card_wrapper}>
        {backs.map(back => (
          <img key={back} className={s.back_side_card} src={back} onClick={handleBackSideCardClick} />
        ))}
      </div>
      <p>Введите количество пар:</p>
      <input type="number" value={cardCount} onChange={handleInputChange} />
      <button onClick={handleButtinClick}>выбрать</button>
    </div>
  )
};

export default SettingsPage;
