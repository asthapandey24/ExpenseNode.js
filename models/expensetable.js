const Sequelize = require('sequelize');

const sequelize = require('../util/database.js');

const expensedata = sequelize.define('expensetable',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement : true,  
    allowNull : false,
    primaryKey: true
  },
  expense: {
    type: Sequelize.INTEGER,

  },
  discription: {
    type: Sequelize.STRING,

  },
  category: {
    type: Sequelize.STRING
  }
});

module.exports = expensedata;