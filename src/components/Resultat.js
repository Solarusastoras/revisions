import React, { useState, useEffect } from 'react';
import CalculateAverage from './Moyenne';

function Resultat() {
  const [averages, setAverages] = useState([]);
  const [generalAverage, setGeneralAverage] = useState(null);

  useEffect(() => {
    const savedAverages = JSON.parse(localStorage.getItem('averageScores')) || [];
    setAverages(savedAverages);
    if (savedAverages.length > 0) {
      const avgScores = savedAverages.map(item => item.avg);
      setGeneralAverage(CalculateAverage(avgScores));
    }
  }, []);

  const calculateAverage = () => {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    const avg = CalculateAverage(scores);
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('fr-FR', { month: 'long' })} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
    const newAverage = { avg, date: formattedDate };
    const updatedAverages = [...averages, newAverage];
    setAverages(updatedAverages);
    localStorage.setItem('averageScores', JSON.stringify(updatedAverages));
    const avgScores = updatedAverages.map(item => item.avg);
    setGeneralAverage(CalculateAverage(avgScores));
  };

  const deleteAverage = (index) => {
    const updatedAverages = averages.filter((_, i) => i !== index);
    setAverages(updatedAverages);
    localStorage.setItem('averageScores', JSON.stringify(updatedAverages));
    const avgScores = updatedAverages.map(item => item.avg);
    setGeneralAverage(CalculateAverage(avgScores));
  };

  return (
    <section className="resultat-section">
      <h2>Résultat 🌟</h2>
      <button className="clear-button" onClick={calculateAverage} style={{ backgroundColor: 'pink', borderRadius: '5px' }}>Calculer la moyenne</button>
      {averages.map((item, index) => (
        <div key={index} className="average-display" style={{ fontSize: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Moyenne: {item.avg}/20 - Date: {item.date}</span>
          <button onClick={() => deleteAverage(index)} style={{ backgroundColor: 'pink', borderRadius: '5px' }}>Supprimer</button>
        </div>
      ))}
      {generalAverage !== null && (
        <div className="general-average-display" style={{ fontSize: '2rem', marginTop: '1rem' }}>
          Moyenne Générale: {generalAverage}/20
        </div>
      )}
    </section>
  );
}

export default Resultat;
