/* eslint-disable linebreak-style */
import { Knex } from "knex";
import { tablesNames } from "../ETablesNames";

export async function up(knex: Knex) {
    return knex.schema.createTable(tablesNames.pessoa, table => {
        table.bigIncrements("id").primary().index();
        table.string("nome", 60).notNullable().index();
        table.string("email", 60).unique().notNullable().index();

        table.bigInteger("cidadeId")
            .index()
            .notNullable()
            .references("id")
            .inTable(tablesNames.pessoa)
            .onUpdate("CASCADE")
            .onDelete("RESTRICT");

        table.comment("Tabela usada para armazenar pessoas no sistema");
    }).then(
        () => console.log(`Tabela ${tablesNames.pessoa} criada com sucesso`)
    );
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(tablesNames.pessoa).then(
        () => console.log(`Tabela ${tablesNames.pessoa} excluída com sucesso`)
    );
}