const data = [
  [120, 1500], // Horsepower, Weight (kg)
  [150, 2000],
  [180, 2500],
  [110, 1800],
  [140, 2200],
]

// Function to calculate eigenvalues and eigenvectors using the power iteration method
const eigs = (matrix, numIterations = 1000) => {
  let eigenvector = Array(matrix.length).fill(1)
  let eigenvalue = 0

  for (let iter = 0; iter < numIterations; iter++) {
    // Multiply matrix by the current eigenvector
    let newVector = matrix.map(row => row.reduce((sum, value, j) => sum + value * eigenvector[j], 0))

    // Normalize the new vector
    const norm = Math.sqrt(newVector.reduce((sum, value) => sum + value * value, 0))

    newVector = newVector.map(value => value / norm)

    // Check for convergence
    const dotProduct = eigenvector.reduce((sum, value, i) => sum + value * newVector[i], 0)

    if (Math.abs(dotProduct - 1) < 1e-10) break

    eigenvector = newVector
  }

  // Calculate the eigenvalue using the Rayleigh quotient
  eigenvalue = eigenvector.reduce((sum, value, i) => sum + value * matrix[i].reduce((sum, value, j) => sum + value * eigenvector[j], 0), 0)

  return { eigenvalue, eigenvector }
}

// Function to perform PCA
const pca = (x, numComponents = 1) => {
  const mean = x[0].map((_, colIndex) => x.reduce((sum, row) => sum + row[colIndex], 0) / x.length)
  const centeredX = x.map(row => row.map((value, colIndex) => value - mean[colIndex]))

  const covarianceMatrix = Array(centeredX[0].length).fill(0).map((_, i) =>
    Array(centeredX[0].length).fill(0).map((_, j) =>
      centeredX.reduce((sum, row) => sum + row[i] * row[j], 0) / (centeredX.length - 1)
    )
  )

  const { eigenvector } = eigs(covarianceMatrix)

  return centeredX.map(row => row.reduce((sum, value, colIndex) => sum + value * eigenvector[colIndex], 0))
}

// Perform PCA
const pcaData = pca(data)
console.log('PCA Data:', pcaData)

/*
  Output:

  PCA Data: [
    -500.2777149505888,
    0.6203250374854828,
    501.5183650255598,
    -201.4758010627036,
    199.61482595024714
  ]

  These values represent the data points (cars) projected onto the new principal component. 
  Here's how to interpret them:

  -500.28: The projection of the first car onto the new principal component.
  0.62: The projection of the second car onto the new principal component.
  501.52: The projection of the third car onto the new principal component.
  -201.48: The projection of the fourth car onto the new principal component.
  199.61: The projection of the fifth car onto the new principal component.

  These values indicate how each original data point (car) is represented 
  in the new reduced-dimension space, capturing the most important variance in the data. 
  This can be used for visualization or as input to other machine learning algorithms.

*/