const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
let teamHTML = "";


// Find out if the user wants to add an employee or quit the application
function getEmployeeInfo () {

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
            when: (answers) => !(answers.employeeRole === 'Exit'),
            validate(value) {
                if (value.length) { 
                    return true 
                }
                return 'Please enter the name of the employee.'
            }
        },
        {
            type: 'input',
            message: 'Employee ID:',
            name: 'employeeId',
            when: (answers) => !(answers.employeeRole === 'Exit'),
            validate(value) {
                if(value.length) {
                    var idString = value.split("");
                    if (idString.length > 5 && value > 0 && value < 1000000) { return true; }
                }
                return 'Please enter a six-digit employee ID.'; 
            }
         },
         {
            type: 'input',
            message: 'Employee Email:',
            name: 'employeeEmail',
            when: (answers) => !(answers.employeeRole === 'Exit'),
            validate(value) {
                var emailChars = value.split("");
                if (value.length && emailChars.includes("@") && emailChars.includes(".")) { return true; }
                return 'Please enter a valid email address.'; 
            }
         },
         {
            type: 'input',
            message: 'Employee Office #:',
            name: 'employeeExtra',
            when: (answers) => !(answers.employeeRole === 'Exit') && answers.employeeRole === 'Add a Manager',
            validate(value) {
                if ( value.length && Number(value) > 0 && Number(value) < 400 ) { return true; }
                return 'Please enter an office number between 1 and 399.'; 
            }
         },
         {
            type: 'input',
            message: 'Employee GitHub User:',
            name: 'employeeExtra',
            when: (answers) => !(answers.employeeRole === 'Exit') && answers.employeeRole === 'Add an Engineer',
            validate(value) {
                var githubChars = value.split("");
                if ( value.length && !githubChars.includes(" ") ) { return true; }
                return 'Please enter a valid GitHub username.'; 
            }
         },
         {
            type: 'input',
            message: 'Employee School:',
            name: 'employeeExtra',
            when: (answers) => !(answers.employeeRole === 'Exit') && answers.employeeRole === 'Add an Intern',
            validate(value) {
                if ( value.length ) { return true; }
                return 'Please enter the school this employee attends.'; 
            }
         },
    ])
    .then((responses) => {

        if (responses.employeeRole === "Exit") {
            writeFileAndQuit();
        } else {

        var eRole = responses.employeeRole;
        var eName = responses.employeeName;
        var eId = responses.employeeId;
        var eEmail = responses.employeeEmail;
        var eExtra = responses.employeeExtra;
        
        createNewUser(eRole, eName, eId, eEmail, eExtra);
        }
    });
}


function createNewUser(employeeRole, employeeName, employeeId, employeeEmail, employeeExtra) { 
    
    switch (employeeRole) {
        case "Add a Manager":
            var newguy = new Manager(employeeName, employeeId, employeeEmail, employeeExtra); 
            var eExtraString = `Office #: ${ newguy.getOffice() }`;
            break;
        case "Add an Engineer":
            var newguy = new Engineer(employeeName, employeeId, employeeEmail, employeeExtra); 
            var eExtraString = `GitHub User: <a href="https://github.com/${ newguy.getGithub() }/" target="_blank">https://github.com/${ newguy.getGithub() }/</a>`;
            break;
        case "Add an Intern":
            var newguy = new Intern(employeeName, employeeId, employeeEmail, employeeExtra); 
            var eExtraString = `Current School: ${ newguy.getSchool() }`;
            break;
        default:
            break;
    } 

    teamHTML += `
    <div class="employee-block">
        <div>Employee Name: ${ newguy.getName() }</div>
        <div>Employee ID #${ newguy.getId() }</div>
        <div>Email: <a href="mailto:${ newguy.getEmail() }?subject=Attention%20Team%20Members">${ newguy.getEmail() }</a></div>
        <div>Job Title: ${ newguy.getRole() }</div>
        <div>${ eExtraString }</div>
    </div>
    `;
          
    // Prompt user to enter another employee or exit the application
    getEmployeeInfo();
}


// If user is done adding employees, create HTML page and quit application
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

    const htmlSnippet = startHTML + '\n' + teamHTML + '\n' + endHTML;

    //fs.writeFile('./dist/index.html', `${htmlSnippet}`, (err)=>{
    //return console.log("done!");
    //} );

    fs.writeFile('./dist/index.html', `${htmlSnippet}`, (err)=>
        err ? console.error(err) : console.log('\nSuccess!')
    );
}

getEmployeeInfo(); 