const Profile = require('../models/Profile')

const getProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ user: req.user.userId })
    
    if (!profile) {
      // Create empty profile if doesn't exist
      profile = new Profile({
        user: req.user.userId,
        skills: [],
        experience: [],
        education: [],
        projects: [],
        certifications: [],
        completeness: 0,
      })
      await profile.save()
    }

    res.json({
      success: true,
      profile,
    })
  } catch (error) {
    next(error)
  }
}
const updateBasicInfo = async (req, res, next) => {
  try {
    const { name, email, phone, location, title, summary, social} = req.body;
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.userId },
      { name, email, phone, location, title, summary, social },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    next(error);
  }
};

const addSkill = async (req, res, next) => {
  
  try {
    const { skill } = req.body
    const profile = await Profile.findOne({ user: req.user.userId })
    if (!profile.skills.includes(skill)) {
      profile.skills.push(skill)
      await profile.save()
    }

    res.json({
      success: true,
      message: 'Skill added successfully',
      profile,
    })
  } catch (error) {
    next(error)
  }
}

const removeSkill = async (req, res, next) => {
  try {
    const { skill } = req.params
 
    
    const profile = await Profile.findOne({ user: req.user.userId })
    profile.skills = profile.skills.filter(s => s !== skill)
   
    await profile.save()

    res.json({
      success: true,
      message: 'Skill removed successfully',
      profile,
    })
  } catch (error) {
    next(error)
  }
}

// Add Experience
const addExperience = async (req, res, next) => {
  try {
    const experienceData = req.body;
    const profile = await Profile.findOne({ user: req.user.userId });
    const newExp = profile.experience.create(experienceData); // Create subdoc
    profile.experience.push(newExp);
    await profile.save();

    res.json({
      success: true,
      message: 'Experience added successfully',
      experience: newExp, // return only the added experience
    });
  } catch (error) {
    next(error);
  }
};

// Update Experience
const updateExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const experienceData = req.body;
    const profile = await Profile.findOne({ user: req.user.userId });
    const experience = profile.experience.id(id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found',
      });
    }

    Object.assign(experience, experienceData);
    await profile.save();

    res.json({
      success: true,
      message: 'Experience updated successfully',
      experience, // return only updated experience
    });
  } catch (error) {
    next(error);
  }
};

// Delete Experience
const deleteExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findOne({ user: req.user.userId });
    profile.experience.pull(id);
    await profile.save();

    res.json({
      success: true,
      message: 'Experience deleted successfully',
      id, // just return deleted id
    });
  } catch (error) {
    next(error);
  }
};



// Add Project
const addProject = async (req, res, next) => {
  try {
    const projectData = req.body;
    const profile = await Profile.findOne({ user: req.user.userId });
    const newProject = profile.projects.create(projectData);
    profile.projects.push(newProject);
    await profile.save();

    res.json({
      success: true,
      message: 'Project added successfully',
      project: newProject, // only return added project
    });
  } catch (error) {
    next(error);
  }
};

// Update Project
const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const projectData = req.body;
    const profile = await Profile.findOne({ user: req.user.userId });
    const project = profile.projects.id(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    Object.assign(project, projectData);
    await profile.save();

    res.json({
      success: true,
      message: 'Project updated successfully',
      project, // only return updated project
    });
  } catch (error) {
    next(error);
  }
};

// Delete Project
const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findOne({ user: req.user.userId });
    profile.projects.pull(id);
    await profile.save();

    res.json({
      success: true,
      message: 'Project deleted successfully',
      id, // only return deleted project id
    });
  } catch (error) {
    next(error);
  }
};

// Add Certification
const addCertification = async (req, res, next) => {
  
  try {
    const certData = req.body; 
    const profile = await Profile.findOne({ user: req.user.userId });
    const newCert = profile.certifications.create(certData); // create subdoc
    profile.certifications.push(newCert);
    await profile.save();

    res.json({
      success: true,
      message: 'Certification added successfully',
      certification: newCert, // only return new cert
    });
  } catch (error) {
    next(error);
  }
};

// Update Certification
const updateCertification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const certData = req.body;
    const profile = await Profile.findOne({ user: req.user.userId });
    const cert = profile.certifications.id(id);

    if (!cert) {
      return res.status(404).json({
        success: false,
        message: 'Certification not found',
      });
    }

    Object.assign(cert, certData);
    await profile.save();

    res.json({
      success: true,
      message: 'Certification updated successfully',
      certification: cert, // only return updated cert
    });
  } catch (error) {
    next(error);
  }
};

// Delete Certification
const deleteCertification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findOne({ user: req.user.userId });
    profile.certifications.pull(id);
    await profile.save();

    res.json({
      success: true,
      message: 'Certification deleted successfully',
      id, // only return deleted id
    });
  } catch (error) {
    next(error);
  }
};

const addEducation = async (req, res, next) => {
  try {
    const educationData = req.body
    
    const profile = await Profile.findOne({ user: req.user.userId })
    profile.education.push(educationData)
    await profile.save()
    
    res.json({
      success: true,
      message: 'Education added successfully',
      profile,
    })
  } catch (error) {
    next(error)
  }
}

const updateEducation = async (req, res, next) => {
  try {
    const { id } = req.params
    
    const educationData = req.body
    
    const profile = await Profile.findOne({ user: req.user.userId })
    const education = profile.education.id(id)
    
    if (!education) {
      return res.status(404).json({
        success: false,
        message: 'Education not found',
      })
    } 
    Object.assign(education, educationData)
    await profile.save()

    res.json({
      success: true,
      message: 'Education updated successfully',
      profile,
    })
  } catch (error) {
    next(error)
  }
}

const deleteEducation = async (req, res, next) => {
  try {
    const { id } = req.params
    
    const profile = await Profile.findOne({ user: req.user.userId })
    profile.education.pull(id)
    await profile.save()

    res.json({
      success: true,
      message: 'Education deleted successfully',
      profile,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getProfile,
  updateBasicInfo,
  addSkill,
  removeSkill,
  addExperience,
  updateExperience,
  deleteExperience,
  addProject,
  updateProject,
  deleteProject,
  addCertification,
  updateCertification,
  deleteCertification,
  addEducation,
  updateEducation,
  deleteEducation,
}