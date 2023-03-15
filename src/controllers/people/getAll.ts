import { Request, Response } from "express";
import * as yup from "yup";
import { pessoasProvider } from "../../database/providers/pessoas";
import { validation } from "../../middlewares";


interface IQueryPessoa {
    filter?: string,
    page?: number,
    limit?: number,
}

export const queryPessoaValidationAll = validation(getSchema => ({
    query: getSchema<IQueryPessoa>(yup.object().shape({
        page: yup.number().moreThan(1),
        filter: yup.string().default(""),
        limit: yup.number().moreThan(1),
    }))
}));


export const getAllPessoa = async (req: Request<{}, {}, {}, IQueryPessoa>, res: Response) => {
    const response = await pessoasProvider.getAll(req.query.page || 1, req.query.filter || "", req.query.limit || 1);
    const count = await pessoasProvider.count(req.query.filter);

    if(response instanceof Error){
        return res.status(500).json({message: response.message});
    } else if(count instanceof Error){
        return res.status(500).json({message: count.message});
    }

    res.setHeader("total-resgitros-exposed", count);
    return res.status(200).json(response);

};