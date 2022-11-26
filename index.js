const inquirer = require('inquirer');
const fs = require('fs');
const Intern = require("./lib/intern");
let teamHTML = "";

function writeFileAndQuit() {

    const startHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Team Page</title>
</head>
<body>`;

    const endHTML = `</body>
</html>`;

    const htmlSnippet = startHTML + teamHTML + endHTML;

    fs.writeFile('./dist/index.html', `${htmlSnippet}`, (err)=>{
    return console.log("done!");
    } );

}

function addOrExit () {
    
    inquirer
    .prompt([
        {
        type: 'list',
        message: 'What would you like to do?',
        name: 'employeeRole',
        choices: ["Add a Manager", "Add an Engineer", "Add an Intern", "Exit"],
        },
    ])
    .then((responses) => {

        if ( responses.employeeRole === "Exit") {
            writeFileAndQuit();
        } else {
            getUserInput(responses.employeeRole);
        }
    });
}

function getUserInput(employeeRole) { 

        inquirer
        .prompt([
            {
            type: 'list',
            message: 'What would you like to do?',
            name: 'employeeRole',
            choices: ["Add a Manager", "Add an Engineer", "Add an Intern", "Exit"],
            },
            {
            type: 'input',
            message: 'Employee Name:',
            name: 'employeeName',
            },
            {
            type: 'input',
            message: 'Employee ID:',
            name: 'employeeId',
            },
            {
            type: 'input',
            message: 'Employee Email:',
            name: 'employeeEmail',
            },
            {
            type: 'input',
            message: 'Employee Extra:',
            name: 'employeeExtra',
            },
        ])
        .then((responses) => {
            
            var employeeName = responses.employeeName;
            var employeeId = responses.employeeId;
            var employeeEmail = responses.employeeEmail;
            var employeeExtra = responses.employeeExtra;

            teamHTML += `<div>Employee Name: ${ employeeName }</div>
            <div>Employee ID #${ employeeId }</div>
            <div>Email: ${ employeeEmail }</div>
            <div>Job Title: ${ employeeRole }</div>`;

            switch (employeeRole) {
                case "Manager":
                    teamHTML += `<div>Office #: ${ employeeExtra}</div>`;
                    break;
                case "Engineer":
                    teamHTML += `<div>GitHub: <a href="https://github.com/${ employeeExtra}">https://github.com/${ employeeExtra}</a></div>`;
                    break;
                case "Intern":
                    teamHTML += `<div>School: ${ employeeExtra}</div>`;
                    break;
                default:
                    break;
            }
            let newguy = new Intern(employeeName, employeeId, employeeEmail, employeeRole, employeeExtra);
            
            // Prompt user to enter another employee or exit the application
            addOrExit();
            
        });
}

addOrExit(); 
/* console.log(`The new guy's name is ${ newguy.getName() }, and her ID is ${ newguy.getId() }.`);
console.log(`Don't believe me? Ask her yourself at ${ newguy.getEmail() }.`);
console.log(`Oh, and her school? ${ newguy.getSchool() }.`); */