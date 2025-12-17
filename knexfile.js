// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require('dotenv').config()

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host:process.env.DB_HOST,
      password:process.env.DB_PASSWORD,
      user:process.env.DB_USER,
      port:process.env.DB_PORT,
      database:process.env.DB_NAME,
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    }
  }
};
