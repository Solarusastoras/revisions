import React, { useState, useEffect } from 'react';
import ScoreCalculator from './ScoreCalculator';

function Ecris() {
  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem('ecrisAnswers');
    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });
  
  const numberToWord = {
    1: 'un',
    2: 'deux',
    3: 'trois'
  };

  const correctAnswers = Object.values(numberToWord);

  const clearExerciseResult = (index) => {
    const newAnswers = { ...answers };
    delete newAnswers[`answer_${index}`];
    setAnswers(newAnswers);
  };

  return (
    <section className="ecris-section">
      <h2>Écris les nombres en lettres ✏️</h2>
      <div className="exercise-buttons">
        <ScoreCalculator answers={answers} correctAnswers={correctAnswers} localStorageKey="ecrisAnswers" />
      </div>
      {Object.entries(numberToWord).map(([number, word], index) => (
        <div key={index} className="exercise-row">
          <span>Écris le nombre</span>
          <span className="number-to-write">{number}</span>
          <input 
            type="text"
            placeholder="écris en lettres"
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
              {answers[`answer_${index}`].toLowerCase() === word
                ? '✅ Bravo Nono ! C\'est bien écrit ! 🌟' 
                : '❌ Essaie encore Nono ! Tu peux y arriver ! 💪'}
            </span>
          )}
          <button className="clear-button" onClick={() => clearExerciseResult(index)}>Effacer</button>
        </div>
      ))}
    </section>
  );
}

export default Ecris;