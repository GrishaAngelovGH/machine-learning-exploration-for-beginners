// Function to calculate the Euclidean distance between two points
const euclideanDistance = (point1, point2) => {
  return Math.sqrt(point1.reduce((sum, coord, index) => sum + Math.pow(coord - point2[index], 2), 0));
};

// Function to initialize centroids randomly
const initializeCentroids = (data, k) => {
  const centroids = [];

  for (let i = 0; i < k; i++) {
    centroids.push(data[Math.floor(Math.random() * data.length)].coordinates);
  }

  return centroids;
};

// Function to assign data points to the nearest centroid
const assignClusters = (data, centroids) => {
  const clusters = Array.from({ length: centroids.length }, () => []);

  data.forEach(point => {
    let minDist = Infinity;
    let clusterIndex = -1;

    centroids.forEach((centroid, index) => {
      const distance = euclideanDistance(point.coordinates, centroid);

      if (distance < minDist) {
        minDist = distance;
        clusterIndex = index;
      }
    });

    // Ensure clusterIndex is valid before pushing to the cluster
    if (clusterIndex !== -1 && clusters[clusterIndex]) {
      clusters[clusterIndex].push(point.coordinates);
    } else {
      console.error('Invalid clusterIndex or cluster is undefined:', clusterIndex);
    }
  });

  // Check for empty clusters and redistribute points if necessary
  clusters.forEach((cluster, index) => {
    if (cluster.length === 0) {
      // Find the largest cluster to take a point from
      const largestCluster = clusters.reduce((maxCluster, currentCluster) =>
        currentCluster.length > maxCluster.length ? currentCluster : maxCluster, []);

      // Move a point from the largest cluster to the empty cluster
      if (largestCluster.length > 1) {
        clusters[index].push(largestCluster.pop());
      } else {
        console.error('Unable to redistribute points: no suitable largest cluster found.');
      }
    }
  });

  return clusters;
};

// Function to update centroids based on clusters
const updateCentroids = clusters => {
  return clusters.map(cluster => {
    if (cluster.length === 0) {
      // Return a default value or handle as needed
      return [0, 0];
    }

    const numPoints = cluster.length;

    const centroidCoordinates = cluster[0].map((_, index) =>
      cluster.reduce((sum, coordinates) => sum + coordinates[index], 0) / numPoints
    );

    return centroidCoordinates;
  });
};

// K-Means Clustering function
const kMeans = (data, k, maxIterations = 100) => {
  let centroids = initializeCentroids(data, k);
  let clusters;

  for (let i = 0; i < maxIterations; i++) {
    clusters = assignClusters(data, centroids);

    const newCentroids = updateCentroids(clusters);

    // Check for convergence (if centroids do not change)
    if (newCentroids.every((centroid, index) =>
      centroid.every((coord, coordIndex) => coord === centroids[index][coordIndex])
    )) {
      break;
    }

    centroids = newCentroids;
  }

  return { centroids, clusters };
};

// 2D coordinates of colored balls
const data = [
  { coordinates: [1.0, 2.0], color: 'red' },
  { coordinates: [1.5, 1.8], color: 'red' },
  { coordinates: [5.0, 8.0], color: 'blue' },
  { coordinates: [8.0, 8.0], color: 'blue' },
  { coordinates: [1.0, 0.6], color: 'red' },
  { coordinates: [9.0, 11.0], color: 'green' },
  { coordinates: [8.0, 2.0], color: 'blue' },
  { coordinates: [10.0, 2.0], color: 'green' },
  { coordinates: [9.0, 3.0], color: 'green' }
];

// Perform K-Means Clustering with k = 3
const k = 3;
const { centroids, clusters } = kMeans(data, k);

console.log('Centroids:', centroids);
console.log('Clusters:', clusters);

/*

Sample Output:

Centroids: [
  [ 7.333333333333333, 9 ],
  [ 9, 2.3333333333333335 ],
  [ 1.1666666666666667, 1.4666666666666666 ]
]
Clusters: [
  [ [ 5, 8 ], [ 8, 8 ], [ 9, 11 ] ],
  [ [ 8, 2 ], [ 10, 2 ], [ 9, 3 ] ],
  [ [ 1, 2 ], [ 1.5, 1.8 ], [ 1, 0.6 ] ]
]

*/