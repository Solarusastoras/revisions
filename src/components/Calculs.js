import React, { useState } from 'react';

function Calculs() {
  const [answers, setAnswers] = useState({});
  
  const calculs = [
    { num1: 4, num2: 2, num3: 3, total: 9 },
    { num1: 1, num2: 2, num3: 3, total: 6 },
    { num1: 5, num2: 5, num3: 8, total: 18 },
    { num1: 6, num2: 3, num3: 1, total: 10 },
    { num1: 9, num2: 9, num3: 2, total: 20 }
  ];

  return (
    <section className="calculs-section">
      <h2>Complete 🧮</h2>
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
            value={answers[`calcul_${index}`] || ''}
            onChange={(e) => {
              setAnswers({
                ...answers,
                [`calcul_${index}`]: e.target.value
              });
            }}
          />
          {answers[`calcul_${index}`] && (
            <span className="feedback">
              {Number(answers[`calcul_${index}`]) === (item.num1 + item.num2 + item.num3)
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