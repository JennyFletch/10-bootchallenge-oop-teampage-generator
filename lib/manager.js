const Employee = require('./employee');

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {

        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getOffice() {
        return this.officeNumber;
    }
}

Manager.prototype.getRole = function () {
    return "Manager";
};

module.exports = Manager;