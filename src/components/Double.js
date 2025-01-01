import React, { useState } from 'react';

function Double() {
  const [answers, setAnswers] = useState({});
  
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

  return (
    <section className="doubles-section">
      <h2>Le Double 🎯</h2>
      {doubles.map((item, index) => (
        <div key={index} className="exercise-row">
          <span>Double de {item.number}</span>
          <span>c'est</span>
          <input 
            type="number"
            placeholder="?"
            value={answers[`double_${index}`] || ''}
            onChange={(e) => {
              setAnswers({
                ...answers,
                [`double_${index}`]: e.target.value
              });
            }}
          />
          {answers[`double_${index}`] && (
            <span className="feedback">
              {Number(answers[`double_${index}`]) === item.number * 2 
                ? '✅ Bravo Nono ! Tu es super forte ! 🌟' 
                : '❌ Allez Nono, tu peux y arriver ! 💪'}
            </span>
          )}
        </div>
      ))}
    </section>
  );
}

export default Double; 