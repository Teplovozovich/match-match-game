import React, { useState } from 'react';
import s from './SettingsPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setBackSideCard, setSumCards, shuffleCards, setFrontSideCard } from '../../redux/reducers/cardsSlice';
import "./Settings.css"
import { setCardCount, setCardCountFromBtn, setSelectedBack, setSelectedFront } from '../../redux/reducers/settingsSlice';

const SettingsPage = () => {
  const navigate = useNavigate();

  const backs = useSelector((state) => state.cards.backsCardSide);
  const fronts = useSelector((state) => state.cards.imagesGroups);

  const selectedBack = useSelector((state) => state.settings.selectedBack);
  const selectedFront = useSelector((state) => state.settings.selectedFront);
  const cardCount = useSelector((state) => state.settings.cardCount);
  const amountButtons = useSelector((state) => state.settings.amountButtons);
  const cardCountFromBtn = useSelector((state) => state.settings.cardCountFromBtn);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const count = e.target.value;
    dispatch(setCardCount(count));
  }

  const handleButtinClick = (e) => {
    console.log('Количество карточек:', cardCountFromBtn);
    if (cardCount > 4999 || cardCount < 2 && cardCountFromBtn === 0) {
      alert(`Вы ввели недопустимое количество \n(доступно от 2 до 4999)`)
    } else if (cardCount === '' && cardCountFromBtn === false){
      dispatch(shuffleCards());
      navigate('/game-field'); 
    } else {
      dispatch(setSumCards(cardCount === '' ? cardCountFromBtn : cardCount));
      dispatch(shuffleCards());
      navigate('/game-field'); 
    }
  }

  const handleBackSideCardClick = (e) => {
    const chosenBack = e.target.getAttribute('src');
    dispatch(setSelectedBack(chosenBack))
    dispatch(setBackSideCard(chosenBack));
  }

  const handleFrontSideCardClick = (images) => {
    console.log(images);
    dispatch(setSelectedFront(images))
    dispatch(setFrontSideCard(images))
    // const chosenFront = e.target.getAttribute('src');
    // dispatch(setSelectedBack(chosenFront))
    // dispatch(setBackSideCard(chosenFront));
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
      <div className={s.back_side__section}>
        <p>Выберите группу</p>
        <div className={s.back_side_card_wrapper}>
          {fronts.map((front, index) => (
            <div key={index} className={`${s.back_side_card}`} onClick={() => handleFrontSideCardClick(front)}>
              {front.map(aboba => (
                <img
                key={aboba}
                  src={aboba}
                  
                />
              ))}
              <div className={`${selectedFront === front ? s.back_side_card_selected : ''}`}></div>
            </div>
          ))}
        </div>
      </div>
      <div className={s.amount_card__section}>
        <p>Выберете количество пар</p>
        <div className={s.amount_buttons_block}>
          {amountButtons.map(button => (
            <button key={button.amount} className={`${s.amount_button} ${button.style && s.selected_button}`}
             onClick={handleAmountButtonClick}>{button.amount}</button>
          ))}
        </div>
        <p>Или введите свое значение</p>
        <input className={s.input} type="number" value={cardCount} onChange={handleInputChange} placeholder='40' />
        <button className={`${s.amount_button} ${s.button_accept}`} onClick={handleButtinClick}>Выбрать и перемешать</button>
      </div>
    </div>
  )
};

export default SettingsPage;
