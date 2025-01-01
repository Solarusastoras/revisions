import React, { useState } from 'react';

function TrouveChiffre() {
  const [answers, setAnswers] = useState({});
  
  const exercices = [
    { num1: 13, result: 18 },
    { num1: 9, result: 15 },
    { num1: 30, result: 41 },
    { num1: 18, result: 24 },
    { num1: 4, result: 22 },
    { num1: 30, result: 33 },
    { num1: 29, result: 39 },
    { num1: 2, result: 26 },
    { num1: 17, result: 26 },
    { num1: 1, result: 39 },
    { num1: 27, result: 35 },
    { num1: 9, result: 13 }
  ];

  return (
    <section className="trouve-chiffre-section">
      <h2>Trouve le chiffre manquant 🔍</h2>
      {exercices.map((exercice, index) => (
        <div key={index} className="exercise-row">
          <span>{exercice.num1}</span>
          <span>+</span>
          <input 
            type="number"
            className="number-input"
            placeholder="?"
            value={answers[`trouve_${index}`] || ''}
            onChange={(e) => {
              setAnswers({
                ...answers,
                [`trouve_${index}`]: e.target.value
              });
            }}
          />
          <span>=</span>
          <span>{exercice.result}</span>
          {answers[`trouve_${index}`] && (
            <span className="feedback">
              {Number(answers[`trouve_${index}`]) === (exercice.result - exercice.num1)
                ? '✅ Bravo Nono ! Tu as trouvé le bon chiffre ! 🌟' 
                : '❌ Essaie encore Nono ! Tu peux y arriver ! 💪'}
            </span>
          )}
        </div>
      ))}
    </section>
  );
}

export default TrouveChiffre; 