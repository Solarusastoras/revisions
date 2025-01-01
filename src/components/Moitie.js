import React, { useState, useEffect } from 'react';
import ScoreCalculator from './ScoreCalculator';

function Moitie() {
  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem('moitieAnswers');
    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });
  
  const moities = [
    { number: 2 },
    { number: 4 },
    { number: 6 },
    { number: 8 },
    { number: 10 },
    { number: 12 },
    { number: 14 },
    { number: 16 },
    { number: 18 },
    { number: 20 }
  ];

  const correctAnswers = moities.map(item => item.number / 2);

  const clearExerciseResult = (index) => {
    const newAnswers = { ...answers };
    delete newAnswers[`answer_${index}`];
    setAnswers(newAnswers);
  };

  return (
    <section className="moitie-section">
      <h2>La Moitié 📏</h2>
      {moities.map((item, index) => (
        <div key={index} className="exercise-row">
          <span>Moitié de {item.number}</span>
          <span>c'est</span>
          <input 
            type="number"
            placeholder="?"
            value={answers[`answer_${index}`] || ''}
            onChange={(e) => {
              setAnswers({
                ...answers,
                [`answer_${index}`]: e.target.value
              });
            }}
          />
          {answers[`answer_${index}`] && (
            <span className="feedback">
              {Number(answers[`answer_${index}`]) === item.number / 2 
                ? '✅ Bravo Nono ! Tu es super forte ! 🌟' 
                : '❌ Allez Nono, tu peux y arriver ! 💪'}
            </span>
          )}
          <button className="clear-button" onClick={() => clearExerciseResult(index)}>Effacer</button>
        </div>
      ))}
    </section>
  );
}

export default Moitie;