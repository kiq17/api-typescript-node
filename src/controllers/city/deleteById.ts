import { Request, Response } from "express";
import * as yup from "yup";
import { cidadesProvider } from "../../database/providers/cidades";
import { validation } from "../../middlewares/index";

interface iDeleteCidadeId {
    id?: number
}

export const deleteValidation = validation((getSchema) => ({
    params: getSchema<iDeleteCidadeId>(yup.object().shape({
        id: yup.number().required().moreThan(0),
    }))
}));


export const deleteById = async (req: Request<iDeleteCidadeId>, res: Response)=>{

    if(!req.params.id){
        return res.status(400).json({error: "Id não foi informado"});
    }
    
    const response = await cidadesProvider.deleteById(req.params.id);
    
    if(response instanceof Error){
        return res.status(500).json({error: "Dados inválidos"});
    }
    
    return res.status(204).json(response);
};