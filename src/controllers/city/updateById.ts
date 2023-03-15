import { Request, Response } from "express";
import * as yup from "yup";
import { ICidade } from "../../database/models";
import { cidadesProvider } from "../../database/providers/cidades";
import { validation } from "../../middlewares/index";

interface iUpdateCidadeId {
    id?: number
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface iUpdateCidadeBody extends Omit<ICidade, "id"> { }

export const updateValidation = validation((getSchema) => ({
    params: getSchema<iUpdateCidadeId>(yup.object().shape({
        id: yup.number().required().moreThan(0),
    })),
    body: getSchema<iUpdateCidadeBody>(yup.object().shape({
        nome: yup.string().required().min(4).max(30),
    })),
}));


export const updateById = async (req: Request<iUpdateCidadeId, {}, iUpdateCidadeBody>, res: Response) => {

    if (!req.params.id) {
        return res.status(400).json({ error: "Id não foi informado" });
    }

    const response = await cidadesProvider.update(req.params.id, req.body);

    return res.status(200).json(response);

};