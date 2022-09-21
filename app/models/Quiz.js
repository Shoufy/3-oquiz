const CoreModel = require("./CoreModel");

class Quiz extends CoreModel {
    static tableName = "quiz";
    _title
    _theme
    _description
    _user_id

    constructor(obj) {
        super(obj);
        this.title = obj.title;
        this.theme = obj.theme;
        this.description = obj.description;
        this.user_id = obj.user_id;
    }

    get title() {
        return this._title;
    }

    set title(title) {
        this._title = title;
    }

    get theme() {
        return this._theme;
    }

    set theme(theme) {
        this._theme = theme;
    }

    get description() {
        return this._description;
    }

    set description(description) {
        this._description = description;
    }

    get user_id() {
        return this._user_id;
    }

    set user_id(user_id) {
        this._user_id = user_id;
    }  

    
}

module.exports = Quiz;