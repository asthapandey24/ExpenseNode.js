// const Sequelize = require('sequelize');

// const sequelize = require('../util/database.js');

// const expensedata = sequelize.define('expensetable',{
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement : true,  
//     allowNull : false,
//     primaryKey: true
//   },
//   expense: {
//     type: Sequelize.INTEGER,

//   },
//   discription: {
//     type: Sequelize.STRING,

//   },
//   category: {
//     type: Sequelize.STRING
//   }
// });

// module.exports = expensedata;

// const Mongoose=require('mongoose');
// const connection=require('../util/database');
// const User = require('../models/createtabletable');


// const expenseSchema=new Mongoose.Schema({
//     expense:Number,
//     choice:String,
//     description:String,
//     tbluserdetailId : {
//         type: Mongoose.Schema.ObjectId,
//         ref : User,
//     }

// });

// const expense = Mongoose.model('Expense',expenseSchema)
// module.exports=expense;


const Mongoose=require('mongoose');
const connection=require('../util/database');
const User = require('../models/createtable');


const expenseSchema=new Mongoose.Schema({
    expense:Number,
    category:String,
    discription:String,
    userId: {
        type: Mongoose.Schema.ObjectId,
        ref : User,
    }

});

const expense = Mongoose.model('Expense',expenseSchema)
module.exports=expense;

















