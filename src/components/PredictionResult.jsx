import React from 'react';

export default function PredictionResult({ prediction, inputA, inputB }) {
    // Si prediction est null ou undefined, on met une valeur par défaut
    const value = prediction !== null && prediction !== undefined ? prediction : 0;
    const percentage = (value * 100).toFixed(1);
    const isHigh = value >= 0.5;

    return (
        <div className="prediction-result-container">
            <div className="prediction-info">
                <span className="calc-expression">
                    {inputA} ⊕ {inputB} = ?
                </span>
            </div>
            
            <div className={`prediction-card ${isHigh ? 'active-bulb' : 'inactive-bulb'}`}>
                <div className="bulb-icon">
                    {isHigh ? '💡' : '🔌'}
                </div>
                <div className="prediction-details">
                    <span className="pred-label">Sortie du réseau :</span>
                    <strong className="pred-value">{isHigh ? '1 (Vrai)' : '0 (Faux)'}</strong>
                    <span className="pred-confidence">Confiance : {percentage}%</span>
                </div>
            </div>
        </div>
    );
}