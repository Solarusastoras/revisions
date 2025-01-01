function CalculateAverage(scores) {
    if (scores.length === 0) return 0;
    const total = scores.reduce((acc, score) => acc + score, 0);
    return total / scores.length;
}

// Example usage:
const scores = [10, 20, 30, 40, 50];
console.log(CalculateAverage(scores)); // Output: 30

export default CalculateAverage;