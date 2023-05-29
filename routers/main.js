const express = require('express');
const mainController = require('../controller/main');
const authController = require('../middleware/auth');

const router = express.Router();

router.post("/user/signup", mainController.postRegUsers);

router.post("/user/login", mainController.postLogIn)

router.post("/expense/add-item", authController.authenticate, mainController.postAddItem)

//to get all expenses but NOT IN USE
router.get('/expenses', authController.authenticate , mainController.getAllItems)


router.delete("/expense/delete/:itemId", authController.authenticate, mainController.deleteItem)

router.get("/expenseslength", authController.authenticate, mainController.getexpenselength)

router.get("/expensespage", authController.authenticate, mainController.getPageDataOnly)

module.exports = router;