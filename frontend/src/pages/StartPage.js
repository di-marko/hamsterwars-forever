import React from 'react';
import AllTimeStats from '../components/AllTimeStats/AllTimeStats';
import StartBattleCard from '../components/StartBattle/StartBattleCard';

import './StartPage.css';

const StartPage = () => {
  return (
    <>
      <div className="containerStartPage">
        <div className="start-page">
          <AllTimeStats />
          <StartBattleCard />
        </div>
      </div>
    </>
  );
};

export default StartPage;
