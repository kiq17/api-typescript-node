/* eslint-disable linebreak-style */
import { Knex } from "knex";
import { tablesNames } from "../ETablesNames";

export async function up(knex: Knex) {
    return knex.schema.createTable(tablesNames.cidade, table => {
        table.bigIncrements("id").primary().index();
        table.string("nome", 60).notNullable().index();

        table.comment("Tabela usada para armazenar cidades no sistema");
    }).then(
        () => console.log(`Tabela ${tablesNames.cidade} criada com sucesso`)
    );
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(tablesNames.cidade).then(
        () => console.log(`Tabela ${tablesNames.cidade} excluída com sucesso`)
    );
}