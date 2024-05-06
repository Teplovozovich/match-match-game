import s from './App.module.scss';
import GameField from './components/GameField/GameField';

function App() {
  return (
    <div className={s.App}>
      <GameField />
    </div>
  );
}

export default App;
