// const Sequelize = require('sequelize');


// const sequelize = require('../util/database.js');

// const User = sequelize.define('user',{
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement : true,  
//     allowNull : false,
//     primaryKey: true
//   },
//   name: {
//     type: Sequelize.STRING,
    
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true

//   },
//   password: {
//     type: Sequelize.STRING
//   },
//   ispremiumuser:{ 
//     type: Sequelize.BOOLEAN
//   },
//    totalExpenses: {
//      type: Sequelize.INTEGER,
//    defaultValue: 0
//    }
// });

// module.exports = User;









const mongoose =require('mongoose');
const connection=require('../util/database')



const UserSchema=new mongoose.Schema({
    name :  {
        type :String,
        required: true
    },

    email:{
            type:String,
            required : true,
        },
    password:String,

    ispremiumuser:{
        type:Number,
        default :0
     },

     totalexpense:{
        type:Number,
        default :0
    },



});
      const User = mongoose.model('UserDetail', UserSchema);
    module.exports=User;