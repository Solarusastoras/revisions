import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveScore, clearScore, saveCalculatedScore } from '../../store/scoresSlice';
import ScoreCalculator from '../ScoreCalculator/ScoreCalculator';
import ValiDelete from '../ValiDelete/ValiDelete';
import './_moitie.scss';

function Moitie() {
  const dispatch = useDispatch();
  const answers = useSelector(state => state.scores.moitieAnswers) || {};
  const [showFeedback, setShowFeedback] = useState(false);
  const [answersValidated, setAnswersValidated] = useState(false);
  const [shuffledMoities, setShuffledMoities] = useState([]);

  const moities = [
    { number: 2 },
    { number: 4 },
    { number: 6 },
    { number: 8 },
    { number: 10 },
    { number: 12 },
    { number: 14 },
    { number: 16 },
    { number: 18 },
    { number: 20 }
  ];

  // Fonction pour mélanger le tableau
  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Mélanger les questions au chargement
  useEffect(() => {
    setShuffledMoities(shuffleArray(moities));
  }, []);

  const correctAnswers = moities.map(item => item.number / 2);

  const handleAnswerChange = (e, index) => {
    setAnswersValidated(false);
    setShowFeedback(false);
    dispatch(saveScore({
      exercise: 'moitie',
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
    dispatch(clearScore('moitie'));
    setShowFeedback(false);
    setAnswersValidated(false);
    dispatch(saveCalculatedScore({
      exercise: 'moitie',
      score: null
    }));
    // Mélanger à nouveau les questions
    setShuffledMoities(shuffleArray(moities));
  };

  return (
    <section className="moitie-section">
      <h2>La Moitié 📏</h2>
      <ValiDelete 
        onValidate={validateAnswers}
        onClear={handleClearAll}
        scoreCalculator={
          <ScoreCalculator 
            correctAnswers={shuffledMoities.map(item => item.number / 2)}
            exerciseKey="moitie"
            answersValidated={answersValidated}
          />
        }
      />
      {shuffledMoities.map((item, index) => (
        <div key={index} className="exercise-row">
          <span>Moitié de {item.number}</span>
          <span>c'est</span>
          <input 
            type="number"
            placeholder="?"
            value={answers[`answer_${index}`] || ''}
            onChange={(e) => handleAnswerChange(e, index)}
          />
          {showFeedback && answers[`answer_${index}`] && (
            <span className="feedback">
              {Number(answers[`answer_${index}`]) === item.number / 2 
                ? '✅ Bravo Nono ! Tu es super forte ! 🌟' 
                : '❌ Allez Nono, tu peux y arriver ! 💪'}
            </span>
          )}
        </div>
      ))}
    </section>
  );
}

export default Moitie;