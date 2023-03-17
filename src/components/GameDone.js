import React from 'react';

const GameDone = (props) => (
  <div className="game-done">
    <div
      className="message"
      style={{ color: props.status === 'lost' ? 'red' : 'green' }}
    >
      {props.status == 'lost' ? 'Game Over!' : 'Win!'}
    </div>
    <button onClick={props.onClick}>Play Again</button>
  </div>
);

export default GameDone;
