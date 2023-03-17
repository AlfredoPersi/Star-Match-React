import React from 'react';
import GameStateManager from './GameStateManager';
import StarListComponent from './StarListComponent';
import NumberComponent from './NumberComponent';
import GameDone from './GameDone';
import utils from '../math.utils';

const Game = (props) => {
  const {
    stars,
    availableNumbers,
    candidateNumbers,
    secondsLeft,
    setStateGame,
  } = GameStateManager();

  const candidateNumbersWrong = utils.sum(candidateNumbers) > stars;

  const statusGame =
    availableNumbers.length === 0
      ? 'won'
      : secondsLeft === 0
      ? 'lost'
      : 'active';

  const setStatusNumber = (number) => {
    if (!availableNumbers.includes(number)) {
      return 'used';
    }
    if (candidateNumbers.includes(number)) {
      return candidateNumbersWrong ? 'wrong' : 'candidate';
    }
    return 'available';
  };

  const onNumberClick = (number, currentStatus) => {
    if (currentStatus === 'used' || secondsLeft === 0) {
      return;
    }

    const newCandidateNums =
      currentStatus === 'available'
        ? candidateNumbers.concat(number)
        : candidateNumbers.filter((cn) => cn !== number);

    setStateGame(newCandidateNums);
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {statusGame === 'active' ? (
            <StarListComponent starsCount={stars} />
          ) : (
            <GameDone onClick={props.startNewGame} status={statusGame} />
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map((number) => (
            <NumberComponent
              key={number}
              number={number}
              status={setStatusNumber(number)}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};

export default Game;
