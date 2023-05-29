const express = require('express');
const authController = require('../middleware/auth');
const premiumontroller = require('../controller/premium')

const router = express.Router();


router.get('/premium/getleaderboard', authController.premiumAuthenticate, premiumontroller.getLeaderBoardData)

router.get('/premium/downloadreport', authController.premiumAuthenticate, premiumontroller.downloadreport)

module.exports = router;
