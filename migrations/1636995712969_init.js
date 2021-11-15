/* eslint-disable no-undef */

exports.up = pgm => {
  pgm.createExtension('pgcrypto')
  pgm.createTable('users', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    first_name: { type: 'varchar(1000)', notNull: true },
    last_name: { type: 'varchar(1000)', notNull: true },
    avatar_url: { type: 'varchar(1000)', notNull: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
  pgm.createTable('roles', {
    role: { type: 'varchar(1000)', primaryKey: true, notNull: true },
    comment: { type: 'varchar(1000)', notNull: true },
  })
  pgm.createTable('accounts', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    email: { type: 'varchar(1000)', notNull: true },
    password_hash: { type: 'varchar(1000)', notNull: true },
    default_role: {
      type: 'varchar(1000)',
      notNull: true,
      references: '"roles"',
    },
    ticket: {
      type: 'uuid',
      notNull: true,
    },
    ticket_expires_at: {
      type: 'timestamp',
      notNull: true,
    },
    is_active: {
      type: 'boolean',
      default: false,
    },
    user_id: {
      type: 'uuid',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
  pgm.createIndex('accounts', 'user_id')

  pgm.createTable('account_roles', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    role: {
      type: 'varchar(1000)',
      notNull: true,
      references: '"roles"',
    },
    account_id: {
      type: 'uuid',
      notNull: true,
      references: '"accounts"',
      onDelete: 'cascade',
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
  pgm.createIndex('account_roles', 'account_id')
  pgm.createIndex('account_roles', 'role')

  pgm.createTable('refresh_tokens', {
    refresh_token: {
      type: 'uuid',
      primaryKey: true,
      notNull: true,
    },
    account_id: {
      type: 'uuid',
      notNull: true,
      references: '"accounts"',
      onDelete: 'cascade',
    },
    ticket_expires_at: {
      type: 'timestamp',
      notNull: true,
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
  pgm.createIndex('refresh_tokens', 'account_id')
}
