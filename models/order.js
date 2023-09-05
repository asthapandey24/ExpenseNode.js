// const Sequelize = require('sequelize');
// const sequelize = require('../util/database.js');

// //id, name , password, phone number, role

// const Order = sequelize.define('order', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     paymentid: Sequelize.STRING,
//     orderid: Sequelize.STRING,
//     status: Sequelize.STRING
// })

// module.exports = Order;

const mongoose=require('mongoose');
const User = require('../models/createtable');

const order=new mongoose.Schema({
    paymentid:String,
    orderid:String,
    status:String,
     userId : {
        type: mongoose.Schema.ObjectId,
        ref : User,
    }
});

const ordermodule= mongoose.model("order",order)

module.exports=ordermodule;