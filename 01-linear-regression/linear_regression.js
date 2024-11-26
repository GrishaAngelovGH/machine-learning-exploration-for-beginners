// 1. Data Collection

const data = [
  { area: 750, price: 200000 },
  { area: 800, price: 210000 },
  { area: 850, price: 220000 },
  { area: 900, price: 230000 },
  { area: 950, price: 240000 }
]

// 2. Calculate Mean Values

const mean = arr => arr.reduce((acc, val) => acc + val, 0) / arr.length

const meanArea = mean(data.map(d => d.area))
const meanPrice = mean(data.map(d => d.price))

// 3. Calculate Coefficients - slope, intercept

// numerator: the sum of the product of the differences between each data point's area and the mean area, 
// and the differences between each data point's price and the mean price 
let numerator = 0

// denominator: the sum of the squared differences between each data point's area and the mean area
let denominator = 0

data.forEach(d => {
  numerator += (d.area - meanArea) * (d.price - meanPrice)
  denominator += (d.area - meanArea) ** 2
})

// the rate at which the dependent variable (price) changes
// with respect to the independent variable (area)
const slope = numerator / denominator

// the value of the dependent variable (price) when 
// the independent variable (area) is zero
const intercept = meanPrice - slope * meanArea

// 4. Prediction Function

const predictPrice = area => slope * area + intercept

const sqMeters = 1000

console.log(`The predicted price is ${predictPrice(sqMeters)} for ${sqMeters} sqMeters`)