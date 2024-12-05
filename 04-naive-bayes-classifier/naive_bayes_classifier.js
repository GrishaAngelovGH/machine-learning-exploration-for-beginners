// News articles with their topics (politics, sports)
const data = [
  { text: "government election policy", topic: "politics" },
  { text: "president senate vote", topic: "politics" },
  { text: "football match score", topic: "sports" },
  { text: "basketball player team", topic: "sports" }
]

// Function to tokenize text
const tokenize = text => text.split(' ')

// Function to calculate word frequencies for each topic
const calculateWordFrequencies = data => {
  const frequencies = {}

  data.forEach(entry => {
    const words = tokenize(entry.text)

    if (!frequencies[entry.topic]) {
      frequencies[entry.topic] = {}
    }

    words.forEach(word => {
      if (!frequencies[entry.topic][word]) {
        frequencies[entry.topic][word] = 0
      }
      frequencies[entry.topic][word]++
    })
  })

  return frequencies
}

// Function to calculate prior probabilities for each topic
const calculatePriorProbabilities = data => {
  const priorProbabilities = {}

  const totalEntries = data.length

  data.forEach(entry => {
    if (!priorProbabilities[entry.topic]) {
      priorProbabilities[entry.topic] = 0
    }
    priorProbabilities[entry.topic]++
  })

  Object.keys(priorProbabilities).forEach(topic => {
    priorProbabilities[topic] /= totalEntries
  })

  return priorProbabilities
}

// Function to classify a new text
const classify = (text, frequencies, priors) => {
  // Tokenize the new text
  const words = tokenize(text)

  // Get the list of possible topics
  const topics = Object.keys(priors)

  // Calculate the score for each topic
  const scores = topics.map(topic => {

    // Start with the log of the prior probability for the topic
    const prior = Math.log(priors[topic])

    // Calculate the log of the likelihood for each word in the new text
    const wordScores = words.map(word => {
      // Get the frequency of the word in the topic or use 1 for Laplace smoothing
      const wordFrequency = frequencies[topic][word] || 1
      return Math.log(wordFrequency)
    })

    // Sum the log of the prior probability and the log of the likelihoods
    return wordScores.reduce((acc, score) => acc + score, prior)
  })

  // Find the index of the topic with the highest score
  const maxScoreIndex = scores.indexOf(Math.max(...scores))

  // Return the topic with the highest score
  return topics[maxScoreIndex]
}

// Calculate word frequencies and prior probabilities
const wordFrequencies = calculateWordFrequencies(data)
const priorProbabilities = calculatePriorProbabilities(data)

// New article to classify
const newArticle = "vote for the new team"

// Classify the new article
const topic = classify(newArticle, wordFrequencies, priorProbabilities)
console.log(`The new article is classified as: ${topic}`) // The new article is classified as: politics