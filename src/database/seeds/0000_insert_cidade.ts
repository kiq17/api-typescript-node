import { tablesNames } from "../ETablesNames";
import { Knex } from "knex";
import cidades from "../../services/citys";

export const seed = async (knex: Knex) => {

    const [{count}] = await knex(tablesNames.cidade).count<[{count: number}]>("* as count");

    if(!Number.isInteger(count) || Number(count) > 0) return;

    const cityToInsert = cidades.map(cidade=> ({nome: cidade}));

    await knex(tablesNames.cidade).insert(cityToInsert);
};