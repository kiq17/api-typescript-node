import { Router } from "express";

const routes = Router();

import { cityController } from "../controllers";
import { userAuth } from "../middlewares/userAuth";


routes.post("/criar", userAuth, cityController.bodyValidation, cityController.createCity);

routes.get("/cidades", userAuth, cityController.queryValidation, cityController.getAll);

routes.get("/cidades/:id", cityController.getValidation, cityController.getById);

routes.put("/cidades/:id", cityController.updateValidation, cityController.updateById);

routes.delete("/cidades/:id", cityController.deleteValidation, cityController.deleteById);


export default routes;