const CoreModel = require("./CoreModel");
const database = require('../dataBase');

class Tag extends CoreModel {
    _name;

    constructor(obj) {
        super(obj);
        this.name = obj.name;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    static findAll(callback) {
        const query = {
            text: `SELECT * FROM "tag";`
        }

        database.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            }

            const rows = result.rows;
            const tags = rows.map((row) => {
                return new Tag(row);
            })
            return callback(null, tags);
        })
        
    }
}

module.exports = Tag;