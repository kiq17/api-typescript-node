import * as create from "./create";
import * as login from "./login";
export const usuarioController = {
    ...create,
    ...login
};