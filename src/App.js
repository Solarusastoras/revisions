import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './App.css';
import Double from './components/Double/Double';
import Moitie from './components/Moitie/Moitie';
import Ecris from './components/Ecris/Ecris';
import Calculs from './components/Calculs/Calculs';
import ArbreCalcul from './components/ArbreCalcul/ArbreCalcul';
import TrouveChiffre from './components/TrouveChiffre/TrouveChiffre';
import Moyenne from './components/Moyenne/Moyenne';

function App() {
  const [currentExercise, setCurrentExercise] = useState('moyenne'); // Changed from 'double' to 'moyenne'

  const handleExerciseChange = (event, exercise) => {
    event.preventDefault();
    setCurrentExercise(exercise);
  };

  const renderExercise = () => {
    switch(currentExercise) {
      case 'moyenne':
        return <Moyenne />;
      case 'double':
        return <Double />;
      case 'moitie':
        return <Moitie />;
      case 'ecris':
        return <Ecris />;
      case 'calculs':
        return <Calculs />;
      case 'arbre':
        return <ArbreCalcul />;
      case 'trouve':
        return <TrouveChiffre />;
      default:
        return <Moyenne />; // Changed from <Double /> to <Moyenne />
    }
  };

  return (
    <Provider store={store}>
      <div className="App">
        <h1>✨ Le Paradis des Maths de Nono 🎀</h1>
        
        <div className="exercise-buttons">
          <button 
            className={`bulletin-button ${currentExercise === 'moyenne' ? 'active' : ''}`}
            onClick={(event) => handleExerciseChange(event, 'moyenne')}
          >
            Bulletin de note 📝
          </button>
          
          <div className="other-exercises">
            <button 
              className={`exercise-button ${currentExercise === 'double' ? 'active' : ''}`}
              onClick={(event) => handleExerciseChange(event, 'double')}
            >
              Double 🦄
            </button>
            <button 
              className={`exercise-button ${currentExercise === 'moitie' ? 'active' : ''}`}
              onClick={(event) => handleExerciseChange(event, 'moitie')}
            >
              Moitié 🎀
            </button>
            <button 
              className={`exercise-button ${currentExercise === 'ecris' ? 'active' : ''}`}
              onClick={(event) => handleExerciseChange(event, 'ecris')}
            >
              Écris 🌸
            </button>
            <button 
              className={`exercise-button ${currentExercise === 'calculs' ? 'active' : ''}`}
              onClick={(event) => handleExerciseChange(event, 'calculs')}
            >
              Calculs Magiques ✨
            </button>
            <button 
              className={`exercise-button ${currentExercise === 'arbre' ? 'active' : ''}`}
              onClick={(event) => handleExerciseChange(event, 'arbre')}
            >
              Arbre Enchanté 🌺
            </button>
            <button 
              className={`exercise-button ${currentExercise === 'trouve' ? 'active' : ''}`}
              onClick={(event) => handleExerciseChange(event, 'trouve')}
            >
              Chasse aux Chiffres 🌈
            </button>
          </div>
        </div>

        {renderExercise()}
      </div>
    </Provider>
  );
}

export default App;
