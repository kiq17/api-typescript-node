import { tablesNames } from "../../ETablesNames";
import { Knex } from "../../knex";
import { IUsuarios } from "../../models";

export const getByEmail = async (email: string): Promise<Error | IUsuarios> => {
    try {
        const result = await Knex(tablesNames.usuario)
            .select("*")
            .where("email", "=", email)
            .first();

        if(result) return result;
        
        return new Error("Erro ao buscar registro");
    } catch (error) {
        return new Error("Erro ao buscar registro");
    }
};