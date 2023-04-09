const Sequelize=require('sequelize');
const sequelize =require('../util/database.js');

const downloadtbl= sequelize.define('downloaddetail',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    filename:Sequelize.STRING,
    downloaddate:Sequelize.DATE
})

module.exports=downloadtbl;