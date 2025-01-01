import React, { useState, useEffect } from 'react';
import ScoreCalculator from './ScoreCalculator';

function ArbreCalcul() {
  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem('answers');
    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });
  const [score, setScore] = useState(null);
  const [average, setAverage] = useState(null);
  
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

  useEffect(() => {
    localStorage.setItem('answers', JSON.stringify(answers));
  }, [answers]);

  const correctAnswers = arbres.map(arbre => arbre.ligne3.resultat);

  const calculateScore = () => {
    let correctAnswers = 0;
    arbres.forEach((arbre, index) => {
      if (Number(answers[`resultat1_${index}`]) === arbre.ligne2.resultat1 &&
          Number(answers[`resultat2_${index}`]) === arbre.ligne2.resultat2 &&
          Number(answers[`final_${index}`]) === arbre.ligne3.resultat) {
        correctAnswers += 1;
      }
    });
    setScore((correctAnswers / arbres.length) * 20);
  };

  const calculateAverage = () => {
    const totalScore = arbres.length * 20;
    setAverage((score / totalScore) * 20);
  };

  const clearResults = () => {
    setAnswers({});
    setScore(null);
    setAverage(null);
    localStorage.removeItem('answers');
  };

  const clearExerciseResult = (index) => {
    const newAnswers = { ...answers };
    delete newAnswers[`resultat1_${index}`];
    delete newAnswers[`resultat2_${index}`];
    delete newAnswers[`final_${index}`];
    setAnswers(newAnswers);
  };

  return (
    <section className="arbre-section">
      <h2>Arbre à calcul 🌳</h2>
      <ScoreCalculator 
        answers={answers} 
        correctAnswers={correctAnswers} 
        localStorageKey="arbreCalculAnswers"
        setAnswers={setAnswers}
      />
      {arbres.map((arbre, index) => (
        <div key={index} className="arbre-container">
          {/* Première ligne - nombres de base */}
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

          {/* Deuxième ligne - premiers résultats */}
          <div className="arbre-ligne2">
            <input
              type="number"
              className="number-input"
              placeholder="?"
              value={answers[`resultat1_${index}`] || ''}
              onChange={(e) => {
                setAnswers({
                  ...answers,
                  [`resultat1_${index}`]: e.target.value
                });
              }}
            />
            <span>+</span>
            <input
              type="number"
              className="number-input"
              placeholder="?"
              value={answers[`resultat2_${index}`] || ''}
              onChange={(e) => {
                setAnswers({
                  ...answers,
                  [`resultat2_${index}`]: e.target.value
                });
              }}
            />
          </div>

          {/* Troisième ligne - résultat final */}
          <div className="arbre-ligne3">
            <input
              type="number"
              className="number-input"
              placeholder="?"
              value={answers[`final_${index}`] || ''}
              onChange={(e) => {
                setAnswers({
                  ...answers,
                  [`final_${index}`]: e.target.value
                });
              }}
            />
          </div>

          {/* Feedback */}
          {answers[`resultat1_${index}`] && answers[`resultat2_${index}`] && answers[`final_${index}`] && (
            <div className="feedback-container">
              <span className="feedback">
                {Number(answers[`resultat1_${index}`]) === arbre.ligne2.resultat1 &&
                 Number(answers[`resultat2_${index}`]) === arbre.ligne2.resultat2 &&
                 Number(answers[`final_${index}`]) === arbre.ligne3.resultat
                  ? '✅ Bravo Nono ! Tes calculs sont justes ! 🌟'
                  : '❌ Essaie encore Nono ! Tu peux y arriver ! 💪'}
              </span>
            </div>
          )}
          <button className="clear-button" onClick={() => clearExerciseResult(index)}>Effacer</button>
        </div>
      ))}
    </section>
  );
}

export default ArbreCalcul;