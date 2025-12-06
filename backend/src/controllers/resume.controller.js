require('dotenv').config();
const Resume = require('../models/Resume');
const Profile = require('../models/Profile');
const User = require('../models/User');
const { resumeValidation } = require('../utils/validators');
const LLMAdapter = require('../services/llm.adapter');

const generate = async (req, res, next) => {
 
  try {
    const { error, value } = resumeValidation.generate.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { jobDescription, profile } = value;

    // 🔹 check user credits
    
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    if (!user.isEmailVerified) {
      return res.status(404).json({ success: false, message: "Please verify your email first." })
    }
    if (user.credits <= 0) {
      return res.status(400).json({ success: false, message: "Not enough credits" });
    }


    if (!profile) {
      return res.status(400).json({ success: false, message: "Please complete your profile first" });
    }
    if (profile.completeness < 60) {
      return res.status(400).json({
        success: false, message: "Complete your Profile First."
      })
    }
    // 🔹 Directly call LLM adapter (no queue)
    let tailoredResume;
    try {
      tailoredResume = await LLMAdapter.tailorResume(profile, jobDescription);
    } catch (llmError) {
      console.error("LLMAdapter Error:", llmError);
      return res.status(500).json({
        success: false,
        message: "Failed to generate resume. Please try again later.",
      });
    }

    // 🔹 Deduct credits
    user.credits -= 1;
    await user.save();

    // 🔹 Optionally save resume to DB
    const resume = new Resume({
      user: req.user.userId,
      title: `Generated Resume - ${new Date().toLocaleString()}`,
      content: tailoredResume.resume,
    });
    await resume.save();

    res.json({
      success: true,
      message: "Resume generated successfully",
      resumeData: tailoredResume,
      resumeId: resume._id,
    });

  } catch (error) {
    console.error("Error generating resume:", error);
    next(error);
  }
};

const updateResume = async (req, res, next) => {
  try {
    const { resumeId } = req.params;
    const { title, content } = req.body;

    const resume = await Resume.findOne({ _id: resumeId, user: req.user.userId });
    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    resume.title = title || resume.title;
    resume.content = content || resume.content;
    await resume.save();

    res.json({
      success: true,
      message: "Resume updated successfully",
      resume,
    });
  } catch (error) {
    next(error);
  }
};


const getResumeHistory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const resumes = await Resume.find({ user: req.user.userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("_id title createdAt");

    const total = await Resume.countDocuments({ user: req.user.userId });

    res.json({
      success: true,
      resumes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getResumeById = async (req, res, next) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ _id: resumeId, user: req.user.userId });
    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    res.json({
      success: true,
      resume,
    });
  } catch (error) {
    next(error);
  }
};

const delResumeById = async (req, res, next) => {
  try {
    const { resumeId } = req.params;
    const userId = req.user.userId; // ✅ take from auth middleware, not body

    const resume = await Resume.findOneAndDelete({ _id: resumeId, user: userId });
    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (err) {
    console.error("Delete resume error:", err);
    next(err);
  }
};

module.exports = {
  generate,
  updateResume,
  delResumeById,
  getResumeHistory,
  getResumeById,
};
