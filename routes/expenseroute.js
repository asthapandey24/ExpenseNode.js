const express=require('express');
const router=express.Router();

const controllerexpense=require('../controllers/expense2.js');

router.post('/add-user',controllerexpense.postAdduser);
router.get('/get-user',controllerexpense.getAdduser);
router.delete('/delete-user/:id',controllerexpense.deleteuser);


module.exports = router;