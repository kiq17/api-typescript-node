import { tablesNames } from "../../ETablesNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";

export const update = async (id: number, pessoa: Omit<IPessoa, "id">): Promise<void | Error> => {
    try {
        const [{ count }] = await Knex(tablesNames.cidade)
            .where("id", "=", pessoa.cidadeId)
            .count<[{ count: number }]>("* as count");


        if (count === 0) return new Error("Não foi encontrado");

        const result = await Knex(tablesNames.pessoa)
            .update(pessoa)
            .where("id", "=", id);

        if (result > 0) return;

        return new Error("Error ao atualizar registro");
    } catch (error) {
        return new Error("Error ao atualizar registro");
    }
};