var Sequelize = require("sequelize");
var config = require("../../config").db;

var sequelize = new Sequelize(config.db_name, config.db_username, config.db_password, {
  host: config.url,
  port: 5432,
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;