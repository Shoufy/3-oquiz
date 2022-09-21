class Answer {
    //Mettre un underscore pour le mettre en pseudo privé
    _id;
    _description;
    _question_id;

    constructor(obj) {
        this.id = obj.id;
        this.description = obj.description;
        this.question_id = obj.question_id;
    }

    set id(id) {
        if (isNaN(parseInt(id, 10))) {
            throw new Error('Id doit être un Integer')
        }
        this._id = parseInt(id, 10);
    }

    get id() {
        return this._id;
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