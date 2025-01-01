import React, { useState } from 'react';
import './App.css';
import Double from './components/Double';
import Moitie from './components/Moitie';
import Ecris from './components/Ecris';
import Calculs from './components/Calculs';
import ArbreCalcul from './components/ArbreCalcul';
import TrouveChiffre from './components/TrouveChiffre';
import Resultat from './components/Resultat';

function App() {
  const [currentExercise, setCurrentExercise] = useState('double');

  const handleExerciseChange = (event, exercise) => {
    event.preventDefault();
    setCurrentExercise(exercise);
  };

  const renderExercise = () => {
    switch(currentExercise) {
      case 'resultat':
        return <Resultat />;
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
    <div className="App">
      <h1>Les Maths avec Nono 🌟</h1>
      
      <div className="exercise-buttons">
        <button 
          className={currentExercise === 'resultat' ? 'active' : ''} 
          onClick={(event) => handleExerciseChange(event, 'resultat')}
        >
          Moyenne 
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
  );
}

export default App;
