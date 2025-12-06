const express = require('express')
const dashboardController = require('../controllers/dashboard.controller')
const { authenticate } = require('../middlewares/auth')

const router = express.Router()

router.use(authenticate)

router.get('/stats', dashboardController.getStats)
//get refferal to 
// router.get('/refferal',dashboardController.refferal)

module.exports = router