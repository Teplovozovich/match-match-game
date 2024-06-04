import { Route, Routes } from 'react-router-dom';
import s from './App.module.scss';
import GameField from './components/GameField/GameField';
import Header from './components/Header/Header';
import Settings from './components/SettingsPage/SettingsPage';
import AboutGame from './components/AboutGame/AboutGame';

function App() {
  return (
    <div className={s.App}>
      <Header />
        <div className={s.maim__wrapper}>
      <Routes>
          <Route path='/about-game' element={<AboutGame/>}/>
          <Route path='/game-field' element={<GameField/>}/>
          <Route path='/settings' element={<Settings/>}/>
      </Routes>
        </div>
    </div>
  );
}

export default App;
