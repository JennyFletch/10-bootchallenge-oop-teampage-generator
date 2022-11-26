const Intern = require("./lib/intern");

let newguy = new Intern("Buffy", "372648", "buffy@cooljob.com", "Hesperia High School");

console.log(`The new guy's name is ${ newguy.getName() }, and her ID is ${ newguy.getId() }.`);
console.log(`Don't believe me? Ask her yourself at ${ newguy.getEmail() }.`);
console.log(`Oh, and her school? ${ newguy.getSchool() }.`);