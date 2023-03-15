const express = require('express');

const router = express.Router();


const purchaseController = require('../controllers/purchase.js');

const authenticatemiddleware = require('../middleware/auth.js');

//const router = express.Router();

router.get('/premiummembership', authenticatemiddleware.authenticate,purchaseController.purchasepremium);

router.post('/updatetransactionstatus', authenticatemiddleware.authenticate, purchaseController.updateTransactionStatus)


module.exports = router;