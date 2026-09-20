import React from 'react';

export default function NetworkVisualizer({ mode, weights, perceptronWeights, inputA, inputB }) {
    // Dimensions du SVG
    const width = 400;
    const height = 220;

    if (mode === 'perceptron') {
        // --- AFFICHAGE DU PERCEPTRON (1 seul neurone de sortie) ---
        const xInput = 100;
        const xOutput = 300;
        const yInputs = [70, 150];
        const yOutput = 110;

        // Poids du perceptron (fixes ou chargés depuis ton json)
        const w1 = perceptronWeights?.w1 || 0.5;
        const w2 = perceptronWeights?.w2 || 0.5;

        return (
            <div className="network-visualizer" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="net-legend" style={{ fontSize: '0.8rem', marginBottom: '8px', color: 'var(--text-muted)' }}>
                    <span>💡 Le Perceptron (Neurone Unique) : Incapable de séparer le XOR par une seule ligne droite.</span>
                </div>

                <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ background: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    
                    {/* Connexions Entrées -> Sortie */}
                    <line x1={xInput} y1={yInputs[0]} x2={xOutput} y2={yOutput} stroke={w1 >= 0 ? 'var(--accent-green)' : 'var(--accent-red)'} strokeWidth="3" strokeOpacity="0.7" />
                    <line x1={xInput} y1={yInputs[1]} x2={xOutput} y2={yOutput} stroke={w2 >= 0 ? 'var(--accent-green)' : 'var(--accent-red)'} strokeWidth="3" strokeOpacity="0.7" />

                    {/* Nœuds d'entrée A et B */}
                    <g>
                        <circle cx={xInput} cy={yInputs[0]} r="18" fill="var(--card-bg)" stroke="var(--accent-blue)" strokeWidth="2.5" />
                        <text x={xInput} y={yInputs[0]} dy="5" textAnchor="middle" fill="var(--text-color)" fontSize="12" fontWeight="bold">{inputA}</text>
                        <text x={xInput} y={yInputs[0] - 24} textAnchor="middle" fill="var(--text-muted)" fontSize="10">X1</text>
                    </g>
                    <g>
                        <circle cx={xInput} cy={yInputs[1]} r="18" fill="var(--card-bg)" stroke="var(--accent-blue)" strokeWidth="2.5" />
                        <text x={xInput} y={yInputs[1]} dy="5" textAnchor="middle" fill="var(--text-color)" fontSize="12" fontWeight="bold">{inputB}</text>
                        <text x={xInput} y={yInputs[1] - 24} textAnchor="middle" fill="var(--text-muted)" fontSize="10">X2</text>
                    </g>

                    {/* Neurone Unique de Sortie */}
                    <g>
                        <circle cx={xOutput} cy={yOutput} r="22" fill="var(--card-bg)" stroke="var(--accent-blue)" strokeWidth="3" />
                        <text x={xOutput} y={yOutput} dy="5" textAnchor="middle" fill="var(--text-color)" fontSize="12" fontWeight="bold">Σ</text>
                        <text x={xOutput} y={yOutput - 30} textAnchor="middle" fill="var(--text-muted)" fontSize="10">Sortie Linéaire</text>
                    </g>
                </svg>
            </div>
        );
    }

    // --- AFFICHAGE DU MLP (Ton code actuel avec la couche cachée) ---
    if (!weights) return null;

    const xInput = 60;
    const xHidden = 200;
    const xOutput = 340;
    const yInputs = [70, 150];
    const yHidden = [50, 100, 150, 200];
    const yOutput = 125;
    const { W1, W2 } = weights;

    return (
        <div className="network-visualizer" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="net-legend" style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', marginBottom: '8px', color: 'var(--text-muted)' }}>
                <span>🟢 Poids / Actif (+)</span>
                <span>🔴 Poids / Inactif (-)</span>
            </div>

            <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ background: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                
                {yInputs.map((yIn, i) => 
                    yHidden.map((yH, j) => {
                        const weightVal = W1[j] ? W1[j][i] : 0;
                        const strokeColor = weightVal >= 0 ? 'var(--accent-green)' : 'var(--accent-red)';
                        const strokeWidth = Math.min(Math.max(Math.abs(weightVal) * 1.5, 1), 5);
                        return <line key={`in-hid-${i}-${j}`} x1={xInput} y1={yIn} x2={xHidden} y2={yH} stroke={strokeColor} strokeWidth={strokeWidth} strokeOpacity="0.7" />;
                    })
                )}

                {yHidden.map((yH, j) => {
                    const weightVal = W2 ? W2[j] : 0;
                    const strokeColor = weightVal >= 0 ? 'var(--accent-green)' : 'var(--accent-red)';
                    const strokeWidth = Math.min(Math.max(Math.abs(weightVal) * 1.5, 1), 5);
                    return <line key={`hid-out-${j}`} x1={xHidden} y1={yH} x2={xOutput} y2={yOutput} stroke={strokeColor} strokeWidth={strokeWidth} strokeOpacity="0.7" />;
                })}

                {yInputs.map((y, i) => {
                    const val = i === 0 ? inputA : inputB;
                    return (
                        <g key={`input-${i}`}>
                            <circle cx={xInput} cy={y} r="18" fill="var(--card-bg)" stroke="var(--accent-blue)" strokeWidth="2.5" />
                            <text x={xInput} y={y} dy="5" textAnchor="middle" fill="var(--text-color)" fontSize="12" fontWeight="bold">{val}</text>
                            <text x={xInput} y={y - 24} textAnchor="middle" fill="var(--text-muted)" fontSize="10">X{i + 1}</text>
                        </g>
                    );
                })}

                {yHidden.map((y, j) => (
                    <g key={`hidden-${j}`}>
                        <circle cx={xHidden} cy={y} r="16" fill="var(--bg-color)" stroke="var(--border-color)" strokeWidth="2" />
                        <text x={xHidden} y={y} dy="4" textAnchor="middle" fill="var(--text-color)" fontSize="11" fontWeight="600">H{j + 1}</text>
                    </g>
                ))}

                <g>
                    <circle cx={xOutput} cy={yOutput} r="20" fill="var(--card-bg)" stroke="var(--accent-green)" strokeWidth="3" />
                    <text x={xOutput} y={yOutput} dy="5" textAnchor="middle" fill="var(--text-color)" fontSize="12" fontWeight="bold">Out</text>
                    <text x={xOutput} y={yOutput - 26} textAnchor="middle" fill="var(--text-muted)" fontSize="10">Sortie</text>
                </g>
            </svg>
        </div>
    );
}