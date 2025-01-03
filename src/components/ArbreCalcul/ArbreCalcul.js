import React, { useState } from 'react';
import './_arbre_calcul.scss';

function ArbreCalcul() {
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  
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

  const getFeedbackMessage = (isCorrect) => {
    if (isCorrect) {
      const messages = [
        "✨ Waouh ! C'est parfait ! 🎀",
        "🌈 Super calcul ! Tu es très forte ! 💖",
        "🎯 Excellent ! Continue comme ça ! ⭐",
        "🌟 Bravo Nono ! C'est tout juste ! 🎈",
        "🦄 Magnifique ! Tu es une championne ! 🌸"
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    }
    return "❌ Essaie encore !";
  };

  const handleAnswerChange = (e, key) => {
    const value = e.target.value;
    setAnswers(prev => ({
      ...prev,
      [key]: value
    }));
    setShowFeedback(false);
  };

  const calculateScore = () => {
    let correctCount = 0;
    arbres.forEach((arbre, index) => {
      if (Number(answers[`final_${index}`]) === arbre.ligne3.resultat) {
        correctCount++;
      }
    });
    return (correctCount / arbres.length) * 20;
  };

  const validateAnswers = () => {
    setShowFeedback(true);
    setScore(calculateScore());
  };

  const handleClearAll = () => {
    setAnswers({});
    setShowFeedback(false);
    setScore(0);
  };

  const getAppreciation = (score) => {
    if (score >= 16) return "Excellent ! Tu es une championne ! 🌟";
    if (score >= 14) return "Très bien ! Continue comme ça ! ⭐";
    if (score >= 12) return "Bien ! Tu progresses ! 🎯";
    if (score >= 10) return "Assez bien ! Courage ! 💪";
    if (score > 0) return "Continue tes efforts ! Tu peux y arriver ! 🌈";
    return "Commence l'exercice ! 📝";
  };

  return (
    <section className="arbre-section">
      <h2>Arbre à calcul 🌳</h2>
      
      <div className="controls">
        {showFeedback && (
          <div className="score-container">
            <div className="score">
              Note : {score.toFixed(2)}/20
            </div>
            <div className="appreciation">
              {getAppreciation(score)}
            </div>
          </div>
        )}
        <div className="buttons-container">
          <button onClick={validateAnswers} className="validate-btn">
            Correction ✅
          </button>
          <button onClick={handleClearAll} className="clear-btn">
            Tout effacer 🗑️
          </button>
        </div>
      </div>

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
            {showFeedback && answers[`final_${index}`] && (
              <div className={`feedback ${Number(answers[`final_${index}`]) === arbre.ligne3.resultat ? 'correct' : ''}`}>
                {getFeedbackMessage(
                  Number(answers[`resultat1_${index}`]) === arbre.ligne2.resultat1 &&
                  Number(answers[`resultat2_${index}`]) === arbre.ligne2.resultat2 &&
                  Number(answers[`final_${index}`]) === arbre.ligne3.resultat
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}

export default ArbreCalcul;