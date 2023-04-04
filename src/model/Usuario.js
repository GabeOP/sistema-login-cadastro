const { DataTypes } = require("sequelize");
const db = require("../database/db");

const Usuario = db.define(
  "Usuario",
  {
    email: {
      type: DataTypes.STRING,
    },
    senha: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

Usuario.sync();

module.exports = Usuario;
