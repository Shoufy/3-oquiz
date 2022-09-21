const CoreModel = require("./CoreModel");

class User extends CoreModel {
    _email;
    _password;
    _firstname;
    _lastname;

    constructor(obj) {
        super(obj);
        this.email = obj.email;
        this.password = obj.password;
        this.firstname = obj.firstname;
        this.lastname = obj.lastname;
    }

    set email(email) {
        this._email = email;
    }

    get email() {
        return this._email;
    }

    set password(password) {
        this._password = password;
    }

    get password() {
        return this._password;
    }

    set firstname(firstname) {
        this._firstname = firstname;
    }

    get firstname() {
        return this._firstname;
    }

    set lastname(lastname) {
        this._lastname = lastname;
    }

    get lastname() {
        return this._lastname;
    }

    // GETTER POUR FULLNAME

    get fullName() {
        return this.lastname + ' ' + this.firstname;
    }
}

module.exports = User;