import { Request, Response } from "express";
import * as yup from "yup";
import { IUsuarios } from "../../database/models";
import { usuarioProvider } from "../../database/providers/usuarios";
import { validation } from "../../middlewares";


interface IBodyUsuario extends Omit<IUsuarios, "id"> { }


export const createUserValidation = validation(getSchema => ({
    body: getSchema<IBodyUsuario>(yup.object().shape({
        nome: yup.string().required().min(3),
        email: yup.string().required().email(),
        senha: yup.string().required().min(6)
    }))
}));

export const createUserController = async (req: Request<{}, {}, IBodyUsuario>, res: Response) => {

    const response = await usuarioProvider.create(req.body);

    if (response instanceof Error) {
        return res.status(400).json({ message: response.message });
    }

    return res.status(201).json();
};


