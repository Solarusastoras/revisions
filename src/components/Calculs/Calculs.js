import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveScore, clearScore, saveCalculatedScore } from '../../store/scoresSlice';
import ScoreCalculator from '../ScoreCalculator/ScoreCalculator';
import ValiDelete from '../ValiDelete/ValiDelete';
import './_calculs.scss';

function Calculs() {
  const dispatch = useDispatch();
  const answers = useSelector(state => state.scores.calculsAnswers) || {};
  const [showFeedback, setShowFeedback] = useState(false);
  const [answersValidated, setAnswersValidated] = useState(false);
  
  const calculs = [
    { num1: 4, num2: 2, num3: 3, total: 9 },
    { num1: 1, num2: 2, num3: 3, total: 6 },
    { num1: 5, num2: 5, num3: 8, total: 18 },
    { num1: 6, num2: 3, num3: 1, total: 10 },
    { num1: 9, num2: 9, num3: 2, total: 20 }
  ];

  const correctAnswers = calculs.map(item => item.num1 + item.num2 + item.num3);

  const handleAnswerChange = (e, index) => {
    setAnswersValidated(false);
    setShowFeedback(false);
    dispatch(saveScore({
      exercise: 'calculs',
      answers: {
        ...answers,
        [`answer_${index}`]: e.target.value
      }
    }));
  };

  const validateAnswers = () => {
    setShowFeedback(true);
    setAnswersValidated(true);
  };

  const handleClearAll = () => {
    dispatch(clearScore('calculs'));
    setShowFeedback(false);
    setAnswersValidated(false);
    dispatch(saveCalculatedScore({
      exercise: 'calculs',
      score: null
    }));
  };

  return (
    <section className="calculs-section">
      <h2>Calcul en ligne 🧮</h2>
      <ValiDelete 
        onValidate={validateAnswers}
        onClear={handleClearAll}
        scoreCalculator={
          <ScoreCalculator 
            correctAnswers={correctAnswers}
            exerciseKey="calculs"
            answersValidated={answersValidated}
          />
        }
      />
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
            onChange={(e) => handleAnswerChange(e, index)}
          />
          {showFeedback && answers[`answer_${index}`] && (
            <span className="feedback">
              {Number(answers[`answer_${index}`]) === (item.num1 + item.num2 + item.num3)
                ? '✅ Bravo Nono ! Tu as trouvé le bon résultat ! 🌟' 
                : '❌ Essaie encore Nono ! Tu peux y arriver ! 💪'}
            </span>
          )}
        </div>
      ))}
    </section>
  );
}

export default Calculs;