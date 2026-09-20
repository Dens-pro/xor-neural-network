import React from 'react';

export default function EpochsChart({ history }) {
    // S'assurer qu'on extrait bien la valeur numérique de la loss (qu'on recoive un nombre ou un objet)
    const rawData = history && history.length > 0 ? history : [0.5];
    const data = rawData.map(item => typeof item === 'object' ? item.loss : item);
    
    const width = 300;
    const height = 140;
    const padding = 20;

    const maxLoss = 1.0; // La loss varie généralement entre 0 et 1 pour le XOR
    const minLoss = 0.0;

    // Calcul des coordonnées SVG pour chaque point de la loss
    const points = data.map((val, index) => {
        const x = padding + (index / Math.max(data.length - 1, 1)) * (width - 2 * padding);
        // Inversion de l'axe Y (le haut du SVG c'est 0)
        const y = height - padding - ((val - minLoss) / (maxLoss - minLoss)) * (height - 2 * padding);
        return `${x},${Math.max(padding, Math.min(height - padding, y))}`;
    }).join(' ');

    const currentLoss = data[data.length - 1].toFixed(4);

    return (
        <div className="epochs-chart-container" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="chart-header" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.85rem', marginBottom: '4px', color: 'var(--text-muted)' }}>
                <span>📉 Courbe de Loss (Erreur)</span>
                <span>Actuelle : <strong>{currentLoss}</strong></span>
            </div>
            
            <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="epochs-svg" style={{ background: 'var(--card-bg)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                {/* Lignes de repère horizontales */}
                <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="var(--border-color)" strokeDasharray="4" />
                <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="var(--border-color)" strokeDasharray="4" />
                <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="var(--border-color)" />

                {/* La courbe de l'historique */}
                {data.length > 1 && (
                    <polyline
                        fill="none"
                        stroke="var(--accent-blue)"
                        strokeWidth="2.5"
                        points={points}
                    />
                )}
            </svg>
        </div>
    );
}