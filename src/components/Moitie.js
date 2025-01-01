import React, { useState } from 'react';

function Moitie() {
  const [answers, setAnswers] = useState({});
  
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

  return (
    <section className="moitie-section">
      <h2>La Moitié 📏</h2>
      {moities.map((item, index) => (
        <div key={index} className="exercise-row">
          <span>Moitié de {item.number}</span>
          <span>c'est</span>
          <input 
            type="number"
            placeholder="?"
            value={answers[`moitie_${index}`] || ''}
            onChange={(e) => {
              setAnswers({
                ...answers,
                [`moitie_${index}`]: e.target.value
              });
            }}
          />
          {answers[`moitie_${index}`] && (
            <span className="feedback">
              {Number(answers[`moitie_${index}`]) === item.number / 2 
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