// В вашем файле GameField.js

import React, { useEffect, useState } from 'react';
import s from './Header.module.scss';
import { NavLink, Navigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { shuffleCards } from '../../redux/reducers/cardsSlice';

const Header = () => {
  const location = useLocation(); // Use useLocation to access the current URL
  const dispatch = useDispatch();
  const isRotationDelay = useSelector(state => state.cards.isRotationDelay);
  const isComputerMotion = useSelector(state => state.cards.isComputerMotion);
  const isGameGoingOn = useSelector((state) => state.cards.isGameGoingOn)

  useEffect(() => {
    dispatch(shuffleCards())
    dispatch(shuffleCards())
  }, [])

  return (
    <div className={s.header_wrapper}>
      <div className={s.header}>
        <div className={s.logo}>
          <p className={s.logo_text}>MATCH</p>
          <p className={`${s.logo_text} ${s.below}`}>MATCH</p>
        </div>

        {location.pathname === '/game-field' ?
          <NavLink to="/game-field" className={s.button_wrapper}>
            <button disabled={isRotationDelay || (isGameGoingOn && isComputerMotion)} className={s.button} onClick={() => dispatch(shuffleCards())}>Перемешать</button>
          </NavLink> :

          <NavLink to="/game-field" className={s.button_wrapper}>
            <button disabled={isRotationDelay || (isGameGoingOn && isComputerMotion)} className={s.button}>Вернуться</button>
          </NavLink>
        }
        <div className={`${s.settings} ${isRotationDelay || isComputerMotion}`}>
          <NavLink to="/settings"
           className={`${s.settings_wrap} 
           ${isRotationDelay || (isGameGoingOn && isComputerMotion) == true ? s.banned_click : ''}`}>
            <p className={s.img}></p>
          </NavLink>
        </div>

      </div>
    </div>
  )
};

export default Header;