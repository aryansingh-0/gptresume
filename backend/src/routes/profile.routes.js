const express = require('express')
const profileController = require('../controllers/profile.controller')
const { authenticate } = require('../middlewares/auth')

const router = express.Router()

// All profile routes require authentication
router.use(authenticate)

router.get('/', profileController.getProfile)
router.put('/basic', profileController.updateBasicInfo)
router.post('/skills', profileController.addSkill)
router.delete('/skills/:skill', profileController.removeSkill) //done 
router.post('/experience', profileController.addExperience)
router.put('/experience/:id', profileController.updateExperience)
router.delete('/experience/:id', profileController.deleteExperience)

router.post('/certification', profileController.addCertification);
router.put('/certification/:id',  profileController.updateCertification);
router.delete('/certification/:id',  profileController.deleteCertification);

router.post('/project',  profileController.addProject);
router.put('/project/:id',  profileController.updateProject);
router.delete('/project/:id',  profileController.deleteProject);

router.post('/education', profileController.addEducation)
router.put('/education/:id', profileController.updateEducation)
router.delete('/education/:id', profileController.deleteEducation)

module.exports = router