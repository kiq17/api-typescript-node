import { Knex } from "../../knex";
import { IPessoa } from "../../models";
import { tablesNames } from "../../ETablesNames";


export const create = async (pessoa: Omit<IPessoa, "id">): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(tablesNames.cidade)
            .where("id", "=", pessoa.cidadeId)
            .count<[{ count: number }]>("* as count");


        if( count === 0 ) return new Error("Não foi encontrado");

        const [result] = await Knex(tablesNames.cidade).insert(pessoa).returning("id");

        if (typeof result === "object") {
            return result.id;
        } else if (typeof result === "number") {
            return result;
        }

        return new Error("Erro ao criar pessoa");

    } catch (error) {
        return new Error("Erro ao criar pessoa");
    }
};