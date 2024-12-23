// Function to calculate cosine similarity between two vectors
// Cosine similarity measures the cosine of the angle between two vectors
// It is used to determine how similar two sets of ratings are
const cosineSimilarity = (a, b) => {
  // Calculate the dot product of vectors a and b
  const dotProduct = a.reduce((sum, ai, i) => sum + ai * b[i], 0)

  // Calculate the magnitude (length) of vector a
  const magnitudeA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0))

  // Calculate the magnitude (length) of vector b
  const magnitudeB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0))

  // Return the cosine similarity (dot product divided by the product of magnitudes)
  return dotProduct / (magnitudeA * magnitudeB)
}

// Function to make recommendations for a user
const recommend = (ratings, userIndex) => {
  // Get the ratings of the target user
  const userRatings = ratings[userIndex]

  // Calculate similarities between the target user and all other users
  const similarities = ratings.map((r, i) => i !== userIndex ? cosineSimilarity(userRatings, r) : -1)

  // Calculate recommendation scores based on similarities and ratings of other users
  const scores = similarities.map((similarity, i) => ratings[i].map(rating => rating * similarity))

  // Sum up the scores for each item
  const recommendationScores = scores.reduce((sum, score) => sum.map((s, i) => s + score[i]), Array(ratings[0].length).fill(0))

  // Create a sorted list of recommended items with their scores
  return recommendationScores.map((score, i) => ({ item: i, score })).sort((a, b) => b.score - a.score)
}

// Sample user-item ratings matrix
// Each row represents a user, and each column represents an item
// Ratings indicate the user's preference for the items (0 means no rating)
const ratings = [
  [5, 3, 0, 1], // Ratings from user 1
  [4, 0, 0, 1], // Ratings from user 2
  [1, 1, 0, 5], // Ratings from user 3
  [1, 0, 0, 4], // Ratings from user 4
  [0, 1, 5, 4] // Ratings from user 5
]

// Make recommendations for the first user (index 0)
// The function calculates the similarity between user 1 and all other users
// Then it generates scores for each item based on the similarities and other users' ratings
const recommendations = recommend(ratings, 0)

// Log the recommendations to the console
console.log('Recommendations:', recommendations)

/*
Output:

Recommendations: [
  { item: 3, score: 4.181519077214122 },
  { item: 2, score: 0.9128709291752769 },
  { item: 0, score: -0.7644816815268058 },
  { item: 1, score: -2.3945357825539135 }
]

This means that item 3 has the highest score based on the data from the users.

Explanation of the Results:
- item 3 (score: 4.181519077214122): The most strongly recommended item for the target user.
- item 2 (score: 0.9128709291752769): Also recommended, but with a lower score.
- item 0 (score: -0.7644816815268058): Rated negatively, meaning it is not recommended.
- item 1 (score: -2.3945357825539135): Has the lowest score and is the least recommended.

These scores indicate how each item is rated based on the similarities 
between users and their ratings. This information can be used to suggest
the most suitable items for a user based on their preferences
and the behavior of other similar users.

*/