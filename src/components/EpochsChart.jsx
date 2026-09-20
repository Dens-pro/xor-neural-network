import React from 'react';

export default function EpochsChart({ history }) {
    const data = history && history.length > 0 ? history : [0.5];
    
    const width = 300;
    const height = 140;
    const padding = 20;

    const maxLoss = 1.0;
    const minLoss = 0.0;

    const points = data.map((val, index) => {
        const x = padding + (index / Math.max(data.length - 1, 1)) * (width - 2 * padding);
        const y = height - padding - ((val - minLoss) / (maxLoss - minLoss)) * (height - 2 * padding);
        return `${x},${Math.max(padding, Math.min(height - padding, y))}`;
    }).join(' ');

    const currentLoss = data[data.length - 1].toFixed(4);

    // Fonction pour sauvegarder le graphique SVG en image PNG
    const handleDownload = () => {
        const svgElement = document.getElementById('epochs-svg-element');
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const URL = window.URL || window.webkitURL || window;
        const blobURL = URL.createObjectURL(svgBlob);
        
        const image = new Image();
        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);
            
            const png = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = png;
            downloadLink.download = 'xor-loss-curve.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        };
        image.src = blobURL;
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.85rem', marginBottom: '4px', color: 'var(--text-muted)' }}>
                <span>📉 Courbe de Loss</span>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span>Actuelle : <strong>{currentLoss}</strong></span>
                    <button 
                        onClick={handleDownload} 
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }} 
                        title="Sauvegarder le graphique"
                    >
                        📥
                    </button>
                </div>
            </div>
            
            <svg id="epochs-svg-element" width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ background: 'var(--card-bg)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="var(--border-color)" strokeDasharray="4" />
                <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="var(--border-color)" />

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