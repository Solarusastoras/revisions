import React from 'react';
import './_validelete.scss';

function ValiDelete({ onValidate, onClear, scoreCalculator }) {
  return (
    <div className="buttons-container">
      {scoreCalculator}
      <div className="validate-actions">
        <button 
          className="validate-button"
          onClick={onValidate}
        >
          Valider les réponses
        </button>
        <button 
          className="clear-all-button"
          onClick={onClear}
        >
          Tout effacer
        </button>
      </div>
    </div>
  );
}

export default ValiDelete;