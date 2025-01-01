import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveScore } from '../store/scoresSlice';
import ScoreCalculator from './ScoreCalculator';

function Double() {
  const dispatch = useDispatch();
  const answers = useSelector(state => state.scores.doubleAnswers) || {};

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

  const handleAnswerChange = (index, value) => {
    dispatch(saveScore({
      exercise: 'double',
      answers: {
        ...answers,
        [`answer_${index}`]: value
      }
    }));
  };

  const clearExerciseResult = (index) => {
    const newAnswers = { ...answers };
    delete newAnswers[`answer_${index}`];
    dispatch(saveScore({
      exercise: 'double',
      answers: newAnswers
    }));
  };

  return (
    <section className="doubles-section">
      <h2>Le Double 🎯</h2>
      <ScoreCalculator 
        correctAnswers={correctAnswers} 
        exerciseKey="double"
      />
      {doubles.map((item, index) => (
        <div key={index} className="exercise-row">
          <span>Double de {item.number}</span>
          <span>c'est</span>
          <input 
            type="number"
            placeholder="?"
            value={answers[`answer_${index}`] || ''}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
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