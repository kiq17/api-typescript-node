import { Request, Response } from "express";
import * as yup from "yup";
import { cidadesProvider } from "../../database/providers/cidades";
import { validation } from "../../middlewares/index";

interface iCidadeId {
    id?: number
}

export const getValidation = validation((getSchema) => ({
    params: getSchema<iCidadeId>(yup.object().shape({
        id: yup.number().required().moreThan(0),
    }))
}));


export const getById = async (req: Request<iCidadeId>, res: Response) => {

    if (!req.params.id) {
        return res.status(400).json({ error: "Id não foi informado" });
    }

    const response = await cidadesProvider.getById(req.params.id);

    if (response instanceof Error) {
        res.status(500).json({ message: "Erro interno do servidor" });
    }

    return res.status(200).json(response);
};