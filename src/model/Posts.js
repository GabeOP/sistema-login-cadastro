const { DataTypes } = require("sequelize");
const db = require("../database/db");

const Posts = db.define(
  "Post",
  {
    titulo: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

Posts.sync();

module.exports = Posts;
