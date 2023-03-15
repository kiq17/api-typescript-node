import { RequestHandler } from "express";
import { JWTService } from "../services/JWTService";
import "dotenv/config";

export const userAuth: RequestHandler = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: "Token não informado" });

    const [type, token] = authorization.split(" ");


    if (type !== "Bearer") return res.status(401).json({ message: "Não autenticado" });

    const checkToken = JWTService.verify(token);

    if (checkToken === "JWT_SECRET_NOT_FOUND") {
        return res.status(500).json({ message: "Erro interno do servidor" });
    } else if (checkToken === "INVALID_TOKEN") {
        return res.status(401).json({ message: "Não autenticado" });
    }


    return next();
};