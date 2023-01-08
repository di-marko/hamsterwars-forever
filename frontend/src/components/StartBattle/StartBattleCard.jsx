import React from 'react';
import { Link } from 'react-router-dom';
import './StartBattleCard.css';

const StartBattleCard = () => {
  return (
    <div className="containerCard">
      <div className="start-wrapper">
        <div className="start-wrapper-content">
          <h1>HamsterWars</h1>
          <p className="rules">
            <span>The Rules are simple:</span>
            <br />
            You choose the cutest hamster and <span id="fate">fate</span> decides the rest.
          </p>
          <div className="button">
            <Link to="/battle">Battle!</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartBattleCard;
