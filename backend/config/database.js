// backend/config/database.js
//This will allow you to load the database configuration environment variables from the .env file 
//into the config/index.js, as well as define the global schema for the project.
//When you deploy your application to production, your database will be read from a URL path instead of a local database file. 
//SQLite3 is a database management system used ONLY in development. PostgresQL is a production-level database management system.

const config = require('./index');

module.exports = {
  development: {
    storage: config.dbFile,//config means config/index
    dialect: "sqlite",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true,
    logging: console.log 
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
      schema: process.env.SCHEMA
    }
  }
};