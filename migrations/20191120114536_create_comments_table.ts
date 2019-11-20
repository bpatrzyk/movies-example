import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('comments', (table) => {
    table.uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('movie_id')
      .notNullable()
      .references('id')
      .inTable('movies');
    table.text('comment').notNullable();
  });
}


export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('comments');
}

