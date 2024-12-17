// Function to normalize features
// This function takes an array of features and scales each feature to a range between 0 and 1.
// This helps to ensure that all features contribute equally to the model, 
// avoiding dominance by features with larger scales.
const normalizeFeatures = (data) => {
  // Map through each feature (column) in the data
  const normalizedData = data.map(column => {
    // Find the minimum and maximum values of the current feature
    const min = Math.min(...column)
    const max = Math.max(...column)

    // Normalize each value of the feature to a range between 0 and 1
    return column.map(value => (value - min) / (max - min))
  })

  // Return the normalized data
  return normalizedData
}

// Sample data: each array represents a feature
// Horsepower: [120, 150, 180]
// Weight (kg): [1500, 2000, 2500]
const data = [
  [120, 150, 180], // Horsepower
  [1500, 2000, 2500] // Weight in kilograms
]

// Normalize the features
const normalizedData = normalizeFeatures(data)

console.log('Normalized Data:', normalizedData)

// Function to standardize features
// This function takes an array of features and transforms each feature
// so that it has a mean of 0 and a standard deviation of 1.
// This helps to ensure that all features contribute equally to the model,
// and helps some models converge more quickly and perform better.
const standardizeFeatures = (data) => {
  // Map through each feature (column) in the data
  const standardizedData = data.map(column => {
    // Calculate the mean of the current feature
    const mean = column.reduce((sum, value) => sum + value, 0) / column.length

    // Calculate the standard deviation of the current feature
    const stdDev = Math.sqrt(column.reduce((sum, value) => sum + Math.pow(value - mean, 0), 0) / column.length)

    // Standardize each value of the feature
    return column.map(value => (value - mean) / stdDev)
  })

  // Return the standardized data
  return standardizedData
}

// Standardize the features
const standardizedData = standardizeFeatures(data)

console.log('Standardized Data:', standardizedData)

/*

Output: 

Normalized Data: [ [ 0, 0.5, 1 ], [ 0, 0.5, 1 ] ]
Standardized Data: [ [ -30, 0, 30 ], [ -500, 0, 500 ] ]

*/