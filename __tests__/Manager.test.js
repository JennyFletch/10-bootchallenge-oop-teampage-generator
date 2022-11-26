const Manager = require("../lib/manager");
let newguy = new Manager("Thelma", "886670", "thelma@cooljob.com", "320");

// EMPLOYEE NAME
test("The new employee's name should be a usable string.", () => {

    let newguyName = newguy.getName();

    expect(newguyName).not.toBeUndefined();
    expect(newguyName).not.toBeNull();
    expect(newguyName).not.toBeFalsy();
})

// EMPLOYEE ID
describe("Testing the Employee ID properties", () => {

    let newguyIdInput = newguy.getId();

    test("The new employee's ID should be a positive number of no more than six digits.", () => {

        var newguyId = Number(newguyIdInput);

        expect(newguyId).not.toBeUndefined();
        expect(newguyId).not.toBeNull();
        expect(newguyId).not.toBeFalsy();
        expect(newguyId).toBeGreaterThan(0); 
    })

    test("The new employee's ID should be six digits long.", () => {

        let newguyIdChars = newguyIdInput.split("");
        
        expect( newguyIdChars[6] ).toBeUndefined();
        expect( newguyIdChars[5] ).not.toBeUndefined();
    })

})

// EMPLOYEE EMAIL
describe("Testing the Employee Email properties", () => {

    let newguyEmailInput = newguy.getEmail();

    test("The new employee's email should be a usable string.", () => {

        expect(newguyEmailInput).not.toBeUndefined();
        expect(newguyEmailInput).not.toBeNull();
        expect(newguyEmailInput).not.toBeFalsy();
    })

    test("The new employee's email address should include @ and a period.", () => {

        let newguyEmailChars = newguyEmailInput.split("");
        
        expect( newguyEmailChars ).toContain("@");
        expect( newguyEmailChars ).toContain(".");
    })

})

// EMPLOYEE ROLE
test("The employee should be a manager.", () => {
    let newguyRole = newguy.getRole();
    expect(newguyRole).toMatch("Manager");
}) 

// EMPLOYEE OFFICE NUMBER 
test("Office number should be a usable positive number less than 400.", () => {
    let newguyOffice = newguy.getOffice();
    let newguyOfficeNum = Number(newguyOffice);

    expect(newguyOffice).not.toBeUndefined();
    expect(newguyOffice).not.toBeNull();
    expect(newguyOffice).not.toBeFalsy();
    expect(newguyOfficeNum).toBeLessThan(400);
})