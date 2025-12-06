const Joi = require('joi')

const authValidation = {
  signup: Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().min(6).max(100).required(),
  referralCode: Joi.string().allow('', null), // allow empty or null
  deviceFingerprint: Joi.string().required(),
}),

  
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}

const profileValidation = {
  basicInfo: Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().max(20).optional(),
    location: Joi.string().max(100).optional(),
    title: Joi.string().max(100).optional(),
    summary: Joi.string().max(1000).optional(),
    social: Joi.array().items,
  }),
  
  skill: Joi.object({
    skill: Joi.string().min(1).max(50).required(),
  }),
  
  experience: Joi.object({
    title: Joi.string().max(100).required(),
    company: Joi.string().max(100).required(),
    location: Joi.string().max(100).optional(),
    startDate: Joi.string().required(),
    endDate: Joi.string().when('current', {
      is: false,
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
    current: Joi.boolean().default(false),
    description: Joi.string().max(2000).optional(),
    achievements: Joi.array().items(Joi.string()).optional(),
  }),
  
  education: Joi.object({
    degree: Joi.string().max(100).required(),
    institution: Joi.string().max(100).required(),
    location: Joi.string().max(100).optional(),
    startYear: Joi.string().required(),
    endYear: Joi.string().required(),
    gpa: Joi.string().max(10).optional(),
    description: Joi.string().max(500).optional(),
  }),
}

const resumeValidation = {
  generate: Joi.object({
    jobDescription: Joi.string().min(50).max(5000).required(),
    profile: Joi.object().required(),

  }),
  
  export: Joi.object({
    resumeData: Joi.object().required(),
    format: Joi.string().valid('pdf', 'docx').required(),
    
  }),
}

const paymentValidation = {
}
module.exports = {
  authValidation,
  profileValidation,
  resumeValidation,
  paymentValidation
}