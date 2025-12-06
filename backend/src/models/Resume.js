const mongoose = require('mongoose')

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  jobDescription: String,
  content: {
    name: String,
    title: String,
    contact: {
      email: String,
      phone: String,
      location: String,
    },
    summary: String,
    skills: [String],
    experience: [{
      title: String,
      company: String,
      location: String,
      startDate: String,
      endDate: String,
      current: Boolean,
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
    }],
    projects: [{
      name: String,
      description: String,
      technologies: [String],
      url: String,
    }],
    certifications: [{
      name: String,
      issuer: String,
      date: String,
    }],
  },
  exports: [{
    format: {
      type: String,
      enum: ['pdf', 'docx'],
    },
    url: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
})

module.exports = mongoose.model('Resume', resumeSchema)