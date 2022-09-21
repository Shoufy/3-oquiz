const CoreModel = require("./CoreModel");
const dataBase = require("../dataBase");

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

    static findAll(callback) {
        const query = {
            text : `SELECT * FROM "user";`
        }
        dataBase.query(query, (err, result) => {
            if(err) {
                return callback(err, null)
            }
            const rows = result.rows;
            const users = rows.map((row) => {
                return new User(row); 
            })
            return callback(null, users);      
        })
    }

    static findById(id, callback) {
        const query = {
            text: `SELECT * FROM "user" WHERE "id" = $1;`,
            values: [id] 
        }
        dataBase.query(query, (err, result) => {
            if(err) {
                return callback(err, null);
            }
            const userObj = result?.rows?.[0];
            if (userObj) {
                const userInstance = new User(userObj);
                return callback(null, userInstance);
            } else {
                return callback(null, null);
            }
        });
    }
}

module.exports = User;