import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveScore, clearScore, saveCalculatedScore } from '../../store/scoresSlice';
import ScoreCalculator from '../ScoreCalculator/ScoreCalculator';
import ValiDelete from '../ValiDelete/ValiDelete';
import './_ecris.scss';

function Ecris() {
  const [answersValidated, setAnswersValidated] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const dispatch = useDispatch();
  const answers = useSelector(state => state.scores.ecrisAnswers) || {};

  const numberToWord = {
    1: 'un',
    2: 'deux',
    3: 'trois',
    6: 'six',
    8: 'huit',
    9: 'neuf',
    10: 'dix',
  };

  const correctAnswers = Object.values(numberToWord);

  const handleAnswerChange = (index, value) => {
    const newAnswers = {
      ...answers,
      [`answer_${index}`]: value
    };
    dispatch(saveScore({
      exercise: 'ecris',
      answers: newAnswers
    }));
    setAnswersValidated(false);
  };

  const validateAnswers = () => {
    setAnswersValidated(true);
    setShowScore(true);
  };

  const handleClearAll = () => {
    dispatch(clearScore('ecris'));
    dispatch(saveCalculatedScore({
      exercise: 'ecris',
      score: null
    }));
    setAnswersValidated(false);
    setShowScore(false);
  };

  return (
    <section className="ecris-section">
      <h2>Écris les nombres en lettres ✏️</h2>
      <ValiDelete 
        onValidate={validateAnswers}
        onClear={handleClearAll}
        scoreCalculator={
          answersValidated && showScore ? (
            <ScoreCalculator 
              correctAnswers={Object.values(numberToWord)}
              exerciseKey="ecris"
              answersValidated={answersValidated}
              compareFunction={(userAnswer, correctAnswer) => 
                userAnswer.toLowerCase().trim() === correctAnswer
              }
            />
          ) : null
        }
      />
      {Object.entries(numberToWord).map(([number, word], index) => (
        <div key={index} className="exercise-row">
          <span>Écris le nombre</span>
          <span className="number-to-write">{number}</span>
          <input 
            type="text"
            placeholder="écris en lettres"
            value={answers[`answer_${index}`] || ''}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />
          {answersValidated && answers[`answer_${index}`] && (
            <span className="feedback">
              {answers[`answer_${index}`].toLowerCase() === word
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