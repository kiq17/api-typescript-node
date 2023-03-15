import { Knex } from "../../knex";
import { ICidade } from "../../models";
import { tablesNames } from "../../ETablesNames";


export const create = async (cidade: Omit<ICidade, "id">): Promise<number | Error> => {
    try {
        const [result] = await Knex(tablesNames.cidade).insert(cidade).returning("id");

        if (typeof result === "object") {
            return result.id;
        } else if (typeof result === "number") {
            return result;
        }

        return new Error("Erro ao criar cidade");

    } catch (error) {
        return new Error("Erro ao criar cidade");
    }
};