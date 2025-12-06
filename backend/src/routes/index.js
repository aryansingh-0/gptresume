const express = require('express')
const authRoutes = require('./auth.routes')
const profileRoutes = require('./profile.routes')
const resumeRoutes = require('./resume.routes')
const dashboardRoutes = require('./dashboard.routes')
const paymentRoutes = require('./payment.routes')

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/profile', profileRoutes)
router.use('/resume', resumeRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/payment', paymentRoutes)



module.exports = router