import React, { useState, useEffect } from 'react';
import ScoreCalculator from '../ScoreCalculator/ScoreCalculator';
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

  const handleAnswerChange = (e, key) => {
    const newAnswers = { 
      ...answers, 
      [key]: e.target.value
    };
    setAnswers(newAnswers);
  };

  const validateAnswers = () => {
    setAnswersValidated(true);
    setShowFeedback(true);
    
    // Créer une copie des réponses existantes
    const allAnswers = { ...answers };
    
    // Ajouter les réponses formatées pour le score sans écraser les existantes
    arbres.forEach((_, index) => {
      allAnswers[`answer_${index}`] = answers[`final_${index}`];
    });
    
    // Sauvegarder toutes les réponses
    localStorage.setItem('arbreCalculAnswers', JSON.stringify(allAnswers));
    // Mettre à jour l'état en gardant toutes les réponses
    setAnswers(allAnswers);
  };

  const handleClearAll = () => {
    setAnswers({});
    setShowFeedback(false);
    setAnswersValidated(false);
    localStorage.removeItem('arbreCalculAnswers');
  };

  return (
    <section className="arbre-section">
      <h2>Arbre à calcul 🌳</h2>
      <ValiDelete 
        onValidate={validateAnswers}
        onClear={handleClearAll}
        scoreCalculator={
          <ScoreCalculator 
            correctAnswers={correctAnswers}
            exerciseKey="arbreCalcul"
            answersValidated={answersValidated}
            compareFunction={(userAnswer, correctAnswer) => 
              Number(userAnswer) === Number(correctAnswer)
            }
            answers={answers} // Ajouter cette prop
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