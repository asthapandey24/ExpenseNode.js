// const Sequelize = require('sequelize')
// const dotenv = require('dotenv');
// dotenv.config();



// const sequelize = new Sequelize(process.env.MYSQL_DATABASE_NAME,process.env.MYSQL_USERNAME,process.env.MYSQL_PASSWORD,
// {
//     dialect: 'mysql',
//     host: process.env.HOST_NAME
// })

// module.exports = sequelize ;

module.exports = {
    mongoURI: "mongodb://127.0.0.1:27017/ExpenseTracker",
  };