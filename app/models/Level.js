const CoreModel = require("./CoreModel");

class Level extends CoreModel {
    static tableName = "level";
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
}

module.exports = Level;