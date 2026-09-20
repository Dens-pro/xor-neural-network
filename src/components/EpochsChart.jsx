function EpochsChart({ history }){
    if (!history || history.length === 0){
        return null; 
    }
    const width = 300; 
    const height = 150; 
    const padding = 20; 

    const maxLoss = Math.max(...history.map(h => h.loss));
    const maxEpoch = Math.max(...history.map(h => h.epoch));

    //convert each points (epoch, loss) in SVG (x, y)
    const points = history.map(h => {
        const x = padding + (h.epoch / maxEpoch) * (width - 2 * padding);
        const y = height - padding - (h.loss / maxLoss) * (height - 2 * padding); 
        return `${x},${y}`;
    }).join(" ");


    return (
        <div className="epochs-chat">
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <polyline points={points} fill="none" stroke="var(--accent)" strokeWidth="2" /> 
            <text x={padding} y={height - 2} fontSize="10" fill="var(--muted)">0</text>
            <text x={width - padding - 20} y={height - 2} fontSize="10" fill="var(--muted)">{maxEpoch}</text>
            </svg>
        </div>
    ); 
}

export default EpochsChart;