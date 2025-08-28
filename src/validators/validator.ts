import { body, query } from "express-validator";

class validator {
    constructor() {}

    public emptyFields(campo: string[]){
        return campo.map((e) => body(e).trim().isLength({ min: 1 }).withMessage("Faltan datos"));
    }

    public validateQuery(queryArg: string){
        return query(queryArg).notEmpty().escape().withMessage("Query invalida");
    }

    public validateEmail(email: string){
        return query(email).isEmail().withMessage("Email invalido");
    }
}

export default new validator();