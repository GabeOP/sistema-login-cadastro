const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("login", "root", "159753", {
  host: 'localhost',
  dialect: "mysql"
})

module.exports = sequelize;