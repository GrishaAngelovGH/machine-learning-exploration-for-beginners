// Customers with their age, number of viewed products, and whether they made a purchase 
// (1 for yes, 0 for no)
const data = [
  { age: 25, viewedProducts: 5, purchase: 0 },
  { age: 30, viewedProducts: 10, purchase: 1 },
  { age: 35, viewedProducts: 3, purchase: 0 },
  { age: 40, viewedProducts: 7, purchase: 1 }
]

// Sigmoid function to convert linear combination to a probability between 0 and 1
const sigmoid = z => 1 / (1 + Math.exp(-z))

// Predict function using logistic regression
const predictPurchase = (age, viewedProducts, b0, b1, b2) => {
  // Linear combination of the input variables (age, viewedProducts) 
  // with the coefficients (b0, b1, b2)
  const z = b0 + b1 * age + b2 * viewedProducts

  // Convert to probability using the sigmoid function
  return sigmoid(z)
}

// Example coefficients (in a real use case, these would be learned from data)
const b0 = -20 // Intercept
const b1 = 0.4 // Coefficient for age
const b2 = 1.2 // Coefficient for viewed products

// Example 1: Predicting purchase probability 
// for a customer with 32 years of age and 8 viewed products
const age = 32
const viewedProducts = 8
const probability = predictPurchase(age, viewedProducts, b0, b1, b2)
console.log(`Probability of purchase (Customer 1): ${probability.toFixed(2)}`)

// Classifying the customer based on the predicted probability
const isPurchase = probability >= 0.5 ? 1 : 0
console.log(`Customer 1 will make a purchase: ${isPurchase}`)

// Example 2: Predicting purchase probability 
// for a customer with 28 years of age and 2 viewed products
const age2 = 28
const viewedProducts2 = 2
const probability2 = predictPurchase(age2, viewedProducts2, b0, b1, b2)
console.log(`Probability of purchase (Customer 2): ${probability2.toFixed(2)}`)

// Classifying the customer based on the predicted probability
const isPurchase2 = probability2 >= 0.5 ? 1 : 0
console.log(`Customer 2 will make a purchase: ${isPurchase2}`)

/*
  Output:

  Probability of purchase (Customer 1): 0.92
  Customer 1 will make a purchase: 1
  Probability of purchase (Customer 2): 0.00
  Customer 2 will make a purchase: 0
*/