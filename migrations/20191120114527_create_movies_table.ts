import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('movies', (table) => {
    table.uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.text('title')
      .unique()
      .notNullable();
    table.integer('year');
    table.text('genre');
    table.text('country');
  });
}


export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('movies');
}
