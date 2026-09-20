import { useState, useEffect, useRef, useCallback } from 'react';
import { initWeights, mlpForward, backprop } from '../models/mlp.js';
import { perceptronForward } from '../models/perceptron.js';
import perceptronWeights from '../models/weights/perceptron-weights.json';

const XOR_DATA = [
    { X: 0, Y: 0, target: 0 },
    { X: 0, Y: 1, target: 1 },
    { X: 1, Y: 0, target: 1 },
    { X: 1, Y: 1, target: 0 },
];

export function useXORNeuralNet() {
    const [mode, setMode] = useState("mlp"); // "mlp" ou "perceptron"
    const [weights, setWeights] = useState(() => initWeights(4));
    const [isTraining, setIsTraining] = useState(false);
    const [epoch, setEpoch] = useState(0);
    const [lossHistory, setLossHistory] = useState([]);
    const [learningRate, setLearningRate] = useState(0.5);
    
    // Inputs pour le test manuel
    const [inputA, setInputA] = useState(0);
    const [inputB, setInputB] = useState(0);
    const [theme, setTheme] = useState("dark"); // Mode sombre par défaut pour le style IA

    const trainingRef = useRef(null);

    // Fonction de prédiction globale
    const predict = useCallback((a, b) => {
        if (mode === "perceptron") {
            return perceptronForward(a, b, perceptronWeights.w1, perceptronWeights.w2, perceptronWeights.b);
        } else {
            const { output } = mlpForward(a, b, weights);
            return output;
        }
    }, [mode, weights]);

    // Boucle d'entraînement pour le MLP
    useEffect(() => {
        if (!isTraining || mode === "perceptron") return;

        trainingRef.current = setInterval(() => {
            setWeights(prevWeights => {
                let currentWeights = { ...prevWeights };
                let totalLoss = 0;

                // Faire une époque d'entraînement sur les 4 exemples XOR
                for (let i = 0; i < XOR_DATA.length; i++) {
                    const { X, Y, target } = XOR_DATA[i];
                    const res = backprop(X, Y, target, currentWeights, learningRate);
                    currentWeights = { W1: res.W1, b1: res.b1, W2: res.W2, b2: res.b2 };
                    totalLoss += res.loss;
                }

                setEpoch(e => e + 1);
                setLossHistory(prev => [...prev.slice(-30), { epoch: epoch + 1, loss: totalLoss }]);

                return currentWeights;
            });
        }, 50);

        return () => clearInterval(trainingRef.current);
    }, [isTraining, mode, learningRate, epoch]);

    const resetTraining = () => {
        setIsTraining(false);
        setWeights(initWeights(4));
        setEpoch(0);
        setLossHistory([]);
    };

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    return {
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
    };
}