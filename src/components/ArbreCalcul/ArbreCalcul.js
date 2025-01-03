import React, { useState } from 'react';
import ScoreCalculator from '../ScoreCalculator/ScoreCalculator';
import useValiDelete from '../ValiDelete/ValiDelete';
import ValiDelete from '../ValiDelete/ValiDelete';
import './_arbre_calcul.scss';

function ArbreCalcul() {
  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem('arbreCalculAnswers');
    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });
  const [showFeedback, setShowFeedback] = useState(false);
  const [answersValidated, setAnswersValidated] = useState(false);
  
  const arbres = [
    {
      ligne1: { num1: 5, num2: 4, num3: 9 },
      ligne2: { resultat1: 9, resultat2: 9 },
      ligne3: { resultat: 18 }
    },
    {
      ligne1: { num1: 8, num2: 12, num3: 6 },
      ligne2: { resultat1: 20, resultat2: 6 },
      ligne3: { resultat: 26 }
    },
    {
      ligne1: { num1: 4, num2: 6, num3: 5, num4: 4 },
      ligne2: { resultat1: 10, resultat2: 9 },
      ligne3: { resultat: 19 }
    },
    {
      ligne1: { num1: 1, num2: 9, num3: 3, num4: 6 },
      ligne2: { resultat1: 10, resultat2: 9 },
      ligne3: { resultat: 19 }
    }
  ];

  const correctAnswers = arbres.map(arbre => arbre.ligne3.resultat);

  const {
    handleAnswerChange,
    clearExerciseResult,
    validateAnswers,
    handleClearAll
  } = useValiDelete({
    exerciseKey: 'arbreCalcul',
    answers,
    setShowFeedback,
    setAnswersValidated
  });

  return (
    <section className="arbre-section">
      <h2>Arbre à calcul 🌳</h2>
      <ValiDelete 
        onValidate={validateAnswers}
        onClear={handleClearAll}
        scoreCalculator={
          <ScoreCalculator 
            answers={answers} 
            correctAnswers={correctAnswers} 
            localStorageKey="arbreCalculAnswers"
            setAnswers={setAnswers}
          />
        }
      />
      {arbres.map((arbre, index) => (
        <div key={index} className="arbre-container">
          <div className="tree-content">
            <div className="arbre-ligne1">
              <span>{arbre.ligne1.num1}</span>
              <span>+</span>
              <span>{arbre.ligne1.num2}</span>
              <span>+</span>
              <span>{arbre.ligne1.num3}</span>
              {arbre.ligne1.num4 && (
                <>
                  <span>+</span>
                  <span>{arbre.ligne1.num4}</span>
                </>
              )}
            </div>
            <div className="arbre-ligne2">
              <input
                type="number"
                className="number-input"
                placeholder="?"
                value={answers[`resultat1_${index}`] || ''}
                onChange={(e) => handleAnswerChange(e, `resultat1_${index}`)}
              />
              <span>+</span>
              <input
                type="number"
                className="number-input"
                placeholder="?"
                value={answers[`resultat2_${index}`] || ''}
                onChange={(e) => handleAnswerChange(e, `resultat2_${index}`)}
              />
            </div>
            <div className="arbre-ligne3">
              <input
                type="number"
                className="number-input"
                placeholder="?"
                value={answers[`final_${index}`] || ''}
                onChange={(e) => handleAnswerChange(e, `final_${index}`)}
              />
            </div>
            {showFeedback && (
              <div className="feedback">
                {Number(answers[`resultat1_${index}`]) === arbre.ligne2.resultat1 &&
                 Number(answers[`resultat2_${index}`]) === arbre.ligne2.resultat2 &&
                 Number(answers[`final_${index}`]) === arbre.ligne3.resultat
                  ? '✅ Bravo Nono ! Tes calculs sont justes ! 🌟'
                  : '❌ Essaie encore Nono ! Tu peux y arriver ! 💪'}
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}

export default ArbreCalcul;