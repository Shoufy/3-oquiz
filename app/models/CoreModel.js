class CoreModel {
    _id = null;

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
}

module.exports = CoreModel;