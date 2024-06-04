import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCards, enableFlipCard, flipCard, matchCards, shuffleCards, setIsComputerMotion } from './../../redux/reducers/cardsSlice';
import s from './GameField.module.scss';
import Card from './Card/Card';

const GameField = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.cards);
  const cards = useSelector(state => state.cards.cards);
  const background = useSelector(state => state.cards.chosenBackground);
  const sumMyMotions = useSelector(state => state.cards.sumMyMotions);
  const sumMyMatched = useSelector(state => state.cards.sumMyMatched);
  const sumComputerMotions = useSelector(state => state.cards.sumComputerMotions);
  const sumComputerMatched = useSelector(state => state.cards.sumComputerMatched);
  const isRotationDelay = useSelector(state => state.cards.isRotationDelay);
  const isComputerMotion = useSelector(state => state.cards.isComputerMotion);
  const isGameWithComputer = useSelector(state => state.cards.isGameWithComputer);
  const isGameGoingOn = useSelector((state) => state.cards.isGameGoingOn)

  const prevIsComputerMotion = useRef(isComputerMotion); // Инициализируем useRef
  const prevIsGameWithComputer = useRef(isGameWithComputer); // Инициализируем useRef
  const prevSumComputerMotions = useRef(sumComputerMotions); // Инициализируем useRef

  useEffect(() => {
    if (isRotationDelay & isComputerMotion === false) {
      setTimeout(() => {
        dispatch(enableFlipCard());
      }, 800);
      dispatch(matchCards());
    }
  }, [isRotationDelay]);

  useEffect(() => {
    if (isGameGoingOn) {

      if (prevIsComputerMotion.current !== isComputerMotion || prevIsGameWithComputer.current !== isGameWithComputer || prevSumComputerMotions.current !== sumComputerMotions) {
        if (isComputerMotion === true) {
          if (isRotationDelay == false) {
            setTimeout(() => {
              dispatch(flipCard())
            }, 800);
          }
          if (prevSumComputerMotions.current !== sumComputerMotions) {
            if (isRotationDelay) {
              setTimeout(() => {
                dispatch(enableFlipCard());
              }, 800);
              dispatch(matchCards());

            }
          }
        }
      }
    }

    prevIsComputerMotion.current = isComputerMotion;
    prevIsGameWithComputer.current = isGameWithComputer;
    prevSumComputerMotions.current = sumComputerMotions;

  }, [isComputerMotion, isGameWithComputer, sumComputerMotions, isRotationDelay]);

  useEffect(() => {
    // debugger
    // if (isGameGoingOn == false && sumComputerMotions > 2) {
    //   if (sumComputerMatched > sumMyMatched) {
    //     alert("Победил компьютер")
    //   } else {
    //     alert("Вы победили компьютер")
    //   }
    //   // dispatch(setIsComputerMotion())
    // }
  }, [isGameGoingOn])

  return (
    <div className={s.game_field__page}>
      <div className={s.upper_game_field_block__wrapper}>
        <div className={s.upper_game_field_left__block}>
          <p>Ходов: {sumMyMotions}</p>
          <p>Совпало: {sumMyMatched}</p>
        </div>
        {isGameWithComputer &&
          <div className={s.upper_game_field_right_block}>
            <p>Ходов: {sumComputerMotions}</p>
            <p>Совпало: {sumComputerMatched}</p>
          </div>
        }

      </div>
      <div className={s.game_field}>
        {cards.map(card => (
          <Card
            key={card.id}
            id={card.id}
            groupId={card.groupId}
            frontImage={card.cardFont}
            backImage={card.cardBack}
            background={background}
            canFlip={card.canFlip}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            isComputerMotion={isComputerMotion}
          />
        ))}
      </div>
    </div>
  );
};

export default GameField;