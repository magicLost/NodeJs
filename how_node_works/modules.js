//console.log(arguments);
//console.log(require("module").wrapper);

const Calc = require("./test-module-1");

const calc = new Calc();
console.log(calc.add(3, 4));

//const calc2 = require("./test-module-2");
const { add, divide } = require("./test-module-2");

console.log(add(2, 5));

//caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
