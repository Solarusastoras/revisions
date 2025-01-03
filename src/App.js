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
  const [currentExercise, setCurrentExercise] = useState('double');

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
        return <Double />;
    }
  };

  return (
    <Provider store={store}>
      <div className="App">
        <h1>Les Maths CP de Nono 🌟</h1>
        
        <div className="exercise-buttons">
          <button 
            className={currentExercise === 'moyenne' ? 'active' : ''} 
            onClick={(event) => handleExerciseChange(event, 'moyenne')}
          >
           Bulletin de note 
          </button>
          <button 
            className={currentExercise === 'double' ? 'active' : ''} 
            onClick={(event) => handleExerciseChange(event, 'double')}
          >
            Double 🎯
          </button>
          <button 
            className={currentExercise === 'moitie' ? 'active' : ''} 
            onClick={(event) => handleExerciseChange(event, 'moitie')}
          >
            Moitié 📏
          </button>
          <button 
            className={currentExercise === 'ecris' ? 'active' : ''} 
            onClick={(event) => handleExerciseChange(event, 'ecris')}
          >
            Écris ✏️
          </button>
          <button 
            className={currentExercise === 'calculs' ? 'active' : ''} 
            onClick={(event) => handleExerciseChange(event, 'calculs')}
          >
            C'est Calcul ! 🧮
          </button>
          <button 
            className={currentExercise === 'arbre' ? 'active' : ''} 
            onClick={(event) => handleExerciseChange(event, 'arbre')}
          >
            Arbre à calcul 🌳
          </button>
          <button 
            className={currentExercise === 'trouve' ? 'active' : ''} 
            onClick={(event) => handleExerciseChange(event, 'trouve')}
          >
            Trouve le chiffre 🔍
          </button>
        </div>

        {renderExercise()}
      </div>
    </Provider>
  );
}

export default App;
