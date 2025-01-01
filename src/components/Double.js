import React, { useState, useEffect } from 'react';
import ScoreCalculator from './ScoreCalculator';

function Double({ score, setScore }) {  // Ajouter les props ici
  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem('doubleAnswers');
    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });
  
  const doubles = [
    { number: 1 },
    { number: 2 },
    { number: 3 },
    { number: 4 },
    { number: 5 },
    { number: 6 },
    { number: 7 },
    { number: 8 },
    { number: 9 },
    { number: 10 }
  ];

  const correctAnswers = doubles.map(item => item.number * 2);

  const clearExerciseResult = (index) => {
    const newAnswers = { ...answers };
    delete newAnswers[`answer_${index}`];
    setAnswers(newAnswers);
  };

  return (
    <section className="doubles-section">
      <h2>Le Double 🎯</h2>
      <ScoreCalculator 
        answers={answers} 
        correctAnswers={correctAnswers} 
        localStorageKey="doubleAnswers"
        score={score}
        setScore={setScore}
        setAnswers={setAnswers}  // Ajouter cette ligne
      />
      {doubles.map((item, index) => (
        <div key={index} className="exercise-row">
          <span>Double de {item.number}</span>
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
              {Number(answers[`answer_${index}`]) === item.number * 2 
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

export default Double;