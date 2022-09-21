const CoreModel = require("./CoreModel");

class Answer extends CoreModel {
    static tableName = "answer";
    //Mettre un underscore pour le mettre en pseudo privé
    _description;
    _question_id;

    constructor(obj) {
        super(obj);
        this.description = obj.description;
        this.question_id = obj.question_id;
    }

    set description(description) {
        this._description = description;
    }

    get description() {
        return this._description;
    }

    set question_id(question_id) {
        this._question_id = parseInt(question_id, 10);
    }

    get question_id() {
        return this._question_id;
    }


}

module.exports = Answer;