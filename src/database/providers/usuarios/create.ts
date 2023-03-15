import { hashSync } from "bcryptjs";
import { tablesNames } from "../../ETablesNames";
import { Knex } from "../../knex";
import { IUsuarios } from "../../models";

export const create = async (usuario: Omit<IUsuarios, "id">): Promise<Number | Error> => {
    try {

        const passHash = hashSync(usuario.senha.toString());
        usuario.senha = passHash;

        const [result] = await Knex(tablesNames.usuario).insert(usuario).returning("id");

        if (typeof result === "object") {
            return result.id;
        } else if (typeof result === "number") {
            return result;
        }

        return new Error("Erro ao buscar registro");
    } catch (error) {
        return new Error("Erro ao buscar registro");
    }
};