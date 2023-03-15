import { tablesNames } from "../../ETablesNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export const update = async (id: number, cidade: Omit<ICidade, "id">): Promise<void | Error> => {
    try {
        const result = await Knex(tablesNames.cidade).update(cidade).where("id", "=", id);

        if(result > 0) return;

        return new Error("Error ao atualizar registro");
    } catch (error) {
        return new Error("Error ao atualizar registro");
    }
};