const mongoose = require('mongoose')
const socialLink = new mongoose.Schema(
  {
    network: { 
      type: String, 
      required: true, 
      enum: ["LinkedIn", "GitHub", "Portfolio","Twitter"] // ✅ only these 3 allowed
    },
    url: { type: String, required: true }
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  name: String,
  email: String,
  phone: String,
  location: String,
  title: String,
  summary: String,
  social:[socialLink],
  skills: [String],
  experience: [{
    title: String,
    company: String,
    location: String,
    startDate: String,
    endDate: String,
    current: {
      type: Boolean,
      default: false,
    },
    description: String,
    achievements: [String],
  }],
  education: [{
    degree: String,
    institution: String,
    location: String,
    startYear: String,
    endYear: String,
    gpa: String,
    description: String,
  }],
  projects: [{
    name: String,
    description: String,
    technologies: [String],
    url: String,
    githubUrl: String,
    startDate: String,
    endDate: String,
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: String,
    expirationDate: String,
    credentialId: String,
    url: String,
  }],
  completeness: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
})
 
// Calculate profile completeness
profileSchema.methods.calculateCompleteness = function() {
  let score = 0
  const weights = {
    name: 10,
    email: 10,
    phone: 5,
    location: 5,
    title: 10,
    summary: 5,
    skills: 15,
    experience: 10,
    education: 10,
    projects: 10,
    social: 3,
    certifications: 7,
  }

  if (this.name) score += weights.name
  if (this.email) score += weights.email
  if (this.phone) score += weights.phone
  if (this.location) score += weights.location
  if (this.title) score += weights.title
  if (this.summary) score += weights.summary

  if (this.skills && this.skills.length >= 3) score += weights.skills
  if (this.experience && this.experience.length >= 1) score += weights.experience
  if (this.education && this.education.length >= 1) score += weights.education
  if (this.projects && this.projects.length >= 1) score += weights.projects
  if (this.social && this.social.length >= 1) score += weights.social
  if (this.certifications && this.certifications.length >= 1) score += weights.certifications

  this.completeness = Math.min(score, 100) // cap at 100
  return this.completeness
}


profileSchema.pre('save', function(next) {
  this.calculateCompleteness()
  next()
})

module.exports = mongoose.model('Profile', profileSchema)