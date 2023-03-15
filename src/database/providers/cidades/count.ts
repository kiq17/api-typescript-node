import { tablesNames } from "../../ETablesNames";
import { Knex } from "../../knex";

export const count = async (filter = ""): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(tablesNames.cidade)
            .select("*")
            .where("nome", "like", `%${filter}%`)
            .count<[{ count: number }]>("* as count");
        if (Number.isInteger(Number(count))) return Number(count);

        return new Error("Erro ao executar chamda");
    } catch (error) {
        return new Error("Erro ao executar chamda");
    }
};