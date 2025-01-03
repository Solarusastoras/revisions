import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveScore, clearScore, saveCalculatedScore } from '../../store/scoresSlice';
import ScoreCalculator from '../ScoreCalculator/ScoreCalculator';
import ValiDelete from '../ValiDelete/ValiDelete.js';
import './_double.scss';

function Double() {
  const dispatch = useDispatch();
  const answers = useSelector(state => state.scores.doubleAnswers) || {};
  const [showFeedback, setShowFeedback] = useState(false);
  const [answersValidated, setAnswersValidated] = useState(false);
  const [shuffledDoubles, setShuffledDoubles] = useState([]);

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

  // Fonction pour mélanger un tableau
  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Mélanger les questions au chargement et quand on clique sur "Tout effacer"
  useEffect(() => {
    setShuffledDoubles(shuffleArray(doubles));
  }, []);

  const handleAnswerChange = (index, value) => {
    setAnswersValidated(false);
    setShowFeedback(false);
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

  const validateAnswers = () => {
    setShowFeedback(true);
    setAnswersValidated(true);
  };

  const handleClearAll = () => {
    dispatch(clearScore('double')); // Efface les réponses
    setShowFeedback(false);
    setAnswersValidated(false);
    dispatch(saveCalculatedScore({ // Efface aussi la note
      exercise: 'double',
      score: null
    }));
    // Mélanger à nouveau les questions
    setShuffledDoubles(shuffleArray(doubles));
  };

  const getFeedbackMessage = (isCorrect) => {
    if (isCorrect) {
        const messages = [
            "✅ Bravo Nono ! Tu es super forte ! 🌟",
            "✨ Waouh ! C'est parfait ! 🎀",
            "🌈 Incroyable ! Tu as tout bon ! 💖",
            "🎯 Excellent travail ! Tu brilles ! ⭐",
            "🦄 Magnifique ! Continue comme ça ! 🌸"
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }
    return "❌ Essaie encore !";
  };

  return (
    <section className="double-section">
      <h2>Le Double 🎯</h2>
      <ValiDelete 
        onValidate={validateAnswers}
        onClear={handleClearAll}
        scoreCalculator={
          <ScoreCalculator 
            correctAnswers={shuffledDoubles.map(item => item.number * 2)}
            exerciseKey="double"
            answersValidated={answersValidated}
          />
        }
      />
      {shuffledDoubles.map((item, index) => (
        <div key={index} className="exercise-row">
          <span>Double de {item.number}</span>
          <span>c'est</span>
          <input 
            type="number"
            placeholder="?"
            value={answers[`answer_${index}`] || ''}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />
          {showFeedback && answers[`answer_${index}`] && (
            <span className="feedback">
              {Number(answers[`answer_${index}`]) === item.number * 2 ?
              getFeedbackMessage(true) 
              : getFeedbackMessage(false)}
            </span>
          )}
        </div>
      ))}
    </section>
  );
}

export default Double;