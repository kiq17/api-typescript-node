import { Knex } from "knex";
import { tablesNames } from "../ETablesNames";


export async function up(knex: Knex) {
    return knex.schema.createTable(tablesNames.usuario, table => {
        table.bigIncrements("id").index();
        table.string("nome", 60).notNullable();
        table.string("email", 60).notNullable();
        table.string("senha", 20).notNullable();


        table.comment("Tabela usado para armazenar usuários");
    }).then(() => {
        console.log(`Tabela de ${tablesNames.usuario} criado com sucesso`);
    });

}


export async function down(knex: Knex) {
    return knex.schema.dropTable(tablesNames.usuario)
        .then(() => console.log(`Tabele ${tablesNames.usuario} removida com sucesso`));
}

