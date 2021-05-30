var Fraction = require('fractional').Fraction;
const symbols = {
    '¼': ' 1/4',
    '½': ' 1/2',
    '¾': ' 3/4'
};
let portions = 1.5

let str = '1/2 cup';



// if (/\d\/\d/.test(str)) {
//     str = str.replace(/(\d\/\d)|(\d+)/g, function(match)  {console.log(match); return Fraction(match).multiply(portions)});
// }

console.log(Fraction('0 '+'1/2').multiply(portions));

// console.log(str);

// console.log(Fraction('1 1/2'));


// console.log(' 1 ½ tsp'.replace(/[¼½¾]/g, (match) => symbols[match].replace(/\d\s+\d\/\d/g, (match) => Fraction(match).multiply(portions))));
