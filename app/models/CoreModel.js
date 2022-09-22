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
            text: `SELECT * FROM "${this.tableName}";`
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
        });
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
                const datum = new this(row);
                return callback(null, datum);
            } else {
                return callback(new Error(this.name + 'not found (findOne method)', null));
            }
        });
    }

    create(callback) {
        // un objet n'est pas ordonné, un tableau SI!
        let tbKeys = [];
        let tbValues = [];
        let placeHolders = [];

        let propertyName = Object.getOwnPropertyNames(this); //ici on récupère "_id, _title etc etc" les propriétés
        // ms on ne veut pas de l'id (car déjà autogénéré par la BDD) donc on filtre
        propertyName = propertyName.filter(
            (property) => {
                if (property === "_id") {
                    return false;
                } else {
                    return true;
                }
            }
        );
        //on va retirer ici les underscore qui nous gène avec substring
        propertyName = propertyName.forEach((property, index) => {
            tbKeys.push(`${property.substring(1)}`);
            tbValues.push(`${this[property]}`);
            placeHolders.push('$' + (index + 1));
        })
        //console.log("property list APRES SUBSTRING : ", propertyList);
        //let propertyValue = Object.values(this);
        //console.log("property value :", propertyValue);

        const query = {
            text: `INSERT INTO "${this.constructor.tableName}" 
            (${tbKeys.join(', ')}) 
            VALUES (${placeHolders.join(', ')})
            RETURNING id; 
            `,
            values: tbValues // tbValues est déjà un tableau
        }
        //console.log(query);
        dataBase.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            const id = result?.rows?.[0]?.id;
            if (id) {
                this.id = id;
                return callback(null, this);
            } else {
                return callback(new Error(this.constructor.name + "not created"), null);
            }
        })
    }

    update(callback) {
        let tbKeysPlaceHolder = [];
        let tbValues = [];

        let propertyName = Object.getOwnPropertyNames(this);
        propertyName = propertyName.filter(
            (property) => {
                if (property === "_id") {
                    return false;
                } else {
                    return true;
                }
            }
        );
        propertyName = propertyName.forEach((property, index) => {
            tbKeysPlaceHolder.push(`${property.substring(1)} = $${index + 1}`);
            tbValues.push(`${this[property]}`);
        })
        tbValues.push(this['_id']);
        const query = {
            text: `UPDATE "${this.constructor.tableName}"
            SET  
                ${tbKeysPlaceHolder.join(', ')}
             WHERE "id" = $${tbKeysPlaceHolder.length+1};
             `,
            values: tbValues
        }
        //console.log(query);
        dataBase.query(query, (err, result) => {
            if (err) {
                return callback(err, null)
            }
            if (result.rowCount) {
                return callback(null, this);
            } else {
                return callback(new Error(this.constructor.name + ' not updated', this));
            }
        });
    }

    delete(callback) {
        const query = {
            text: `DELETE FROM "${this.constructor.tableName}" 
            WHERE "id" = $1;`,
            values: [this.id]
        }
        dataBase.query(query, (err, result) => {
            if (err) {
                return callback(err)
            }
            if (result.rowCount) {
                return callback(null);
            } else {
                return callback(new Error(this.constructor.name + 'not delete'));
            }            
        })
    }

    static findBy(params, callback) {
        const query = {
            text: ``
        }
    }

    save(callback) {
        if (this.id) {
            this.update(callback);
        } else {
            this.create(callback);
        }
    }
}

module.exports = CoreModel;