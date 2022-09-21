class CoreModel {
    _id;

    constructor(obj) {
        this.id = obj.id;
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
}

module.exports = CoreModel;