import s from './App.module.scss';
import GameField from './components/GameField/GameField';
import Header from './components/Header/Header';

function App() {
  return (
    <div className={s.App}>
      <Header />
      <div className={s.game_field_wrapper}>
      <GameField />
      </div>
    </div>
  );
}

export default App;
