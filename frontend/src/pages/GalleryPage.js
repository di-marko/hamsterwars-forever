import React, { useState, useEffect } from 'react';

/* import hamsters from '../data/hamsters'; */
import './GalleryPage.css';

const GalleryPage = () => {
  // Initialize state variable to store the list of hamsters
  const [hamsters, setHamsters] = useState([]);

  // Use useEffect hook to call fetchHamsters function when the component is rendered
  useEffect(() => {
    fetchHamsters();
  }, []);

  // Function to fetch the list of hamsters from the backend server
  const fetchHamsters = async () => {
    const response = await fetch('http://localhost:4000/hamsters');
    const hamsters = await response.json();
    setHamsters(hamsters);
  };

  const getHamsterWithMostWins = (hamsters) => {
    return hamsters.reduce((prev, current) => (prev.wins > current.wins ? prev : current), { wins: 0 });
  };

  const hamsterWithMostDefeats = hamsters.reduce((prev, current) => (prev.defeats > current.defeats ? prev : current), {
    defeats: 0,
  });

  const hamsterWithMostWins = getHamsterWithMostWins(hamsters);

  return (
    <div className="containerGalleryPage">
      <div className="gallery-wrapper">
        <div className="hamster-grid">
          {hamsters.map((hamster) => {
            return (
              <div key={hamster.id} className={`hamster-card ${hamster === hamsterWithMostWins ? 'top-hamster' : ''}`}>
                <img src={hamster.imageUrl} alt={hamster.name} />
                <div className="stats">
                  <h2>{hamster.name}</h2>
                  <p>Age: {hamster.age}</p>
                  <p>Loves: {hamster.loves}</p>
                  <p>Wins: {hamster.wins}</p>
                  <p>Defeats: {hamster.defeats}</p>
                  <p>Games: {hamster.games}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
