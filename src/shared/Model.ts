import { snakeCase } from 'lodash'
import knex_instance from './db'
import { Knex } from 'knex'

export default class Model {
  public db: Knex.QueryBuilder
  private readonly tableName: string

  constructor() {
    this.tableName = snakeCase(Object.getPrototypeOf(this).constructor.name)
    this.db = knex_instance<this>(this.tableName)
  }
}

