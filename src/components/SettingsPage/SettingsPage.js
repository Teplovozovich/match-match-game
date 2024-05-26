import React, { useState } from 'react';
import s from './SettingsPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setBackSideCard, setSumCards } from '../../redux/reducers/cardsSlice';
import "./Settings.css"
import { setCardCount, setSelectedBack } from '../../redux/reducers/settingsSlice';

const SettingsPage = () => {
  const backs = useSelector((state) => state.cards.backsCardSide);
  const selectedBack = useSelector((state) => state.settings.selectedBack);
  const cardCount = useSelector((state) => state.settings.cardCount);
  const dispatch = useDispatch();

  const handleBackSideCardClick = (e) => {
    const chosenBack = e.target.getAttribute('src');
    dispatch(setSelectedBack(chosenBack))
    dispatch(setBackSideCard(chosenBack));
  }

  const handleInputChange = (e) => {
    const count = e.target.value;
    dispatch(setCardCount(count));
  }

  const handleButtinClick = (e) => {
    console.log('Количество карточек:', cardCount);
    if (cardCount > 4999 || cardCount < 2) {
      alert("Вы ввели недопустимое количество")
    } else {
      dispatch(setSumCards(cardCount));
    }
  }

  return (
    <div className={s.settings}>
      {/* <div class="container">
        <div class="slide"><p>Первый слайд</p></div>
        <div class="slide"><p>Первый слайд</p></div>
        <div class="slide"><p>Первый слайд</p></div>
      </div> */}
      {/* <img src='./assets/svg/checkmark.svg'/> */}
      <div className={s.back_side__section}>
        <p>Выберите обложку карточек</p>
        <div className={s.back_side_card_wrapper}>
          {backs.map(back => (
            <div key={back} className={`${s.back_side_card}`}>
              <img
                src={back}
                onClick={handleBackSideCardClick}
              />
              <div className={`${selectedBack === back ? s.back_side_card_selected : ''}`}></div>
            </div>
          ))}
        </div>
      </div>

      <p>Введите количество пар:</p>
      <input type="number" value={cardCount} onChange={handleInputChange} />
      <button onClick={handleButtinClick}>выбрать</button>
    </div>
  )
};

export default SettingsPage;
