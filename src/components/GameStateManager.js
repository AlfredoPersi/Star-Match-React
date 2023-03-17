import React, { useState, useEffect } from 'react';
import utils from '../math.utils';

const GameStateManager = () => {
  const [stars, setStar] = useState(utils.random(1, 9));
  const [availableNumbers, setAvailableNumbers] = useState(utils.range(1, 9));
  const [candidateNumbers, setCandidateNumbers] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft > 0 && availableNumbers.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    }
  });

  const setStateGame = (newCandidateNums) => {
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNumbers(newCandidateNums);
    } else {
      const newAvailableNums = availableNumbers.filter(
        (n) => !newCandidateNums.includes(n),
      );

      setStar(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNumbers(newAvailableNums);
      setCandidateNumbers([]);
    }
  };

  return {
    stars,
    availableNumbers,
    candidateNumbers,
    secondsLeft,
    setStateGame,
  };
};

export default GameStateManager;
