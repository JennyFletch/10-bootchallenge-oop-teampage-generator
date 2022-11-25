// Sample test for reference
/* test("should confirm 1 + 1 = 2", () => {
    expect(1 + 1).toBe(2);
})  */

// jest matcher methods
// .toBe .not.toBe .toBeDefined .toBeUndefined .toBeNull .toBeTruthy .toBeFalsy 
// .toEqual .toMatch .toContain .toThrow
// Link to full list: https://jestjs.io/docs/expect

// describe("", () => {}) // describe block to help group tests within a file

const Employee = require("../lib/employee");
let newguy = new Employee("Zack", "046104", "zack@cooljob.com");

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
