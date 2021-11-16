import { Knex } from 'knex'

import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const config: Knex.Config = {
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    extension: 'ts',
    tableName: 'knex_migrations',
    directory: 'migrations',
  },
  seeds: {
    extension: 'ts',
    directory: 'seeds',
  },
}

export default config
