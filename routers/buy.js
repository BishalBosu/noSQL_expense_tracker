const express = require('express');
const authController = require('../middleware/auth')
const buyController = require('../controller/buy')

const router = express.Router();

//filter /buy
router.get('/premium', authController.authenticate, buyController.buyPremium)

router.post('/updatetransactionstatus', authController.authenticate, buyController.updateTransaction)



module.exports = router;
