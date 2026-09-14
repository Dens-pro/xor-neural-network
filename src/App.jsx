import { useState } from 'react';
import { perceptronForward } from './models/perceptron.js';
import { mlpForward } from './models/mlp.js';
import perceptronWeights from './models/weights/perceptron-weights.json'; 
import mlpWeights from './models/weights/mlp-weights.json';
import mlpHistory from './models/history/mlp-history.json'; 
import ModeToggle from './components/ModeToggle.jsx';
import InputForm from './components/InputForm.jsx';
import PredictionResult from './components/PredictionResult.jsx';
import EpochsChart from './components/EpochsChart.jsx';
import './App.css'; 


function App() {
    const [mode, setMode] = useState("perceptron");
    const [inputA, setInputA] = useState(0);
    const [inputB, setInputB] = useState(0);
    const [prediction, setPrediction] = useState(null);
    const [theme, setTheme] = useState("light");
    
    function handleSubmit() {
        let result; 

        if(mode === "perceptron") {
            result = perceptronForward(
                inputA, inputB,
                perceptronWeights.w1, perceptronWeights.w2, perceptronWeights.b
            );
        } else {
            const { output } = mlpForward(inputA, inputB, mlpWeights);
            result = output >= 0.5 ? 1 : 0;
        }
        setPrediction(result);
    }

    function toggleTheme() {
        setTheme(theme === "light" ? "dark": "light");
    }
    return (
        <div className="app" data-theme={theme}>
            <button className="theme-toggle" onClick={toggleTheme}>
                {theme === "light" ? "🌙": "☀️"}
            </button>
            <h1>XOR Neural Network</h1>
            <p className="instruction">Choisis A et B (0 ou 1), puis observe la prédiction</p>

            <ModeToggle mode={mode} setMode={setMode} /> 

            <InputForm
                inputA={inputA}
                inputB={inputB}
                setInputA={setInputA}
                setInputB={setInputB}
                onSubmit={handleSubmit}
                /> 

            <PredictionResult prediction={prediction} inputA={inputA} inputB={inputB} /> 

            {mode === "mlp" && <EpochsChart history={mlpHistory} />}
        
        </div>
    );
}

export default App;