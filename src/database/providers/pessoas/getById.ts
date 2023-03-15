import { tablesNames } from "../../ETablesNames";
import { Knex } from "../../knex";

export const getById = async (id: number): Promise<Object | Error> => {
    try {
        const result = await Knex(tablesNames.pessoa)
            .select("*")
            .where("id", "=", id)
            .first();

        if (result) return result;

        return new Error("Error ao selecionar informação");
    } catch (error) {
        console.log(error);
        return new Error("Error ao selecionar informação");
    }
};