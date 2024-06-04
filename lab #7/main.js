function evenCheck(number) {
    if (typeof number !== 'number') return '';
    else return number % 2 === 0 ? 'Number is even' : 'Number is odd';
}

function sum() {
    const simple = [];

    for (let i = 2; simple.length < 5; i++) {
        for (let j = 2; j <= i; j++) {
            if (i % j === 0 && j < i) break;
            else if (j === i) simple.push(i);
          }
    }

    return simple.reduce((a, b) => a + b, 0);;
}

function sumOfOnes(n) {
    if (typeof n !== 'number' || n <= 0) return '';

    let sum = 0;
    let number = 1;

    for (let i = 1; i <= n; i++) {
        sum += number;
        number = number * 10 + 1;
    }

    return sum;
}


console.log(evenCheck(10)); // Even
console.log(evenCheck(7));  // Odd
console.log(evenCheck('hello')); // ''

console.log(sum()); // 28

console.log(sumOfOnes(5)) // 12345