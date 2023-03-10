const dotenv = require('dotenv');
const appPath = require('app-root-path');
const { types } = require('pg');

const TIMESTAMPTZ_OID = 1184;
const TIMESTAMP_OID = 1114;
types.setTypeParser(TIMESTAMPTZ_OID, val => val);
types.setTypeParser(TIMESTAMP_OID, val => val);

dotenv.config({ path: `${appPath}/.env` });
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DEV_HOST,
      database: process.env.DEV_DB,
      user: process.env.DEV_USER,
      password: process.env.DEV_PASSWORD,
      port: process.env.DEV_PORT,
      ssl: {
        rejectUnauthorized: false
      }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: `${appPath}/server/database/migrations`
    },
    seeds: {
      directory: `${appPath}/server/database/seeds`
    }
  },
  
  production: {
    client: 'pg',
    connection: {
      host: process.env.PROD_HOST,
      database: process.env.PROD_DB,
      user: process.env.PROD_USER,
      password: process.env.PROD_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: `${appPath}/server/database/migrations`
    },
    seeds: {
      directory: `${appPath}/server/database/seeds`
    },
    ssl: true,
    rejectUnauthorized: false
  },
  
  test: {
    client: 'pg',
    connection: {
      host: process.env.TEST_HOST,
      database: process.env.TEST_DB,
      user: process.env.TEST_USER,
      password: process.env.TEST_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: `${appPath}/server/database/migrations`
    },
    seeds: {
      directory: `${appPath}/server/database/seeds`
    }
  }
};