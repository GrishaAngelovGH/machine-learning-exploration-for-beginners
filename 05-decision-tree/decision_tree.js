// Animals with their characteristics (size, habitat) and type (mammal, bird, reptile)
const data = [
  { size: 'small', habitat: 'land', type: 'mammal' },
  { size: 'medium', habitat: 'land', type: 'mammal' },
  { size: 'small', habitat: 'air', type: 'bird' },
  { size: 'medium', habitat: 'air', type: 'bird' },
  { size: 'large', habitat: 'water', type: 'reptile' },
  { size: 'medium', habitat: 'water', type: 'reptile' }
]

/*

Function to calculate Gini impurity - a measure of how often a randomly chosen element
from the set would be incorrectly labeled if it was randomly labeled according 
to the distribution of labels in the set.

1. Calculate the total number of instances in all groups
2. Initialize the Gini impurity to 0
3. Loop through each group to calculate its Gini impurity
4. Get the size of the group
5. If the group is empty, skip to the next group to avoid division by zero
6. Initialize the score for the group to 0
7. Create an object to count the occurrences of each class in the group
8. Loop through each instance in the group
9. Increment the count for the class of the current instance
10. Loop through each class in the group
11. Calculate the probability of the class in the group
12. Add the squared probability to the score
13. Calculate the weighted Gini impurity for the group and add it to the total Gini impurity
14. Return the total Gini impurity

*/

const giniImpurity = groups => {
  const nInstances = groups.flat().length
  let gini = 0.0

  for (const group of groups) {
    const size = group.length

    if (size === 0) continue

    let score = 0.0
    const classCounts = {}

    for (const row of group) {
      classCounts[row.type] = (classCounts[row.type] || 0) + 1
    }

    for (const key in classCounts) {
      const p = classCounts[key] / size
      score += p * p
    }

    gini += (1.0 - score) * (size / nInstances)
  }

  return gini
}

// Function to split data based on an attribute and value
const testSplit = (attribute, value, data) => {
  const left = []
  const right = []

  for (const row of data) {
    if (row[attribute] === value) left.push(row)
    else right.push(row)
  }

  return [left, right]
}

// Function to find the best split point
// This function iterates through all the attributes and their unique values
// to find the best split point that minimizes the Gini impurity. The goal is 
// to find the attribute and value that best separates the data into homogenous groups.
// The split point is the attribute and value pair that results in the most effective
// partitioning of the data.
const getSplit = data => {
  let bestIndex
  let bestValue
  let bestScore = Infinity
  let bestGroups

  // Get the list of attributes excluding the target variable (class label)
  const attributes = Object.keys(data[0]).filter(key => key !== 'type')

  // Loop through each attribute
  for (const attribute of attributes) {
    // Get unique values for the attribute
    const values = [...new Set(data.map(row => row[attribute]))]

    // Loop through each unique value
    for (const value of values) {
      // Split the data based on the attribute and value
      const groups = testSplit(attribute, value, data)

      // Calculate Gini impurity for the split
      const gini = giniImpurity(groups)

      // Check if this split is better (has lower Gini impurity) than the current best split
      if (gini < bestScore) {
        bestIndex = attribute
        bestValue = value
        bestScore = gini
        bestGroups = groups
      }
    }
  }
  // Return the best split point (attribute, value) and the resulting groups
  return { index: bestIndex, value: bestValue, groups: bestGroups }
}


// Function to create a terminal node
const toTerminal = group => {
  const outcomes = {}

  for (const row of group) {
    outcomes[row.type] = (outcomes[row.type] || 0) + 1
  }

  return Object.keys(outcomes).reduce((a, b) => (outcomes[a] > outcomes[b] ? a : b))
}

// Function to create child splits for a node or make terminal
const split = (node, maxDepth, minSize, depth) => {
  const [left, right] = node.groups

  delete node.groups

  if (!left.length || !right.length) {
    node.left = node.right = toTerminal([...left, ...right])
    return
  }

  if (depth >= maxDepth) {
    node.left = toTerminal(left)
    node.right = toTerminal(right)
    return
  }

  if (left.length <= minSize) node.left = toTerminal(left)
  else {
    node.left = getSplit(left)
    split(node.left, maxDepth, minSize, depth + 1)
  }

  if (right.length <= minSize) node.right = toTerminal(right)
  else {
    node.right = getSplit(right)
    split(node.right, maxDepth, minSize, depth + 1)
  }
}

// Function to build a decision tree
const buildTree = (train, maxDepth, minSize) => {
  const root = getSplit(train)

  split(root, maxDepth, minSize, 1)

  return root
}

// Example usage: build a tree with max depth 3 and min size 1
const tree = buildTree(data, 3, 1)
console.log(JSON.stringify(tree, null, 2))

/*
  Output:

  {
    "index": "habitat",
    "value": "land",
    "left": {
      "index": "size",
      "value": "small",
      "left": "mammal",
      "right": "mammal"
    },
    "right": {
      "index": "habitat",
      "value": "air",
      "left": {
        "index": "size",
        "value": "small",
        "left": "bird",
        "right": "bird"
      },
      "right": {
        "index": "size",
        "value": "large",
        "left": "reptile",
        "right": "reptile"
      }
    }
  }

  [habitat, land] -> [size, small] -> mammal
  [habitat, land] -> [habitat, air] -> [size, small] -> bird
  [habitat, land] -> [habitat, air] -> [size, large] -> reptile

*/