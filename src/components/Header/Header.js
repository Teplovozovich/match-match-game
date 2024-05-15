// В вашем файле GameField.js

import React, { useEffect, useState } from 'react';
import s from './Header.module.scss';

const Header = () => {
  return (
    <div className={s.header}>
      <div>img</div>
      <div>game</div>
      <button>Старт</button>
    </div>
  )
};

export default Header;