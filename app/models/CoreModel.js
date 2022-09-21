const dataBase = require('../dataBase');

class CoreModel {
    _id = null;

    static tableName;

    constructor(obj) {
        this.id = obj.id;
    }

    set id(id) {
        // si l'id vaut qqch
        if (id) {
            // als on vérifie son intégrité
            if (isNaN(parseInt(id, 10))) {
                // si c'est pas bon on fait planter
                throw new Error('Id doit être un Integer')
            }
            // si c'est bon on le set
            this._id = parseInt(id, 10);
        } 
        // si jamais l'id ne vaut rien, 
        else {
            // on impose l'id à null
            this._id = null;
        }
    }

    get id() {
        return this._id;
    }

    static findAll(callback) {
        const query = {
            text: `SELECT * FROM ${this.tableName};`
        }
        console.log(this, query);
        dataBase.query(query, (err, result) => {
            if (err) {
                return callback(err, null); 
            }
            const rows = result?.rows;
            const data = rows.map((row) => {
                return new this(row);
            });
            return callback(null, data);
        })
    }

    static findOne(id, callback) {
        const query = {
            text: `SELECT * FROM ${this.tableName} WHERE "id" = $1;`,
            values: [id]
        }
        dataBase.query(query, (err, result) => {
            if (err) {
                return callback(err, null); 
            }
            const row = result?.rows?.[0];
            if (row) {
                const data = new this(row);
                return callback(null, data);
            } else {
                return callback(new Error('did not find one', null));
            }
        });
    }
}

module.exports = CoreModel;