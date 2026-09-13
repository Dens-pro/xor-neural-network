function PredictionResult({ prediction, inputA, inputB }){
    if (prediction === null){
        return <p className="result-empty">Aucune prédiction encore.</p>;
    }
    const expected = inputA !== inputB? 1 : 0; //XOR logic 
    const success = prediction === expected;
    return(
        <div className="result">
            <p>prédiction: <strong>{prediction}</strong></p> 
            <p>Attendu (XOR): <strong>{expected}</strong></p>
        <p className={success ? "success" : "failure"}>{success ? "✓ Succès" : "X Echec"}</p>
        </div>
    );
}

export default PredictionResult;