import React, { useState } from 'react';
import s from './SettingsPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setBackSideCard, setSumCards, shuffleCards, setFrontSideCard, setSelectedBackgroundSideCard } from '../../redux/reducers/cardsSlice';
import "./Settings.css"
import { setCardCount, setCardCountFromBtn, setSelectedBack, setSelectedBackground, setSelectedFront, setSelectedOnlyNumbers, setSelectedShuffleAll } from '../../redux/reducers/settingsSlice';
import Switch from '../Common/Switch/Switch';

const SettingsPage = () => {
  const navigate = useNavigate();

  const backs = useSelector((state) => state.cards.backsCardSide);
  const backgrounds = useSelector((state) => state.cards.backgrounds);
  const fronts = useSelector((state) => state.cards.imagesGroups);
  console.log(backgrounds);

  const selectedBack = useSelector((state) => state.settings.selectedBack);
  const selectedBackground = useSelector((state) => state.settings.selectedBackground);
  const selectedFront = useSelector((state) => state.settings.selectedFront);
  const selectedShuffleAll = useSelector((state) => state.settings.selectedShuffleAll);
  const selectedOnlyNumbers = useSelector((state) => state.settings.selectedOnlyNumbers);
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
    } else if (cardCount === '' && cardCountFromBtn === false) {
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

  const handleBackgroundCardClick = (e) => {
    const chosenBack = e.target.getAttribute('src');
    dispatch(setSelectedBackgroundSideCard(chosenBack))
    dispatch(setSelectedBackground(chosenBack));
  }

  const handleFrontSideCardClick = (images) => {
    console.log(images);
    dispatch(setSelectedFront(images))
    dispatch(setFrontSideCard(images))
  }

  const handleAmountButtonClick = (e) => {
    dispatch(setCardCountFromBtn(e.target.textContent));
  }

  const handleSwitchChange = (event) => {
    console.log("aboba");
    // setIsFreeOnly(event.target.checked);
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
        <div className={s.front_side_card_wrapper}>
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
      <div className={s.radio_block}>
        <div className={s.radio}>
          <input onClick={() => {dispatch(setSelectedShuffleAll("img"))}} type="radio" id="contactChoice1" name="contact" value="img"
            checked={selectedShuffleAll === "img"} />
          <label htmlFor="contactChoice1">Перемешать все картинки </label>
        </div>
        <div className={s.radio}>
          <input onClick={() => {dispatch(setSelectedOnlyNumbers("num"))}} type="radio" id="contactChoice2" name="contact" value="num"
            checked={selectedOnlyNumbers === "num"} />
          <label htmlFor="contactChoice2">Только числа</label>
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
        <input className={s.input} type="number" value={cardCount} onChange={handleInputChange} placeholder='Или введите свое значение' />
        <div className={s.textSwitch}>
          <p>Играть с компьютером</p>
          <label className={s.switch_btn}>
            <div className='switch_container'>
              <input type="checkbox" id="switch"></input>
              <label htmlFor="switch" className="switch-label"></label>
            </div>
          </label>
        </div>
        <button className={`${s.amount_button} ${s.button_accept}`} onClick={handleButtinClick}>Выбрать и перемешать</button>
      </div>
      <div className={s.back_side__section}>
        <p>Выберите фон для чисел</p>
        <div className={s.back_side_card_wrapper}>
          {backgrounds.map(background => (
            <div key={background} className={`${s.back_side_card}`}>
              <img
                src={background}
                onClick={handleBackgroundCardClick}
              />
              <div className={`${selectedBackground === background ? s.back_side_card_selected : ''}`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default SettingsPage;
