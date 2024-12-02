// Fruits with their characteristics (color, size) and category (apple, banana)
const data = [
  { color: 1, size: 5, category: 'apple' },
  { color: 1, size: 6, category: 'apple' },
  { color: 2, size: 7, category: 'banana' },
  { color: 2, size: 8, category: 'banana' }
]

// Function to calculate Euclidean distance between two points i.e.
// the shortest distance between two points on a plane.
const euclideanDistance = (point1, point2) => {
  return Math.sqrt(Math.pow(point1.color - point2.color, 2) + Math.pow(point1.size - point2.size, 2))
}

const findKNearestNeighbors = (data, newPoint, k) => {
  // Calculate distances from the new point to all existing points
  const distances = data.map(point => ({
    point,
    distance: euclideanDistance(point, newPoint)
  }))

  // Sort by distance
  distances.sort((a, b) => a.distance - b.distance)

  // Return the K nearest neighbors
  return distances.slice(0, k).map(entry => entry.point)
}

// Function to classify the new point based on K nearest neighbors
const classify = (data, newPoint, k) => {
  const neighbors = findKNearestNeighbors(data, newPoint, k)

  // Count the occurrences of each category among the neighbors
  const categoryCounts = {}

  neighbors.forEach(neighbor => {
    categoryCounts[neighbor.category] = (categoryCounts[neighbor.category] || 0) + 1
  })

  // Determine the category with the highest count
  return Object.keys(categoryCounts).reduce((a, b) => categoryCounts[a] > categoryCounts[b] ? a : b)
}

// New fruit with characteristics (color, size)
const newFruit = { color: 1, size: 7 }

// Number of neighbors to consider
const k = 3

const category = classify(data, newFruit, k)
console.log(`The new fruit is classified as: ${category}`) // The new fruit is classified as: banana