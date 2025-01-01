import React, { useState, useEffect } from 'react';
import ScoreCalculator from './ScoreCalculator';

function Calculs({ score, setScore }) {  // Ajouter les props ici
  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem('calculsAnswers');
    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });
  
  const calculs = [
    { num1: 4, num2: 2, num3: 3, total: 9 },
    { num1: 1, num2: 2, num3: 3, total: 6 },
    { num1: 5, num2: 5, num3: 8, total: 18 },
    { num1: 6, num2: 3, num3: 1, total: 10 },
    { num1: 9, num2: 9, num3: 2, total: 20 }
  ];

  const correctAnswers = calculs.map(item => item.num1 + item.num2 + item.num3);

  const clearExerciseResult = (index) => {
    const newAnswers = { ...answers };
    delete newAnswers[`answer_${index}`];
    setAnswers(newAnswers);
  };

  return (
    <section className="calculs-section">
      <h2>Complete 🧮</h2>
      <div className="exercise-buttons">
        <ScoreCalculator 
          answers={answers} 
          correctAnswers={correctAnswers} 
          localStorageKey="calculsAnswers"
          score={score}
          setScore={setScore}
          setAnswers={setAnswers}
        />
      </div>
      {calculs.map((item, index) => (
        <div key={index} className="exercise-row">
          <span>{item.num1}</span>
          <span>+</span>
          <span>{item.num2}</span>
          <span>+</span>
          <span>{item.num3}</span>
          <span>=</span>
          <input 
            type="number"
            className="number-input"
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
              {Number(answers[`answer_${index}`]) === (item.num1 + item.num2 + item.num3)
                ? '✅ Bravo Nono ! Tu as trouvé le bon résultat ! 🌟' 
                : '❌ Essaie encore Nono ! Tu peux y arriver ! 💪'}
            </span>
          )}
          <button className="clear-button" onClick={() => clearExerciseResult(index)}>Effacer</button>
        </div>
      ))}
    </section>
  );
}

export default Calculs;