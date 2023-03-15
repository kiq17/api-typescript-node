import { Request, Response } from "express";
import * as yup from "yup";
import { pessoasProvider } from "../../database/providers/pessoas";
import { validation } from "../../middlewares";


interface IQueryPessoa {
    id?: number
}


export const queryPessoaValidationId = validation(getSchema => ({
    query: getSchema<IQueryPessoa>(yup.object().shape({
        id: yup.number().integer().moreThan(1)
    }))
}));


export const getByIdPessoa = async (req: Request<{}, {}, {}, IQueryPessoa>, res: Response) => {
    if(!req.query.id){
        return res.status(400).json({message: "Dados inválidos"});
    }
    const response = await pessoasProvider.getById(req.query.id);

    if(response instanceof Error){
        return res.status(500).json({message: response.message});
    }

    return res.status(200).json(response);
}; 