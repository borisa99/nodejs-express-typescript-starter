import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS pgcrypto')
  await knex.schema.createTable('users', table => {
    table.uuid('id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('avatar_url').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}
