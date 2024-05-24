// В вашем файле GameField.js

import React, { useEffect, useState } from 'react';
import s from './Header.module.scss';
import { NavLink, Navigate } from 'react-router-dom';

const Header = () => {
  return (
    <div className={s.header_wrapper}>
      <div className={s.header}>
        <div className={s.logo}>
          <p className={s.logo_text}>MATCH</p>
          <p className={`${s.logo_text} ${s.below}`}>MATCH</p>
        </div>
        <NavLink to="/game-field" className={s.button_wrapper}>
          <button className={s.button}>Старт</button>
        </NavLink>
        <div className={s.settings}>
          <NavLink to="/settings" className={s.settings_wrap}>
            <p className={s.img}></p>
          </NavLink>
        </div>

      </div>
    </div>
  )
};

export default Header;