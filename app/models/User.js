const CoreModel = require("./CoreModel");
const dataBase = require("../dataBase");

class User extends CoreModel {
    static tableName = "user";
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

    insert(callback) {
        const query = {
            text: `INSERT INTO "user" (email, password, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING id`,
            values: [this.email, this.password, this.firstname, this.lastname]
        }
        dataBase.query(query, (err, result) => {
            if (err) {
                return callback(err, null)
            }
            this.id = result?.rows?.[0]?.id;
            return callback(null, this);
        })
    }

    update(callback) {
        const query = {
            text: 
            `UPDATE "user" 
            SET 
                email = $1, 
                password = $2, 
                firstname = $3, 
                lastname = $4 
            WHERE "id" = $5;
            `,
            values: [this.email, this.password, this.firstname, this.lastname, this.id]
        }
        dataBase.query(query, (err, result) => {
            if (err) {
                return callback(err, null)
            }
           /*  if (result.rowCount) {
                return callback(null, this);
            } else {
                return callback(new Error('User not updated ', this));
            } */
            return callback(null, this); 
        })
    }

    delete(callback) {
        const query = {
            text: `DELETE FROM "user" WHERE "id" = $1;`,
            values: [this.id]
        }
        dataBase.query(query, (err, result) => {
            if (err) {
                return callback(err)
            }
            if (result.rowCount) {
                return callback(null);
            } else {
                return callback(new Error('User not delete '));
            }            
        })
    }

}

module.exports = User;