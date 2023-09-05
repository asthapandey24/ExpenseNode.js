const express=require('express');
const router=express.Router();
const userAuthentication = require('../middleware/auth.js')

const controllerexpense=require('../controllers/expense2.js');

router.post('/add-user', userAuthentication.authenticate,controllerexpense.postAdduser);



router.get('/get-user', userAuthentication.authenticate,controllerexpense.getAdduser);


//router.get('/get-user/:pageno',userAuthentication.authenticate,controllerexpense.getAdduser);


router.delete('/delete-user/:id', userAuthentication.authenticate,controllerexpense.deleteuser);


//router.get('/download',userAuthentication.authenticate, controllerexpense.downloadexpense);


//router.get('/downloadfiledata',userAuthentication.authenticate,controllerexpense.downloadAllexpensedataFile)

module.exports = router;