import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveCalculatedScore } from '../../store/scoresSlice';

function Moyenne() {
    const dispatch = useDispatch();
    const scores = useSelector(state => state.scores) || {
        doubleAnswers: {},
        moitieAnswers: {},
        ecrisAnswers: {},
        calculsAnswers: {},
        arbreCalculAnswers: {},
        trouveChiffreAnswers: {},
        savedScores: {}
    };

    const calculateExerciseScore = (answers, correctAnswers) => {
        if (!answers || Object.keys(answers).length === 0) return 0;
        let correctCount = 0;
        Object.keys(answers).forEach(key => {
            const index = parseInt(key.split('_')[1]);
            if (Number(answers[key]) === correctAnswers[index]) {
                correctCount++;
            }
        });
        return (correctCount / Object.keys(answers).length) * 20;
    };

    const exercises = [
        {
            name: 'Double 🎯',
            key: 'doubleAnswers',
            correctAnswers: Array.from({length: 10}, (_, i) => (i + 1) * 2)
        },
        {
            name: 'Moitié 📏',
            key: 'moitieAnswers',
            correctAnswers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => n / 2)
        },
        {
            name: 'Écris ✏️',
            key: 'ecrisAnswers',
            correctAnswers: ['un', 'deux', 'trois']
        },
        {
            name: 'Trouve le chiffre 🔍',
            key: 'trouveChiffreAnswers',
            correctAnswers: [5, 6, 11, 6, 18, 3, 10, 24, 9, 38, 8, 4]
        },
        {
            name: 'Calcul en ligne ! 🧮',
            key: 'calculsAnswers',
            correctAnswers: [9, 6, 18, 10, 20]
        },
        {
            name: 'Arbre à calcul 🌳',
            key: 'arbreCalculAnswers',
            correctAnswers: [18, 26, 19, 19]
        }
    ];

    const getExerciseScore = (exercise) => {
        const savedScore = scores?.savedScores?.[exercise.key] ?? 0;
        return savedScore;
    };

    const handleScoreChange = (exercise, value) => {
        // Limiter la valeur entre 0 et 20
        const score = Math.min(Math.max(0, Number(value) || 0), 20);
        dispatch(saveCalculatedScore({
            exercise: exercise.key,
            score: score
        }));
    };

    const getAppreciation = (score) => {
        if (score >= 16) return "Excellent! 🌟";
        if (score >= 14) return "Très bien! ⭐";
        if (score >= 12) return "Bien! 👍";
        if (score >= 10) return "Assez bien 👌";
        return "Continue tes efforts! 💪";
    };

    const averageScore = exercises
        .map(ex => Number(getExerciseScore(ex)))
        .reduce((acc, curr) => acc + curr, 0) / exercises.length;

    return (
        <div className="bulletin-container" style={{ 
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            maxWidth: '1200px',
            margin: '20px auto'
        }}>
            <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>
                Bulletin de Notes de Nono 📝
            </h2>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Exercice</th>
                        <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>Note /20</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Appréciation</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map((exercise, index) => {
                        const score = scores.savedScores[exercise.key] || 0;
                        return (
                            <tr key={index} style={{ borderBottom: '1px solid #dee2e6' }}>
                                <td style={{ padding: '12px' }}>{exercise.name}</td>
                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                    <input
                                        type="number"
                                        min="0"
                                        max="20"
                                        step="0.5"
                                        value={score}
                                        onChange={(e) => handleScoreChange(exercise, e.target.value)}
                                        style={{
                                            width: '60px',
                                            padding: '5px',
                                            textAlign: 'center',
                                            border: '1px solid #dee2e6',
                                            borderRadius: '4px',
                                            fontSize: '1em'
                                        }}
                                    />
                                </td>
                                <td style={{ padding: '12px' }}>{getAppreciation(score)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div style={{ 
                marginTop: '20px',
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '5px',
                textAlign: 'center'
            }}>
                <h3 style={{ color: '#333', marginBottom: '10px' }}>
                    Moyenne Générale: {averageScore.toFixed(2)}/20
                </h3>
                <p style={{ fontSize: '1.1em', color: '#666' }}>
                    Appréciation générale: {getAppreciation(averageScore)}
                </p>
            </div>
        </div>
    );
}

export default Moyenne;