const express = require('express');

const premiumFeatureController = require('../controllers/premiumFeature.js');

const authenticatemiddleware = require('../middleware/auth.js');

const router = express.Router();

router.get('/showLeaderBoard', authenticatemiddleware.authenticate,premiumFeatureController.getUserLeaderBoard);


module.exports = router;