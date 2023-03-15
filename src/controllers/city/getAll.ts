import { Request, Response } from "express";
import * as yup from "yup";
import { cidadesProvider } from "../../database/providers/cidades";
import { validation } from "../../middlewares/index";


interface iQueryProps {
    id?: number,
    page?: number,
    limit?: number,
    filter?: string
}

export const queryValidation = validation((getSchema) => ({
    query: getSchema<iQueryProps>(yup.object().shape({
        page: yup.number().notRequired().moreThan(0),
        limit: yup.number().notRequired().moreThan(0),
        id: yup.number().notRequired().integer().default(0),
        filter: yup.string().notRequired(),
    }))
}));

export const getAll = async (req: Request<{}, {}, {}, iQueryProps>, res: Response) => {
    const response = await cidadesProvider.getAll(req.query.page || 1,
        req.query.filter || "",
        req.query.limit || 7,
        Number(req.query.id));

    const count = await cidadesProvider.count(req.query.filter);

    if (count instanceof Error) {
        return res.status(400).json({ error: "Dados inválidos" });
    }

    if (response instanceof Error) {
        return res.status(400).json({ error: "Dados inválidos" });
    }

    return res.status(200).json({message: {response, count}});
};