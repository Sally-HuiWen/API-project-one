//this script is used to ensure that a specific database schema exists. 
//If the schema specified by process.env.SCHEMA does not exist, it creates the schema.

const { sequelize } = require('./db/models');

sequelize.showAllSchemas({ logging: false }).then(async (data) => {
  if (!data.includes(process.env.SCHEMA)) {
    await sequelize.createSchema(process.env.SCHEMA);
  }
});