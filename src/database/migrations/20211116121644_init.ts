import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  //Add PG CRYPTO extension
  await knex.raw('CREATE EXTENSION IF NOT EXISTS pgcrypto')

  //CREATE users TABLE
  await knex.schema.createTable('users', table => {
    table.uuid('id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.string('first_name').notNullable()
    table.string('last_name').notNullable()
    table.string('avatar_url').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })

  //CREATE roles TABLE
  await knex.schema.createTable('roles', table => {
    table.string('value').primary().notNullable()
  })

  //CREATE accounts TABLE
  await knex.schema.createTable('accounts', table => {
    table.uuid('id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.string('email').notNullable()
    table.string('password_hash').notNullable()
    table.uuid('ticket')
    table.timestamp('ticket_expires_at')
    table.boolean('is_active').notNullable().defaultTo(false)
    table.uuid('user_id').notNullable().references('id').inTable('users')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
    table.index('user_id')
  })

  //CREATE account_roles TABLE
  await knex.schema.createTable('account_roles', table => {
    table.uuid('id').primary().defaultTo(knex.raw('public.gen_random_uuid()'))
    table.uuid('account_id').notNullable().references('id').inTable('accounts')
    table.string('role').notNullable().references('value').inTable('roles')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
    table.index('account_id')
    table.index('role')
  })

  //CREATE refresh_tokens TABLE
  await knex.schema.createTable('refresh_tokens', table => {
    table
      .uuid('refresh_token')
      .primary()
      .defaultTo(knex.raw('public.gen_random_uuid()'))
    table.timestamp('expires_at').notNullable()
    table.uuid('account_id').notNullable().references('id').inTable('accounts')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.index('account_id')
  })
}
export async function down(knex: Knex): Promise<void> {
  //DROP refresh_tokens TABLE
  await knex.schema.dropTable('refresh_tokens')

  // DROP accounts TABLE
  await knex.schema.dropTable('account_roles')

  // DROP accounts TABLE
  await knex.schema.dropTable('accounts')

  // DROP roles TABLE
  await knex.schema.dropTable('roles')

  // DROP users TABLE
  await knex.schema.dropTable('users')
}
