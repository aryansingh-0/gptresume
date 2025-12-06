const express = require('express')
const authController = require('../controllers/auth.controller')
const { authenticate } = require('../middlewares/auth')

const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/verify-email/:token', authController.verifyEmail)
router.post('/send-verify-email', authController.sendVerifyEmail)
router.post('/refresh', authController.refresh)
router.post('/forgot', authController.forgot)
router.post('/reset-password', authController.resetPassword)
router.get('/me', authenticate, authController.me)

module.exports = router