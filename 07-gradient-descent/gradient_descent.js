// Function to calculate the cost (loss) function
// This function calculates the mean squared error (MSE) cost function
const computeCost = (x, y, theta) => {
  const m = y.length // Number of training examples
  let cost = 0

  // Loop through each training example
  for (let i = 0; i < m; i++) {
    // Calculate the prediction based on the current values of theta
    const prediction = x[i].reduce((sum, a, j) => sum + a * theta[j], 0)

    // Add the squared difference between the prediction and actual value to the total cost
    cost += Math.pow(prediction - y[i], 2)
  }

  // Return the average cost (mean squared error)
  return cost / (2 * m)
}

// Function to perform gradient descent
// This function updates the values of theta to minimize the cost function
const gradientDescent = (x, y, theta, alpha, numIterations) => {
  const m = y.length // Number of training examples

  // Loop through the specified number of iterations
  for (let iter = 0; iter < numIterations; iter++) {
    const tempTheta = [...theta] // Temporary array to hold updated theta values

    // Loop through each parameter (theta[j])
    for (let j = 0; j < theta.length; j++) {
      let gradient = 0

      // Loop through each training example to calculate the gradient
      for (let i = 0; i < m; i++) {
        // Calculate the prediction based on the current values of theta
        const prediction = x[i].reduce((sum, a, k) => sum + a * theta[k], 0)

        // Calculate the gradient for theta[j]
        gradient += (prediction - y[i]) * x[i][j]
      }

      // Update theta[j] using the learning rate and gradient
      tempTheta[j] -= alpha * (gradient / m)
    }

    // Update all theta values simultaneously
    theta = [...tempTheta]
  }

  // Return the updated theta values (optimal parameters)
  return theta
}

// Feature matrix (including bias unit)
// X represents the input features for each training example. 
// The first column is the bias unit (always 1), 
// and the second column is the actual feature value (number of rooms in this case).
const x = [
  [1, 1], // 1 room
  [1, 2], // 2 rooms
  [1, 3] // 3 rooms
]

// Target values y represents the actual heating costs we want to predict for each training example.
const y = [1, 2, 3] // Heating costs in currency

// Initial values for theta is an array of initial parameter values we want to optimize.
let theta = [0, 0]

// Learning rate alpha is the learning rate, which controls the step 
// size of each iteration during gradient descent.
const alpha = 0.01

// Number of iterations specifies the number of times the gradient 
// descent algorithm will run to update theta.
const numIterations = 1000

// Perform gradient descent to find the optimal theta
const optimalTheta = gradientDescent(x, y, theta, alpha, numIterations)

// Calculate the cost (loss) with the optimal theta
const cost = computeCost(x, y, optimalTheta)

console.log('Optimal Theta:', optimalTheta)
console.log('Cost:', cost)

/*
Output:

Optimal Theta: [ 0.11071520925847289, 0.9512961894220736 ]
Cost: 0.0008792330054913394

Optimal Theta: shows the best values for the model parameters that minimize the error.
Cost: indicates the error value at these optimal parameters.

These results mean that the model has been successfully trained 
to minimize the error and make accurate predictions.

*/