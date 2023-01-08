import React, { useState, useEffect } from 'react';
import './BattlePage.css';

const BattlePage = () => {
  // Initialize state variables to store the hamsters and the hamster that was selected by the user
  const [selectedHamsters, setSelectedHamsters] = useState([]);
  const [selectedHamster, setSelectedHamster] = useState(null);
  const [unselectedHamster, setUnselectedHamster] = useState(null);

  // useEffect hook to call selectHamsters function when the component is rendered
  useEffect(() => {
    selectHamsters();
  }, []);

  // Function to select two random hamsters from the hamsters array
  const selectHamsters = async () => {
    const response = await fetch('http://localhost:4000/hamsters');
    const images = await response.json();

    // Select two random hamsters from the list of hamsters
    const index1 = Math.floor(Math.random() * images.length);
    let index2 = Math.floor(Math.random() * images.length);

    while (index2 === index1) {
      index2 = Math.floor(Math.random() * images.length);
    }

    const image1 = images[index1];
    const image2 = images[index2];

    setSelectedHamsters([image1, image2]);
  };

  // Event handler for when the user clicks on an hamster
  const handleClick = (hamster) => {
    setSelectedHamster(hamster);
    const unselectedIndex = selectedHamsters.indexOf(hamster) === 0 ? 1 : 0;
    let unselectedHamster = selectedHamsters[unselectedIndex];

    // Make a PUT request to the backend server to update the wins, defeats and games of the selected and unselected hamsters
    fetch(`http://localhost:4000/update/${hamster._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        wins: hamster.wins + 1,
        defeats: hamster.defeats,
        games: hamster.games + 1,
      }),
    });

    fetch(`http://localhost:4000/update/${unselectedHamster._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        wins: unselectedHamster.wins,
        defeats: unselectedHamster.defeats + 1,
        games: unselectedHamster.games + 1,
      }),
    })
      .then((res) => res.json())
      .then((updatedHamsters) => {
        // Update the selected and unselected hamsters in the state with the updated defeats
        setSelectedHamster(updatedHamsters[0]);
        setUnselectedHamster(updatedHamsters[1]);
      });

    selectHamsters();
  };

  return (
    <div className="containerBattlePage">
      <div className="battle-page">
        <div className="images-container">
          {selectedHamsters.map((hamster, index) => (
            <img src={hamster.imageUrl} alt={hamster.name} key={index} onClick={() => handleClick(hamster)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BattlePage;
