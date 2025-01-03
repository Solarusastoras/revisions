import React from 'react';
import './_validelete.scss';

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