import React from 'react';

// Fonction utilitaire pour calculer la moyenne
function calculateAverage(scores) {
    if (scores.length === 0) return 0;
    const total = scores.reduce((acc, score) => acc + score, 0);
    return total / scores.length;
}

// Composant React
function Moyenne() {
    return (
        <div className="moyenne-container" style={{  padding: '20px' }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Double 🎯</li>
                <li style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Moitié 📏</li>
                <li style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Écris ✏️</li>
                <li style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Trouve le chiffre 🔍</li>
                <li style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>C'est Calcul ! 🧮</li>
                <li style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Arbre à calcul 🌳</li>
            </ul>
        </div>
    );
}

export { Moyenne, calculateAverage as default };