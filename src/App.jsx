import { useXORNeuralNet } from './hooks/useXORNeuralNet';
import ModeToggle from './components/ModeToggle.jsx';
import XORTable from './components/XORTable.jsx';
import NetworkVisualizer from './components/NetworkVisualizer.jsx';
import DecisionBoundary from './components/DecisionBoundary.jsx';
import ControlPanel from './components/ControlPanel.jsx';
import LossChart from './components/LossChart.jsx';
import PredictionResult from './components/PredictionResult.jsx';
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
        resetTraining,
        XOR_DATA
    } = useXORNeuralNet();

    const currentPrediction = predict(inputA, inputB);

    return (
        <div className="app-container" data-theme={theme}>
            {/* En-tête */}
            <header className="app-header">
                <div className="header-titles">
                    <h1>🧠 XOR Neural Network Explorer</h1>
                    <p>Découvrez comment un réseau de neurones résout l'impossible problème XOR.</p>
                </div>
                <button className="theme-toggle" onClick={toggleTheme} aria-label="Changer de thème">
                    {theme === "light" ? "🌙" : "☀️"}
                </button>
            </header>

            {/* Barre de sélection du modèle */}
            <div className="mode-selector-bar">
                <ModeToggle mode={mode} setMode={setMode} />
            </div>

            {/* Grille Principale Responsive */}
            <main className="dashboard-grid">
                
                {/* Colonne de Gauche : Le Défi & Test Manuel */}
                <section className="card left-panel">
                    <h2>1. Le Défi XOR & Test</h2>
                    <p className="hint">Le XOR (OU Exclusif) renvoie 1 si les entrées sont différentes, 0 sinon.</p>
                    
                    <XORTable data={XOR_DATA} predict={predict} />

                    <div className="manual-test-section">
                        <h3>Testez une combinaison</h3>
                        <div className="inputs-controls">
                            <label>
                                Entrée A: 
                                <select value={inputA} onChange={(e) => setInputA(Number(e.target.value))}>
                                    <option value={0}>0</option>
                                    <option value={1}>1</option>
                                </select>
                            </label>
                            <label>
                                Entrée B: 
                                <select value={inputB} onChange={(e) => setInputB(Number(e.target.value))}>
                                    <option value={0}>0</option>
                                    <option value={1}>1</option>
                                </select>
                            </label>
                        </div>
                        <PredictionResult prediction={currentPrediction} inputA={inputA} inputB={inputB} />
                    </div>
                </section>

                {/* Colonne du Centre : Le Cerveau (Visualiseur & Contrôles) */}
                <section className="card center-panel">
                    <h2>2. Architecture & Apprentissage</h2>
                    
                    {mode === "mlp" ? (
                        <>
                            <ControlPanel 
                                isTraining={isTraining} 
                                setIsTraining={setIsTraining} 
                                resetTraining={resetTraining}
                                epoch={epoch}
                                learningRate={learningRate}
                                setLearningRate={setLearningRate}
                            />
                            <NetworkVisualizer weights={weights} inputA={inputA} inputB={inputB} />
                        </>
                    ) : (
                        <div className="perceptron-notice">
                            <p>⚠️ Le Perceptron simple (sans couche cachée) ne peut pas résoudre le XOR mathématiquement ! Basculez sur le mode <strong>MLP</strong> pour voir le réseau apprendre.</p>
                        </div>
                    )}
                </section>

                {/* Colonne de Droite : Espace de Décision & Courbe de Perte */}
                <section className="card right-panel">
                    <h2>3. Espace de Décision & Erreur</h2>
                    <DecisionBoundary predict={predict} />
                    {mode === "mlp" && <LossChart history={lossHistory} />}
                </section>

            </main>
        </div>
    );
}

export default App;