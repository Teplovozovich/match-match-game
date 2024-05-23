// В вашем файле GameField.js

import React, { useEffect, useState } from 'react';
import s from './Header.module.scss';

const Header = () => {
  return (
    <div className={s.header_wrapper}>
      <div className={s.header}>
        <div className={s.logo}>
          <p className={s.logo_text}>MATCH</p>
          <p className={`${s.logo_text} ${s.below}`}>MATCH</p>
        </div>
        <button className={s.button}>Старт</button>
        <div className={s.settings}>
          <img
            src='/assets/svg/settings.svg'
            onMouseOver={e => (e.currentTarget.src = "/assets/svg/settings-active.svg")}
            onMouseOut={e => (e.currentTarget.src = "/assets/svg/settings.svg")}
            onTouchStart={e => {
              e.currentTarget.src = "/assets/svg/settings-active.svg";
              e.preventDefault(); // Prevent unexpected mouse events after touch
            }}
            onTouchEnd={e => {
              e.currentTarget.src = "/assets/svg/settings.svg";
              e.preventDefault(); // Prevent unexpected mouse events after touch
            }}
            // onMouseDown={e => (e.currentTarget.src = "/assets/svg/settings-active.svg")}
            // onMouseUp={e => (e.currentTarget.src = "/assets/svg/settings.svg")}
          />
        </div>
      </div>
    </div>
  )
};

export default Header;