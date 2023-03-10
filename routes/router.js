const express=require('express');
const router=express.Router();
const User = require('../models/createtable.js');
const controllercontrol=require('../controllers/user.js');

router.post('/signup',controllercontrol.signup);
//router.get('/expensetable/get-user',controllercontrol.getAdduser);
//router.delete('/expensetable/delete-user/:id',controllercontrol.deleteuser);

module.exports = router;