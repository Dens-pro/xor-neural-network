// This script train the two models at the same time
import { trainPerceptron } from './src/models/perceptron.js';
import { trainMLP } from './src/models/mlp.js'; 
import fs from 'fs'; 

const xorData = [
    { A: 0, B: 0, target: 0},
    { A: 0, B: 1, target: 1},
    { A: 1, B: 0, target: 1},
    { A: 1, B: 1, target: 0}
];

const perceptronResult = trainPerceptron(xorData, 100, 0.1);
const mlpResult = trainMLP(xorData, 4, 5000, 0.5); 

fs.mkdirSyn('src/models/weights', { recursive: true });
fs.mkdirSyn('src/models/history', { recursive: true });

fs.writeFileSync(
    'src/models/weights/perceptron-weights.json',
    JSON.stringify({ w1: perceptronResult.w1, w2: perceptronResult.w2, b: perceptronResult.b }, null, 2)
);

fs.writeFileSync(
    'src/models/weights/mlp-weights.json',
    JSON.stringify(mlpResultResult.weights, null, 2)
);

fs.writeFileSync(
    'src/models/history/mlp-history.json',
    JSON.stringify(mlpResult.history, null, 2)
);

console.log("Poids et historique sauvegardés dans src/models/weights et src/models/history/");

