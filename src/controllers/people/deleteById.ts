import { Request, Response } from "express";
import * as yup from "yup";
import { pessoasProvider } from "../../database/providers/pessoas";
import { validation } from "../../middlewares";


interface IParamsPessoa {
    id?: number
}


export const deleteValidationPessoa = validation((getSchema) => ({
    query: getSchema<IParamsPessoa>(yup.object().shape({
        id: yup.number().integer().required().moreThan(1)
    }))
}));


export const deletePessoa = async (req: Request<IParamsPessoa>, res: Response) => {
    if (!req.params.id) {
        return res.status(400).json({ message: "Dados inválidos" });
    }

    const result = await pessoasProvider.deleteById(req.params.id);

    if (result instanceof Error) {
        return res.status(500).json({ message: result.message });
    }

    return res.status(204).send("");
};