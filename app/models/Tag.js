const CoreModel = require("./CoreModel");
const database = require('../dataBase');

class Tag extends CoreModel {
    static tableName = "tag";
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

    static findOne(id, callback) {
        const query = {
            text: `SELECT * FROM "tag" WHERE "id" = $1;`,
            values: [id]
        }
        database.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            const tagObj = result?.rows?.[0];
            if (tagObj) {
                const tagInstance = new Tag(tagObj);
                return callback(null, tagInstance);
            } else {
                return callback(null, null);
            }
        });
    }
    /**
     * Fonction permettant de créer le tag en BDD
     * @param {func} callback 
     */
    create(callback) {
        const query = {
            // Sachant que nous ne connaissons pas l'id à l'avance
            // puisque c'est PG qui va le générer tout seul
            // On écrit dans la requete le RETURNING id, pour que PG
            // nous retourne l'id dont il se sera servit en réponse à l'insertion
            text: `INSERT INTO "tag" (name) VALUES ($1) RETURNING id`,
            // this représente l'instance en cours
            values: [this.name]
        }
        // on execute la requete SQL de création du Tag
        database.query(query, (err, result) => {
            // si y'a une erreur, l'entrée n'est surement pas crée, dc on stop ici
            if (err) {
                return callback(err, null)
            }
            // On vient récupérer l'id crée par PG à l'insertion de notre Tag
            const insertedId = result?.rows?.[0]?.id;
            // Ici insertedId vaut l'id utilisé par PG pour créer le tag en BDD
            // Mtn qu'on a l'id, on va pouvoir modifier l'instance en cours
            // afin d'y stocker cette nouvelle info
            // on vient donc modifier la propriété id de l'instance en cours
            this.id = insertedId
            // on aurait pu écrire this.id = result?.rows?.[0]?.id;
            // this avait déjà un name, il a en plus l'id de rempli
            return callback(null, this)
        })
    }

    update(callback) {
        const query = {
            text: `UPDATE "tag" SET name = $1 WHERE "id" = $2`,
            values: [this.name, this.id]
        }
        database.query(query, (err, result) => {
            if (err) {
                return callback(err, null)
            }
            return callback(null, this)
        })
    }

    delete(callback) {
        const query = {
            text: `DELETE FROM "tag" WHERE "id" = $1`,
            values: [this.id]
        }
        database.query(query, (err, result) => {
            if (err) {
                return callback(err, false);
            }
            if (result.rowCount) {
                callback(null, true);
            } else {
            return callback("Delete did not target ant rows", false);
            }
        })
    }

}

module.exports = Tag;