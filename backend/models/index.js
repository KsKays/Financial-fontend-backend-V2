const sequelize = require("./db"); //obj database
const Sequelize = require("sequelize"); //class from pakage sequelize
const Financial = require("./financial.model")

const db ={};
db.Sequelize = Sequelize
db.sequelize = sequelize
db.Financial = Financial


module.exports = db;
