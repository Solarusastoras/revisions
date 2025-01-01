import React, { useState } from 'react';

function Ecris() {
  const [answers, setAnswers] = useState({});
  
  const numberToWord = {
    1: 'un',
    2: 'deux',
    3: 'trois',
    4: 'quatre',
    5: 'cinq',
    6: 'six',
    7: 'sept',
    8: 'huit',
    9: 'neuf',
    10: 'dix'
  };

  const checkAnswer = (number, answer) => {
    const correctAnswer = numberToWord[number];
    // On accepte la réponse quelle que soit la casse (majuscules/minuscules)
    return answer.toLowerCase() === correctAnswer;
  };

  return (
    <section className="ecris-section">
      <h2>Écris les nombres en lettres ✏️</h2>
      {Object.entries(numberToWord).map(([number, word], index) => (
        <div key={index} className="exercise-row">
          <span>Écris le nombre</span>
          <span className="number-to-write">{number}</span>
          <input 
            type="text"
            placeholder="écris en lettres"
            value={answers[`ecris_${index}`] || ''}
            onChange={(e) => {
              setAnswers({
                ...answers,
                [`ecris_${index}`]: e.target.value
              });
            }}
          />
          {answers[`ecris_${index}`] && (
            <span className="feedback">
              {checkAnswer(number, answers[`ecris_${index}`])
                ? '✅ Bravo Nono ! C\'est bien écrit ! 🌟' 
                : '❌ Essaie encore Nono ! Tu peux y arriver ! 💪'}
            </span>
          )}
        </div>
      ))}
    </section>
  );
}

export default Ecris; 