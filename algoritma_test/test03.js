function countOccurrences(INPUT, QUERY) {
    const countMap = {};

    for (const word of INPUT) {
        if (countMap[word]) {
            countMap[word]++;
        } else {
            countMap[word] = 1;
        }
    }

    const result = [];

    for (const queryWord of QUERY) {
        if (countMap[queryWord]) {
            result.push(countMap[queryWord]);
        } else {
            result.push(0);
        }
    }

    return result;
}

const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];
const OUTPUT = countOccurrences(INPUT, QUERY);
console.log(OUTPUT);
