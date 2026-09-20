import React, { useRef, useEffect } from 'react';

export default function DecisionBoundary({ predict }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const width = canvas.width;
        const height = canvas.height;
        const resolution = 10; // Taille des blocs de pixels pour la grille de fond

        // Effacer le canvas
        ctx.clearRect(0, 0, width, height);

        // 1. Dessiner la carte de chaleur (Espace de décision)
        for (let x = 0; x < width; x += resolution) {
            for (let y = 0; y < height; y += resolution) {
                // Normaliser les coordonnées du canvas (0 à 1)
                const inputA = x / width;
                const inputB = 1 - (y / height); // Inverser l'axe Y pour l'affichage mathématique

                const prediction = predict(inputA, inputB);

                // Couleur en fonction de la prédiction (Bleu pour 1, Rouge pour 0)
                if (prediction >= 0.5) {
                    ctx.fillStyle = `rgba(59, 130, 246, ${Math.min(prediction * 0.5, 0.4)})`;
                } else {
                    ctx.fillStyle = `rgba(239, 68, 68, ${Math.min((1 - prediction) * 0.5, 0.4)})`;
                }
                ctx.fillRect(x, height - y - resolution, resolution, resolution);
            }
        }

        // 2. Dessiner les 4 points du XOR de référence
        const points = [
            { x: 0, y: 0, target: 0 },
            { x: 0, y: 1, target: 1 },
            { x: 1, y: 0, target: 1 },
            { x: 1, y: 1, target: 0 },
        ];

        points.forEach(p => {
            const px = p.x * width;
            const py = height - (p.y * height);

            ctx.beginPath();
            ctx.arc(px, py, 7, 0, 2 * Math.PI);
            ctx.fillStyle = p.target === 1 ? '#2563eb' : '#ef4444';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();
        });

    }, [predict]); // Se redessine dès que la fonction de prédiction (et donc les poids) change

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '0.85rem', marginBottom: '4px', color: 'var(--text-muted)' }}>
                🗺️ Frontière de Décision (2D)
            </div>
            <div style={{ background: 'var(--card-bg)', borderRadius: '6px', border: '1px solid var(--border-color)', padding: '6px', display: 'flex', justifyContent: 'center' }}>
                <canvas 
                    ref={canvasRef} 
                    width={200} 
                    height={200} 
                    style={{ borderRadius: '4px', display: 'block' }}
                />
            </div>
        </div>
    );
}