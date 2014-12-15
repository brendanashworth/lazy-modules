// example.js
var lazy = require('lazy-modules');
lazy('./example/*');

// we now have access to a, b, and c
console.log(a == 1, b == 2);

// we didn't use c, so it was never loaded