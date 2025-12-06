const express = require('express')
const resumeController = require('../controllers/resume.controller')
const { authenticate } = require('../middlewares/auth')

const router = express.Router()

// All resume routes require authentication
router.use(authenticate)

router.post('/generate', resumeController.generate) 
router.post('/update/:resumeId', resumeController.updateResume)
router.get('/history', resumeController.getResumeHistory)
router.delete('/delete/:resumeId',resumeController.delResumeById)
router.get('/history/:resumeId',resumeController.getResumeById)

module.exports = router