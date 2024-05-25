import React, { useEffect, useState } from 'react';
import s from './SettingsPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setBackSideCard } from '../../redux/reducers/cardsSlice';


const SettingsPage = () => {
  const backs = useSelector((state) => state.cards.backsCardSide)
  const dispatch = useDispatch();
  console.log(backs);

  const handleClick = (e) => {
    const chosenBack = e.target.getAttribute('src');
    dispatch(setBackSideCard(chosenBack))
  }

  return (
    <div>
      {backs.map(back => (
        <img className={s.back_side_card} src={back} onClick={handleClick}/>
      ))}
    </div>
  )
};

export default SettingsPage;