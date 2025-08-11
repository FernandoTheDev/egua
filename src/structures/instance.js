import { RuntimeError } from "../errors.js";

export default class EguaInstance {
    constructor(creatorClass) {
        this.creatorClass = creatorClass;
        this.fields = {};
    }

    get(name) {
        if (this.fields.hasOwnProperty(name.lexeme)) {
            return this.fields[name.lexeme];
        }

        let method = this.creatorClass.findMethod(name.lexeme);
        if (method) return method.bind(this);

        throw new RuntimeError(name, `Método ${name.lexeme} não foi definido.`);
    }

    set(name, value) {
        this.fields[name.lexeme] = value;
    }

    toString() {
        return "<Objeto " + this.creatorClass.name + ">";
    }
};
