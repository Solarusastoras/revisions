import React, { useState, useEffect } from 'react';
import CalculateAverage from './Moyenne';

function Resultat() {
  const [averages, setAverages] = useState([]);
  const [generalAverage, setGeneralAverage] = useState(null);
  
  const exerciseTitles = [
    { key: 'double', title: 'Double 🎯' },
    { key: 'moitie', title: 'Moitié 📏' },
    { key: 'ecris', title: 'Écris ✏️' },
    { key: 'calculs', title: 'C\'est Calcul ! 🧮' },
    { key: 'arbre', title: 'Arbre à calcul 🌳' },
    { key: 'trouve', title: 'Trouve le chiffre 🔍' }
  ];

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
      <button className="clear-button" onClick={calculateAverage} style={{ backgroundColor: 'pink', borderRadius: '5px' }}>
        Calculer la moyenne
      </button>
      <div className="averages-container" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        {exerciseTitles.map((exercise, index) => (
          <div key={index} className="average-row" style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
            backgroundColor: '#FFF0F5',
            borderRadius: '5px'
          }}>
            <span style={{ minWidth: '200px' }}>{exercise.title}</span>
            <span>Moyenne: {averages[index] ? Number(averages[index].avg).toFixed(2) : '0'}/20</span>
          </div>
        ))}
      </div>
      {generalAverage !== null && (
        <div className="general-average-display" style={{ fontSize: '2rem', marginTop: '1rem' }}>
          Moyenne Générale: {Number(generalAverage).toFixed(2)}/20
        </div>
      )}
    </section>
  );
}

export default Resultat;
