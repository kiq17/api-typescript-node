import * as create from "./create";
import * as getByEmail from "./getByEmail";


export const usuarioProvider = {
    ...create,
    ...getByEmail
};