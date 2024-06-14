function reverseAlphabets(str) {    
    const alphabets = str.match(/[A-Za-z]+/)[0];
    const numbers = str.match(/\d+/)[0];
    
    const reversedAlphabets = alphabets.split('').reverse().join('');
    
    const result = reversedAlphabets + numbers;
    return result;
}

const input = "NEGIE1";
const output = reverseAlphabets(input);
console.log(output);
