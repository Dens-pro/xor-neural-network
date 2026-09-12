
function step(z){
    if(z >= 0) {
        return 1;
    } else {
        return 0;
    }
}


function perceptronForward(X, Y, w1, w2, b){
   let z = X * w1 + Y * w2 + b;
    return setp(z) 
}


function trainPerceptron(data, epochs = 100, learning_rate = 0.1) {
    let w1 = Math.random() * 2 - 1;
    let w2 = Math.random() * 2 - 1; 
    let b = Math.random() * 2 - 1; 

    let history = []; 

    for (let epoch = 0; epoch < epochs; epoch++) {
        let totalError = 0; 

        for (let i = 0; i < data.length; i++){
            const {X, Y, target} = data[i]; 
            const prediction = perceptronForward(X, Y, w1, w2, b);
            const error = target - prediction; 

            w1 = w1 + learningRate * error * X; 
            w2 = w2 + learning_rate * error * Y; 
            b = b + learning_rate * error; 

            totalError += Math.abs(error); 
        }
        history.push({ epoch, totalError}); 
    }
    return { w1, w2, b, history}; 
} 

export { step, perceptronForward, trainPerceptron }; 
