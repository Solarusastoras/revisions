import React, { useState, useEffect } from 'react';
import CalculateAverage from './Moyenne';

function ScoreCalculator({ answers, correctAnswers, localStorageKey, setAnswers }) {  // Ajouter setAnswers aux props
  const [score, setScore] = useState(null);
  const [average, setAverage] = useState(null);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(answers));
  }, [answers, localStorageKey]);

  const calculateScore = (event) => {
    event.preventDefault();
    let correctCount = 0;
    correctAnswers.forEach((correctAnswer, index) => {
      if (Number(answers[`answer_${index}`]) === correctAnswer) {
        correctCount += 1;
      }
    });
    const calculatedScore = (correctCount / correctAnswers.length) * 20;
    setScore(calculatedScore);
    return calculatedScore;
  };

  const calculateAverage = () => {
    const scores = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    const avg = CalculateAverage(scores.map((_, index) => calculateScore()));
    setAverage(avg);
  };

  const clearResults = (event) => {
    event.preventDefault();
    setScore(null);
    setAverage(null);
    setAnswers({});  // Vider les réponses
    localStorage.removeItem(localStorageKey);
  };

  return (
    <div>
      {score !== null && <div className="score top-right" style={{ fontSize: '3rem' }}>Score: {score}/20</div>}
      {average !== null && <div className="average top-right" style={{ fontSize: '3rem' }}>Moyenne: {average}/20</div>}
      <button className="clear-button" onClick={calculateScore}>Calculer le score</button>
      <button className="clear-button" onClick={clearResults}>Effacer tous les résultats</button>
    </div>
  );
}

export default ScoreCalculator;
