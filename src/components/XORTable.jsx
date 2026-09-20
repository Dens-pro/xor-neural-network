import React from 'react';
import './XORTable.css'; // On créera ou adaptera ce fichier CSS juste après si besoin

export default function XORTable({ data, predict }) {
    return (
        <div className="xor-table-container">
            <p className="table-subtitle">Table de vérité & État du modèle :</p>
            <div className="xor-grid">
                {data.map((item, index) => {
                    // Calcul de la prédiction du modèle pour cette entrée
                    const rawPrediction = predict(item.X, item.Y);
                    const predictedBinary = rawPrediction >= 0.5 ? 1 : 0;
                    const isCorrect = predictedBinary === item.target;

                    return (
                        <div 
                            key={index} 
                            className={`xor-card ${isCorrect ? 'correct' : 'incorrect'}`}
                        >
                            <div className="xor-inputs">
                                <span>{item.X}</span>
                                <span className="xor-symbol">⊕</span>
                                <span>{item.Y}</span>
                            </div>
                            <div className="xor-arrow">➔</div>
                            <div className="xor-target">
                                Cible: <strong>{item.target}</strong>
                            </div>
                            <div className="xor-prediction">
                                Prédit: <span>{predictedBinary}</span> 
                                <small>({(rawPrediction * 100).toFixed(0)}%)</small>
                            </div>
                            <div className="status-badge">
                                {isCorrect ? '✅' : '❌'}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}