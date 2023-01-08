import React, { useEffect, useState } from 'react';
import './AllTimeStats.css';

const AllTimeStats = () => {
  const [topHamster, setTopHamster] = useState(null);
  const [bottomHamster, setBottomHamster] = useState(null);

  const getTopHamsters = async () => {
    const response = await fetch('http://localhost:4000/hamsters');
    const hamsters = await response.json();

    // Sort hamsters by number of wins
    hamsters.sort((a, b) => b.wins - a.wins);
    const topHamster = hamsters[0];

    // Sort hamsters by number of defeats
    hamsters.sort((c, d) => c.defeats - d.defeats);
    const bottomHamster = hamsters[0];

    // Update the state variables with the top and bottom hamsters
    setTopHamster(topHamster);
    setBottomHamster(bottomHamster);
  };

  useEffect(() => {
    getTopHamsters();
  }, []);

  return (
    <div className="containerStats">
      <div className="stats-wrapper">
        <div className="winner">
          <h6>Top Winner</h6>
          {topHamster && (
            <p>
              {topHamster.name} ({topHamster.wins} wins)
            </p>
          )}
        </div>
        <div className="loser">
          <h6>Top Loser</h6>
          {bottomHamster && (
            <p>
              {bottomHamster.name} ({bottomHamster.defeats} defeats)
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTimeStats;
