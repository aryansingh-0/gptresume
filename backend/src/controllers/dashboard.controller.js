const User = require('../models/User')
const Profile = require('../models/Profile')
const Resume = require('../models/Resume')

const getStats = async (req, res, next) => {
  try {
    const userId = req.user.userId

    // Get user and profile
    const user = await User.findById(userId)
    const profile = await Profile.findOne({ user: userId })

    // Get resume stats 
    const totalResumes = await Resume.countDocuments({ user: userId })
    
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)
    
    const resumesThisMonth = await Resume.countDocuments({
      user: userId,
      createdAt: { $gte: startOfMonth },
    })

    // Get recent resumes
    const recentResumes = await Resume.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title createdAt')

    const stats = {
      credits: user.credits,
      totalResumes,
      isEmailVerified: user.isEmailVerified,
      resumesThisMonth,
      profileCompleteness: profile?.completeness || 0,
      recentResumes,
      subscription: user.subscription,
    }

    res.json({
      success: true,
      ...stats,
    })
  } catch (error) {
    next(error)
  }
}


module.exports = {
  getStats,
}