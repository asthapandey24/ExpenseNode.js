const express=require('express');
const router=express.Router();
const controller=require('../controllers/password.js');


router.post('/forgotpassword',controller.forgotpassword);

router.get('/resetpassword/:id',controller.resetpassword);

router.get('/updatepassword/:resetpasswordid', controller.updatepassword)

module.exports=router;