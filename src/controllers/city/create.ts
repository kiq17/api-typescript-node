import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../middlewares/index";
import { ICidade } from "../../database/models";
import { cidadesProvider } from "../../database/providers/cidades";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface iBodyParams extends Omit<ICidade, "id"> { }

export const bodyValidation = validation((getSchema) => ({
    body: getSchema<iBodyParams>(yup.object().shape({
        nome: yup.string().required().min(4).max(30),
    }))
}));

export const createCity= async (req: Request<{}, {}, iBodyParams>, res: Response) => {
    const response = await  cidadesProvider.create(req.body);

    if(response instanceof Error){
        return res.status(500).json({message: "Erro ao criar cidade"});
    }

    res.status(201).json({...req.body, id: response});
};