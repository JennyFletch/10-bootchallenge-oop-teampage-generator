const Intern = require("../lib/intern");
let newguy = new Intern("Otto", "726832", "otto@cooljob.com", "Full Sail University");

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
test("The employee should be an engineer.", () => {
    let newguyRole = newguy.getRole();
    expect(newguyRole).toMatch("Intern");
}) 

// EMPLOYEE SCHOOL
test("The employee's school should be a usable string.", () => {
    
    let newguySchool = newguy.getSchool();

    expect(newguySchool).not.toBeUndefined();
    expect(newguySchool).not.toBeNull();
    expect(newguySchool).not.toBeFalsy();
})