import { Router } from "express";
import { usuarioController } from "../controllers/usuarios";

const routes = Router();


routes.post("/cadastrar", usuarioController.createUserValidation, usuarioController.createUserController);

routes.post("/login", usuarioController.loginValidation, usuarioController.loginUserController); 

export default routes;