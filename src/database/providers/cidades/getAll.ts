import { Knex } from "../../knex";
import { tablesNames } from "../../ETablesNames";
import { ICidade } from "../../models";

export const getAll = async (page: number, filter: string, limit: number, id = 0): Promise<ICidade[] | Error> => {
    try {
        const result = await Knex(tablesNames.cidade)
            .select("*")
            .where("id", "=", Number(id))
            .orWhereLike("nome", "=", `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit);

        if (Number(id) > 0 && result.every(item => item.id !== Number(id))) {
            const resultId = await Knex(tablesNames.cidade)
                .select("*")
                .where("id", "=", Number(id))
                .first();

            if (resultId) return [...result, resultId];
        }

        return result;
    } catch (error) {
        return new Error("Erro ao executar chamada");
    }
};