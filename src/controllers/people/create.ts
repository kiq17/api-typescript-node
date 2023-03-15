import { Request, Response } from "express";
import { validation } from "../../middlewares/validation";
import * as yup from "yup";
import { pessoasProvider } from "../../database/providers/pessoas";
import { IPessoa } from "../../database/models";

interface IBodyPessoa extends Omit<IPessoa, "id"> {}


export const validacaoPessoa = validation((getSchema) => ({
    body: getSchema<IBodyPessoa>(yup.object().shape({
        nome: yup.string().required(),
        email: yup.string().required().email(),
        cidadeId: yup.number().integer().moreThan(1).required()
    }))
}));

export const createPessoa = async (req: Request<{}, {}, IBodyPessoa>, res: Response) => {
    const response = await pessoasProvider.create(req.body);
    
    if(response instanceof Error){
        return res.status(400).json({message: response.message});
    }

    return res.status(201).json(response);
};