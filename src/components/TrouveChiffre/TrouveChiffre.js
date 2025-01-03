import React, { useState } from 'react';
import ScoreCalculator from '../ScoreCalculator/ScoreCalculator';
import useValiDelete from '../ValiDelete/ValiDelete';
import ValiDelete from '../ValiDelete/ValiDelete';
import './_trouve_chiffre.scss';

function TrouveChiffre() {  
  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem('trouveChiffreAnswers');
    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });
  const [showFeedback, setShowFeedback] = useState(false);
  const [answersValidated, setAnswersValidated] = useState(false);
  
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

  const correctAnswers = exercices.map(exercice => exercice.result - exercice.num1);

  const {
    handleAnswerChange,
    clearExerciseResult,
    validateAnswers,
    handleClearAll
  } = useValiDelete({
    exerciseKey: 'trouveChiffre',
    answers,
    setShowFeedback,
    setAnswersValidated
  });

  return (
    <section className="trouve-chiffre-section">
      <h2>Trouve le chiffre manquant 🔍</h2>
      <ValiDelete 
        onValidate={validateAnswers}
        onClear={handleClearAll}
        scoreCalculator={
          <ScoreCalculator 
            answers={answers} 
            correctAnswers={correctAnswers} 
            localStorageKey="trouveChiffreAnswers"
            setAnswers={setAnswers}
          />
        }
      />
      {exercices.map((exercice, index) => (
        <div key={index} className="exercise-row">
          <span>{exercice.num1}</span>
          <span>+</span>
          <input 
            type="number"
            className="number-input"
            placeholder="?"
            value={answers[`answer_${index}`] || ''}
            onChange={(e) => {
              handleAnswerChange(e, index);
            }}
          />
          <span>=</span>
          <span>{exercice.result}</span>
          {answers[`answer_${index}`] && (
            <span className="feedback">
              {Number(answers[`answer_${index}`]) === (exercice.result - exercice.num1)
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