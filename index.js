const Employee = require("./lib/employee");

let newguy = new Employee("Zack", "37264", "zack@cooljob.com");

console.log(`The new guy's name is ${ newguy.getName() }, and his ID is ${ newguy.getId() }.`);
console.log(`Don't believe me? Ask him yourself at ${ newguy.getEmail() }.`);