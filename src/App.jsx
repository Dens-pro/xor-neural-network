import { useXORNeuralNet } from './hooks/useXORNeuralNet';
import ModeToggle from './components/ModeToggle.jsx';
import NetworkVisualizer from './components/NetworkVisualizer.jsx';
import DecisionBoundary from './components/DecisionBoundary.jsx';
import ControlPanel from './components/ControlPanel.jsx';
import EpochsChart from './components/EpochsChart.jsx';
import PredictionResult from './components/PredictionResult.jsx';
import InputForm from './components/InputForm.jsx';
import perceptronWeights from './models/weights/perceptron-weights.json';
import './App.css';

function App() {
    const {
        mode, setMode,
        weights,
        isTraining, setIsTraining,
        epoch,
        lossHistory,
        learningRate, setLearningRate,
        inputA, setInputA,
        inputB, setInputB,
        theme, toggleTheme,
        predict,
        resetTraining
    } = useXORNeuralNet();

    const currentPrediction = predict(inputA, inputB);

    return (
        <div className="app-container" data-theme={theme}>
            
            {/* 1. En-tête & Switch Modèle & Thème */}
            <header className="app-header">
                <div className="header-brand">
                    <h1>🧠 XOR Neural Net</h1>
                </div>
                <div className="header-actions">
                    <ModeToggle mode={mode} setMode={setMode} />
                    <button className="theme-toggle-btn" onClick={toggleTheme} title="Changer de thème">
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>
                </div>
            </header>

            {/* Flux Principal */}
            <main className="main-flow">

                {/* 2. Le Cerveau du Réseau (S'adapte dynamiquement MLP ou Perceptron) */}
                <section className="flow-card">
                    <h2>1. Architecture du Réseau ({mode.toUpperCase()})</h2>
                    <div className="visualizer-container">
                        <NetworkVisualizer 
                            mode={mode} 
                            weights={weights} 
                            perceptronWeights={perceptronWeights} 
                            inputA={inputA} 
                            inputB={inputB} 
                        />
                    </div>
                </section>

                {/* 3. Les Graphiques (Frontière & Loss) */}
                <section className="flow-card graphics-section">
                    <h2>2. Espace de Décision & Courbe d'Apprentissage</h2>
                    <div className="graphics-row">
                        <div className="graphic-box">
                            <DecisionBoundary predict={predict} />
                        </div>
                        <div className="graphic-box">
                            <EpochsChart history={lossHistory} />
                        </div>
                    </div>
                </section>

                {/* 4. Zone de Test Interactif & Commandes d'Entraînement */}
                <section className="flow-card play-section">
                    <h2>3. Entraînement & Test Interactif</h2>
                    
                    <div className="interactive-control-panel">
                        <ControlPanel 
                            isTraining={isTraining} 
                            setIsTraining={setIsTraining} 
                            resetTraining={resetTraining}
                            epoch={epoch}
                            learningRate={learningRate}
                            setLearningRate={setLearningRate}
                        />
                    </div>

                    <p className="section-hint">Testez une combinaison d'entrées en direct :</p>
                    
                    <div className="play-row">
                        <InputForm 
                            inputA={inputA} 
                            inputB={inputB} 
                            setInputA={setInputA} 
                            setInputB={setInputB} 
                        />
                        <PredictionResult prediction={currentPrediction} inputA={inputA} inputB={inputB} />
                    </div>
                </section>

            </main>
        </div>
    );
}

export default App;