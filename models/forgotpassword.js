// const Sequelize=require('sequelize');
// const sequelize = require('../util/database.js');



// const forgetPasswordRequest = sequelize.define('forgotPasswordRequest', {
//     id: {
//         type: Sequelize.UUID,
//         allowNull: false,
//         primaryKey: true
//     },
//     active: Sequelize.BOOLEAN,
//     expiresby: Sequelize.DATE
// })


// module.exports=forgetPasswordRequest;
const mongoose=require('mongoose');
const connection=require('../util/database');


const forgetPasswordSchema=new mongoose.Schema({
    id:{
        type:String
    },
    isActive :Boolean
})
   
    const forgetPassword = mongoose.model('forgetpassword',forgetPasswordSchema);
    module.exports=forgetPassword;