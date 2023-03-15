import { Knex } from "../../knex";
import { tablesNames } from "../../ETablesNames";
import { IPessoa } from "../../models";

export const getAll = async (page: number, filter: string, limit: number): Promise<IPessoa[] | Error> => {
    try {
        const result = await Knex(tablesNames.pessoa)
            .select("*")
            .where("nome", "like", `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit);


        return result;
    } catch (error) {
        return new Error("Erro ao executar chamada");
    }
};