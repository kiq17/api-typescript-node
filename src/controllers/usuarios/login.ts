import { compareSync } from "bcryptjs";
import { Request, Response } from "express";
import * as yup from "yup";
import { IUsuarios } from "../../database/models";
import { usuarioProvider } from "../../database/providers/usuarios";
import { validation } from "../../middlewares";
import { JWTService } from "../../services/JWTService";


interface IBodyUsuario extends Omit<IUsuarios, "nome" | "id"> { }


export const loginValidation = validation(getSchema => ({
    body: getSchema<IBodyUsuario>(yup.object().shape({
        email: yup.string().email().required(),
        senha: yup.string().min(6).required(),
    }))
}));


export const loginUserController = async (req: Request<{}, {}, IBodyUsuario>, res: Response) => {

    const {email, senha} = req.body;

    const response = await usuarioProvider.getByEmail(email);

    if(response instanceof Error){
        return res.status(404).json({message: "Email ou senha incorreto"});
    }

    if(compareSync(senha.toString(), response.senha)){
        const acessToken = JWTService.sign({id: response.id});

        return res.status(200).json({acessToken});
    } else{
        return res.status(401).json({message: "Email ou senha incorreto"});
    } 
};