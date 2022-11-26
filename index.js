const inquirer = require('inquirer');
const fs = require('fs');
const Intern = require("./lib/intern");
let teamHTML = "";

// Find out if the user wants to add an employee or quit the application
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
            getEmployeeInfo(responses.employeeRole);
        }
    });
}





// Get the extra field that matches the employee's job title
function getEmployeeExtra (employeeRole, employeeName, employeeId, employeeEmail) {

    switch (employeeRole) {
        case "Manager":
            getOfficeNumber(employeeRole, employeeName, employeeId, employeeEmail);
            break;
        case "Engineer":
            getGithub(employeeRole, employeeName, employeeId, employeeEmail);
            break;
        case "Intern":
            getSchool(employeeRole, employeeName, employeeId, employeeEmail);
            break;
        default:
            break;
    }
}


// Get employee's office number - MANAGER
function getOfficeNumber (employeeRole, employeeName, employeeId, employeeEmail) {
    
    inquirer
    .prompt([
        {
        type: 'input',
        message: 'Employee Office #:',
        name: 'employeeExtra',
        validate(value) {
            if ( value && Number(value) > 0 && Number(value) < 400 ) { return true; }
            return 'Please enter an office number between 1 and 399.'; 
        },
        }
    ])
    .then((response) => {
        var extraString = `Office #: ${ response.employeeExtra }`;
        createNewUser(employeeRole, employeeName, employeeId, employeeEmail, extraString);
    });
}


// Get employee's GitHub username - ENGINEER
function getGithub (employeeRole, employeeName, employeeId, employeeEmail) {
    
    inquirer
    .prompt([
        {
        type: 'input',
        message: 'Employee GitHub User:',
        name: 'employeeExtra',
        validate(value) {
            var githubChars = value.split("");
            if ( value && !githubChars.includes(" ") ) { return true; }
            return 'Please enter a valid GitHub username.'; 
        },
        },
    ])
    .then((response) => {
        var extraString = `Office #: ${ response.employeeExtra }`;
        createNewUser(employeeRole, employeeName, employeeId, employeeEmail, extraString);
    });
}


// Get employee's school - INTERN
function getSchool (employeeRole, employeeName, employeeId, employeeEmail) {
    
    inquirer
    .prompt([
        {
        type: 'input',
        message: 'Employee School:',
        name: 'employeeExtra',
        validate(value) {
            if ( value ) { return true; }
            return 'Please enter the school this employee attends.'; 
        },
        },
    ])
    .then((response) => {
        var extraString = `Office #: ${ response.employeeExtra }`;
        createNewUser(employeeRole, employeeName, employeeId, employeeEmail, extraString);
    });
}


function createNewUser(employeeRole, employeeName, employeeId, employeeEmail, extraString) { 

    let newguy = new Intern(employeeName, employeeId, employeeEmail, employeeRole, employeeExtra); 

    teamHTML += `
    <div class="employee-block">
        <div>Employee Name: ${ newguy.employeeName }</div>
        <div>Employee ID #${ newguy.employeeId }</div>
        <div>Email: ${ newguy.employeeEmail }</div>
        <div>Job Title: ${ newguy.employeeRole }</div>
        <div>${ newguy.employeeExtra}</div>
    </div>
    `;
          
    // Prompt user to enter another employee or exit the application
    addOrExit();
}




// Find out if the user wants to add an employee or quit the application
function getEmployeeInfo (employeeRole) {
    
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'Employee Name:',
            name: 'employeeName',
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
            validate(value) {
                var emailChars = value.split("");
                if (value.length && emailChars.includes("@") && emailChars.includes(".")) { return true; }
                return 'Please enter a valid email address.'; 
            }
         },
    ])
    .then((response) => {

        var eRole = employeeRole;
        var eName = response.employeeName;
        var eId = response.employeeId;
        var eEmail = response.employeeEmail;

        getEmployeeExtra(eRole, eName, eId, eEmail);
    });
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

    fs.writeFile('./dist/index.html', `${htmlSnippet}`, (err)=>{
    return console.log("done!");
    } );

}

addOrExit(); 