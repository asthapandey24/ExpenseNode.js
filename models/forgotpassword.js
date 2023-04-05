const Sequelize=require('sequelize');
const sequelize = require('../util/database.js');



const forgetPasswordRequest = sequelize.define('forgotPasswordRequest', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    active: Sequelize.BOOLEAN,
    expiresby: Sequelize.DATE
})


module.exports=forgetPasswordRequest;