import React, { useState } from 'react';
import s from './SettingsPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setBackSideCard, setSumCards, shuffleCards } from '../../redux/reducers/cardsSlice';
import "./Settings.css"
import { setCardCount, setCardCountFromBtn, setSelectedBack } from '../../redux/reducers/settingsSlice';

const SettingsPage = () => {
  const backs = useSelector((state) => state.cards.backsCardSide);
  const selectedBack = useSelector((state) => state.settings.selectedBack);
  const cardCount = useSelector((state) => state.settings.cardCount);
  const amountButtons = useSelector((state) => state.settings.amountButtons);
  const cardCountFromBtn = useSelector((state) => state.settings.cardCountFromBtn);
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
    console.log('Количество карточек:', cardCountFromBtn);
    if (cardCount > 4999 || cardCount < 2 && cardCountFromBtn === 0) {
      alert(`Вы ввели недопустимое количество \n(доступно от 2 до 4999)`)
    } else {
      dispatch(setSumCards(cardCount === '' ? cardCountFromBtn : cardCount));
      dispatch(shuffleCards());
    }
  }

  const handleAmountButtonClick = (e) => {
    dispatch(setCardCountFromBtn(e.target.textContent));
  }

  return (
    <div className={s.settings}>
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
      <div className={s.amount_card__section}>
        <p>Выберете количество пар</p>
        <div className={s.amount_buttons_block}>
          {amountButtons.map(button => (
            <button className={`${s.amount_button} ${button.style && s.selected_button}`}
             onClick={handleAmountButtonClick}>{button.amount}</button>
          ))}
        </div>
        <p>Или введите свое значение</p>
        <input type="number" value={cardCount} onChange={handleInputChange} />
        <button className={`${s.amount_button} ${s.button_accept}`} onClick={handleButtinClick}>Выбрать и перемешать</button>
      </div>
    </div>
  )
};

export default SettingsPage;
