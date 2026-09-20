import React from 'react';

export default function ControlPanel({ 
    isTraining, 
    setIsTraining, 
    resetTraining, 
    epoch, 
    learningRate, 
    setLearningRate 
}) {
    return (
        <div className="control-panel">
            <div className="control-buttons">
                <button 
                    className={`btn-train ${isTraining ? 'pause' : 'play'}`}
                    onClick={() => setIsTraining(!isTraining)}
                >
                    {isTraining ? '⏸️ Pause Entraînement' : '▶️ Lancer l\'Entraînement'}
                </button>
                
                <button className="btn-reset" onClick={resetTraining} title="Remettre à zéro les poids">
                    🔄 Réinitialiser
                </button>
            </div>

            <div className="control-stats">
                <div className="stat-item">
                    <span className="stat-label">Époques :</span>
                    <strong className="stat-value">{epoch}</strong>
                </div>

                <div className="stat-item learning-rate-control">
                    <label htmlFor="lr-range" className="stat-label">
                        Vitesse (LR): {learningRate}
                    </label>
                    <input 
                        id="lr-range"
                        type="range" 
                        min="0.1" 
                        max="1.0" 
                        step="0.05" 
                        value={learningRate} 
                        onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                    />
                </div>
            </div>
        </div>
    );
}