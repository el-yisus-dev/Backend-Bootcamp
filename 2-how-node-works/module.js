/* console.log(arguments) // show me the values from the wrapper function that exports modules in node apps

console.log(require("module").wrapper)
 */

// module.exports
const Calc = require("./test-module");
const calculator = new Calc();

console.log(calculator.add(45, 56));

// exports 

const calc2 = require("./test-module-2"); // calc2 will have all the properties that I define in the exports object in the test-module-2.js, I can destructure the exports object into a functions { add, multiply, divide }

console.log(calc2.add(3.4, 56));


// caching 
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
