import React from 'react';
import './_validelete.scss';
import { useState, useCallback } from 'react';

const useValiDelete = ({ 
  exerciseKey, 
  answers, 
  setAnswers,  // Add setAnswers to parameters
  setShowFeedback, 
  setAnswersValidated 
}) => {
  // ...existing code...

  const handleAnswerChange = useCallback((e, index) => {
    const value = e.target.value;
    const newAnswers = {
      ...answers,
      [`answer_${index}`]: value
    };
    
    localStorage.setItem(`${exerciseKey}Answers`, JSON.stringify(newAnswers));
    setAnswers(newAnswers);
    setShowFeedback(true);
  }, [answers, exerciseKey, setAnswers, setShowFeedback]);

  return {
    handleAnswerChange,
    // ...existing code...
  };
};

function ValiDelete({ onValidate, onClear, scoreCalculator }) {
  return (
    <div className="validelete-container">
      <div className="score-section">
        {scoreCalculator}
      </div>
      <div className="buttons-section">
        <button 
          className="validate-button"
          onClick={onValidate}
        >
          <span className="icon">✓</span>
          Correction
        </button>
        <button 
          className="clear-button"
          onClick={onClear}
        >
          <span className="icon">↺</span>
          Tout effacer
        </button>
      </div>
    </div>
  );
}

export default ValiDelete;