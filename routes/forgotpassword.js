const express=require('express');
const router=express.Router();
const controller=require('../controllers/password.js');


router.post('/forgotpassword',controller.forgotpassword);

module.exports=router;