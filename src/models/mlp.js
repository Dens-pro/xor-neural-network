// The activation function of the mlp
function sigmoid(z){
    return 1 / (1 + Math.exp(-z));
}

// Its derivative 
function sigmoidDerivative(s){
    return s * (1 - s);
}

// The forward function of the mlp 
function mlpForward(X, Y, weights){
    const { W1, b1, W2, b2 } = weights;

    let hidden = []; 
    for (let i = 0; i < W1.length; i++){
        
        let z = X * W1[i][0] + Y * W1[i][1] + b1[i];
        hidden.push(sigmoid(z));
    }

    let zOut = 0;
    for (let i = 0; i < hidden.length; i++){
        zOut += hidden[i] * W2[i];
    }
    zOut += b2; 
    
    let output = sigmoid(zOut);
    return { hidden, output };
}

function outputDelta(output, target){
    let dLossDOutput = 2 * (output - target);
    let dOutputDzOut = sigmoidDerivative(output);
    return dLossDOutput * dOutputDzOut; 
}

function hiddenDeltas(deltaOut, W2, hidden){
    let deltaHidden = [];
    for (let i = 0; i < hidden.length; i++){
        let d = deltaOut * W2[i] * sigmoidDerivative(hidden[i]); 
        deltaHidden.push(d); 
    }
    return deltaHidden; 
}

// The backprop of the mlp 
function backprop(X, Y, target, weights, learningRate){
    let { W1, b1, W2, b2 } = weights; 

    
    const { hidden, output } = mlpForward(X, Y, weights); 

    const deltaOut = outputDelta(output, target); 
    const deltaHidden = hiddenDeltas(deltaOut, W2, hidden);

    
    for (let i = 0; i < W2.length; i++){
        let gradientW2 = deltaOut * hidden[i]; 
        W2[i] = W2[i] - learningRate * gradientW2; 
    }
    b2 = b2 - learningRate * deltaOut; 
    
    for (let i = 0; i < W1.length; i++){
        let gradientW1_0 = deltaHidden[i] * X; 
        W1[i][0] = W1[i][0] - learningRate * gradientW1_0; 

        let gradientW1_1 = deltaHidden[i] * Y; 
        W1[i][1] = W1[i][1] - learningRate * gradientW1_1; 

        b1[i] = b1[i] - learningRate * deltaHidden[i];
    }

    const loss = Math.pow(output - target, 2);
    
    return { W1, b1, W2, b2, loss };
}

// Where we are initializing the weights 
function initWeights(numHidden = 4){
    let W1 = [];
    let b1 = []; 
    for (let i = 0; i < numHidden; i++){
        W1.push([Math.random() * 2 - 1, Math.random() * 2 - 1]);
        b1.push(Math.random() * 2 - 1);
    }

    let W2 = []; 
    for (let i = 0; i < numHidden; i++){
        W2.push(Math.random() * 2 - 1); 
    }
    let b2 = Math.random() * 2 - 1;

    return { W1, b1, W2, b2 }; 
}

// The training phase of the mlp 
function trainMLP(data, numHidden = 4, epochs = 5000, learningRate = 0.5){
    let weights = initWeights(numHidden);
    let history = []; 

    for (let epoch = 0; epoch < epochs; epoch++){
        let totalLoss = 0; 

        
        for (let i = 0; i < data.length; i++){
            const { X, Y, target } = data[i];
            const result = backprop(X, Y, target, weights, learningRate);
            weights = { W1: result.W1, b1: result.b1, W2: result.W2, b2: result.b2 }; 
            totalLoss += result.loss; 
        }
        if (epoch % 500 === 0){
            history.push({ epoch, loss: totalLoss });
        }
    }
    return { weights, history };
}

//export of all the function in this file 
export { sigmoid, sigmoidDerivative, mlpForward, backprop, trainMLP, initWeights };